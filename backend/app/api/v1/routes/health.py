from fastapi import APIRouter, Response, status
from sqlalchemy import text

from app.db.session import engine
from app.schemas.health import HealthResponse, ReadinessResponse

router = APIRouter()


@router.get("/health", response_model=HealthResponse)
async def health_check() -> HealthResponse:
    return HealthResponse(status="ok", service="company-name-api")


@router.get("/ready", response_model=ReadinessResponse)
async def readiness_check(response: Response) -> ReadinessResponse:
    if engine is None:
        response.status_code = status.HTTP_503_SERVICE_UNAVAILABLE
        return ReadinessResponse(status="not_ready", database="not_configured")

    try:
        async with engine.connect() as connection:
            await connection.execute(text("SELECT 1"))
    except Exception:
        response.status_code = status.HTTP_503_SERVICE_UNAVAILABLE
        return ReadinessResponse(status="not_ready", database="unavailable")

    return ReadinessResponse(status="ready", database="ok")
