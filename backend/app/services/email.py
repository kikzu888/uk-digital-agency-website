from dataclasses import dataclass

import httpx
from fastapi import HTTPException, status

from app.core.config import settings
from app.schemas.contact import ContactSubmissionPublic


@dataclass(frozen=True)
class EmailMessage:
    to: str
    subject: str
    text: str
    reply_to: str | None = None


class EmailProvider:
    async def send(self, message: EmailMessage) -> None:
        raise NotImplementedError


class ConsoleEmailProvider(EmailProvider):
    async def send(self, message: EmailMessage) -> None:
        print(f"[email:{settings.email_provider}] to={message.to} " f"subject={message.subject!r}")


class ResendEmailProvider(EmailProvider):
    async def send(self, message: EmailMessage) -> None:
        if not settings.resend_api_key:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Resend email provider is not configured.",
            )

        async with httpx.AsyncClient(timeout=10) as client:
            response = await client.post(
                "https://api.resend.com/emails",
                headers={"Authorization": f"Bearer {settings.resend_api_key}"},
                json={
                    "from": settings.email_from,
                    "to": [message.to],
                    "subject": message.subject,
                    "text": message.text,
                    **({"reply_to": message.reply_to} if message.reply_to else {}),
                },
            )
        response.raise_for_status()


class PostmarkEmailProvider(EmailProvider):
    async def send(self, message: EmailMessage) -> None:
        if not settings.postmark_server_token:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Postmark email provider is not configured.",
            )

        async with httpx.AsyncClient(timeout=10) as client:
            response = await client.post(
                "https://api.postmarkapp.com/email",
                headers={"X-Postmark-Server-Token": settings.postmark_server_token},
                json={
                    "From": settings.email_from,
                    "To": message.to,
                    "Subject": message.subject,
                    "TextBody": message.text,
                    **({"ReplyTo": message.reply_to} if message.reply_to else {}),
                },
            )
        response.raise_for_status()


def get_email_provider() -> EmailProvider:
    if settings.email_provider == "resend":
        return ResendEmailProvider()
    if settings.email_provider == "postmark":
        return PostmarkEmailProvider()
    return ConsoleEmailProvider()


async def send_contact_notifications(submission: ContactSubmissionPublic) -> None:
    provider = get_email_provider()
    await provider.send(
        EmailMessage(
            to=settings.admin_notification_email,
            subject=f"New enquiry from {submission.company_name}",
            text=(
                f"New contact enquiry from {submission.first_name} {submission.last_name}\n"
                f"Company: {submission.company_name}\n"
                f"Service: {submission.preferred_service}\n"
                f"Budget: {submission.budget_range}\n"
                f"Reference: CONTACT-{submission.id}"
            ),
            reply_to=str(submission.email),
        )
    )
    await provider.send(
        EmailMessage(
            to=str(submission.email),
            subject="We received your enquiry",
            text=(
                "Thank you for contacting Company Name. "
                f"Your enquiry reference is CONTACT-{submission.id}."
            ),
        )
    )
