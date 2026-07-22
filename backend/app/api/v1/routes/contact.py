from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Request, status

from app.core.config import settings
from app.core.rate_limit import enforce_rate_limit, get_client_key
from app.db.session import AsyncSessionLocal
from app.repositories.contact import create_contact_submission
from app.schemas.contact import ContactSubmissionCreate, ContactSubmissionResponse
from app.services.email import send_contact_notifications
from app.utils.privacy import hash_sensitive_value

router = APIRouter(prefix="/api/v1/contact", tags=["contact"])


@router.post("", response_model=ContactSubmissionResponse, status_code=status.HTTP_201_CREATED)
async def submit_contact_form(
    payload: ContactSubmissionCreate,
    request: Request,
    _: Annotated[None, Depends(enforce_rate_limit)],
) -> ContactSubmissionResponse:
    if payload.website:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid submission.")

    if settings.is_production and AsyncSessionLocal is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Contact storage is not configured.",
        )

    session = None
    if AsyncSessionLocal is not None:
        session = AsyncSessionLocal()

    try:
        submission = await create_contact_submission(
            session=session,
            payload=payload,
            ip_hash=hash_sensitive_value(get_client_key(request)),
            user_agent_hash=hash_sensitive_value(request.headers.get("user-agent")),
        )
        await send_contact_notifications(submission)
    finally:
        if session is not None:
            await session.close()

    return ContactSubmissionResponse(
        message="Your enquiry has been received.",
        reference=f"CONTACT-{submission.id}",
    )
