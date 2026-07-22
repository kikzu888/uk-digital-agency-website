import hashlib

from app.core.config import settings


def hash_sensitive_value(value: str | None) -> str | None:
    if not value:
        return None
    digest = hashlib.sha256()
    digest.update(settings.secret_key.encode("utf-8"))
    digest.update(value.encode("utf-8"))
    return digest.hexdigest()
