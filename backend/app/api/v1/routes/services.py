from fastapi import APIRouter, HTTPException

from app.repositories.demo_content import get_service, list_services
from app.schemas.services import ServicePublic

router = APIRouter(prefix="/api/v1/services", tags=["services"])


@router.get("", response_model=list[ServicePublic])
async def read_services() -> list[ServicePublic]:
    return list_services()


@router.get("/{slug}", response_model=ServicePublic)
async def read_service(slug: str) -> ServicePublic:
    service = get_service(slug)
    if service is None:
        raise HTTPException(status_code=404, detail="Service not found.")
    return service
