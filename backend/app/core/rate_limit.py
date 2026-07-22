from collections import defaultdict, deque
from datetime import UTC, datetime, timedelta

from fastapi import HTTPException, Request, status

from app.core.config import settings

_requests: dict[str, deque[datetime]] = defaultdict(deque)


def get_client_key(request: Request) -> str:
    forwarded_for = request.headers.get("x-forwarded-for")
    if forwarded_for:
        return forwarded_for.split(",", 1)[0].strip()
    return request.client.host if request.client else "unknown"


async def enforce_rate_limit(request: Request) -> None:
    now = datetime.now(UTC)
    window_start = now - timedelta(minutes=1)
    key = get_client_key(request)
    bucket = _requests[key]

    while bucket and bucket[0] < window_start:
        bucket.popleft()

    if len(bucket) >= settings.rate_limit_per_minute:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many requests. Please try again later.",
        )

    bucket.append(now)
