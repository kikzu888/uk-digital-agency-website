from pydantic import BaseModel, EmailStr, Field


class AdminLoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=12, max_length=256)


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class AdminProfileResponse(BaseModel):
    email: EmailStr
    role: str
