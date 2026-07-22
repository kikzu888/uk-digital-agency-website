from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator


class ContactSubmissionCreate(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    first_name: str = Field(alias="firstName", min_length=2, max_length=120)
    last_name: str = Field(alias="lastName", min_length=2, max_length=120)
    company_name: str = Field(alias="companyName", min_length=2, max_length=180)
    email: EmailStr
    phone: str = Field(min_length=7, max_length=80)
    preferred_service: str = Field(alias="service", min_length=1, max_length=160)
    budget_range: str = Field(alias="budget", min_length=1, max_length=80)
    project_description: str = Field(alias="projectDescription", min_length=20, max_length=5000)
    privacy_consent: bool = Field(alias="privacyConsent")
    marketing_consent: bool = Field(default=False, alias="marketingConsent")
    website: str = Field(default="", max_length=0)

    @field_validator("privacy_consent")
    @classmethod
    def require_privacy_consent(cls, value: bool) -> bool:
        if not value:
            raise ValueError("Privacy Policy consent is required.")
        return value


class ContactSubmissionPublic(BaseModel):
    id: int
    first_name: str
    last_name: str
    company_name: str
    email: EmailStr
    phone: str
    preferred_service: str
    budget_range: str
    project_description: str
    privacy_consent: bool
    marketing_consent: bool
    status: str
    created_at: datetime


class ContactSubmissionResponse(BaseModel):
    message: str
    reference: str
