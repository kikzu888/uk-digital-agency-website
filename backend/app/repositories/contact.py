from datetime import UTC, datetime

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import ContactSubmission
from app.schemas.contact import ContactSubmissionCreate, ContactSubmissionPublic

_memory_submissions: list[ContactSubmissionPublic] = []


async def create_contact_submission(
    *,
    session: AsyncSession | None,
    payload: ContactSubmissionCreate,
    ip_hash: str | None,
    user_agent_hash: str | None,
) -> ContactSubmissionPublic:
    if session is None:
        submission = ContactSubmissionPublic(
            id=len(_memory_submissions) + 1,
            first_name=payload.first_name,
            last_name=payload.last_name,
            company_name=payload.company_name,
            email=payload.email,
            phone=payload.phone,
            preferred_service=payload.preferred_service,
            budget_range=payload.budget_range,
            project_description=payload.project_description,
            privacy_consent=payload.privacy_consent,
            marketing_consent=payload.marketing_consent,
            status="new",
            created_at=datetime.now(UTC),
        )
        _memory_submissions.append(submission)
        return submission

    record = ContactSubmission(
        first_name=payload.first_name,
        last_name=payload.last_name,
        company_name=payload.company_name,
        email=str(payload.email),
        phone=payload.phone,
        preferred_service=payload.preferred_service,
        budget_range=payload.budget_range,
        project_description=payload.project_description,
        privacy_consent=payload.privacy_consent,
        marketing_consent=payload.marketing_consent,
        ip_hash=ip_hash,
        user_agent_hash=user_agent_hash,
    )
    session.add(record)
    await session.commit()
    await session.refresh(record)
    return ContactSubmissionPublic(
        id=record.id,
        first_name=record.first_name,
        last_name=record.last_name,
        company_name=record.company_name,
        email=record.email,
        phone=record.phone,
        preferred_service=record.preferred_service,
        budget_range=record.budget_range,
        project_description=record.project_description,
        privacy_consent=record.privacy_consent,
        marketing_consent=record.marketing_consent,
        status=record.status,
        created_at=record.created_at,
    )


async def list_contact_submissions(
    *,
    session: AsyncSession | None,
) -> list[ContactSubmissionPublic]:
    if session is None:
        return list(reversed(_memory_submissions))

    result = await session.execute(
        select(ContactSubmission).order_by(ContactSubmission.created_at.desc())
    )
    records = result.scalars().all()
    return [
        ContactSubmissionPublic(
            id=record.id,
            first_name=record.first_name,
            last_name=record.last_name,
            company_name=record.company_name,
            email=record.email,
            phone=record.phone,
            preferred_service=record.preferred_service,
            budget_range=record.budget_range,
            project_description=record.project_description,
            privacy_consent=record.privacy_consent,
            marketing_consent=record.marketing_consent,
            status=record.status,
            created_at=record.created_at,
        )
        for record in records
    ]


def clear_memory_submissions() -> None:
    _memory_submissions.clear()
