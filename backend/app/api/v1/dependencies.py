from typing import Annotated

from fastapi import Cookie, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.core.auth import decode_access_token

bearer_scheme = HTTPBearer(auto_error=False)


async def require_admin(
    credentials: Annotated[HTTPAuthorizationCredentials | None, Depends(bearer_scheme)],
    admin_session: Annotated[str | None, Cookie()] = None,
) -> dict[str, object]:
    token = credentials.credentials if credentials else admin_session
    if token is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required.",
        )

    payload = decode_access_token(token)
    if payload is None or payload.get("role") != "admin":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid admin token.",
        )
    return payload
