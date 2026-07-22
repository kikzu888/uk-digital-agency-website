import base64
import hashlib
import hmac
import secrets
from datetime import UTC, datetime, timedelta
from os import getenv
from typing import Any, cast

from jose import JWTError, jwt  # type: ignore[import-untyped]

from app.core.config import settings

ALGORITHM = "HS256"
PASSWORD_ALGORITHM = "pbkdf2_sha256"
PASSWORD_ITERATIONS = 600_000


def hash_password(password: str) -> str:
    salt = secrets.token_bytes(16)
    digest = hashlib.pbkdf2_hmac(
        "sha256",
        password.encode("utf-8"),
        salt,
        PASSWORD_ITERATIONS,
    )
    return (
        f"{PASSWORD_ALGORITHM}${PASSWORD_ITERATIONS}$"
        f"{base64.b64encode(salt).decode('ascii')}$"
        f"{base64.b64encode(digest).decode('ascii')}"
    )


def verify_password(plain_password: str, password_hash: str) -> bool:
    try:
        algorithm, iterations_raw, salt_raw, digest_raw = password_hash.split("$", 3)
        iterations = int(iterations_raw)
    except ValueError:
        return False

    if algorithm != PASSWORD_ALGORITHM:
        return False

    salt = base64.b64decode(salt_raw.encode("ascii"))
    expected_digest = base64.b64decode(digest_raw.encode("ascii"))
    actual_digest = hashlib.pbkdf2_hmac(
        "sha256",
        plain_password.encode("utf-8"),
        salt,
        iterations,
    )
    return hmac.compare_digest(actual_digest, expected_digest)


def create_access_token(subject: str, role: str) -> str:
    expires_at = datetime.now(UTC) + timedelta(minutes=settings.access_token_expire_minutes)
    payload: dict[str, Any] = {
        "sub": subject,
        "role": role,
        "exp": expires_at,
        "type": "access",
    }
    return cast(str, jwt.encode(payload, settings.secret_key, algorithm=ALGORITHM))


def decode_access_token(token: str) -> dict[str, Any] | None:
    try:
        payload = cast(
            dict[str, Any], jwt.decode(token, settings.secret_key, algorithms=[ALGORITHM])
        )
    except JWTError:
        return None
    if payload.get("type") != "access":
        return None
    return payload


def get_configured_admin_credentials() -> tuple[str, str] | None:
    email = getenv("ADMIN_EMAIL")
    password_hash = getenv("ADMIN_PASSWORD_HASH")
    if not email or not password_hash:
        return None
    return email, password_hash
