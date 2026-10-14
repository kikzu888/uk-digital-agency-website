param([switch]$Test)
$ErrorActionPreference = 'Stop'
$backendPath = Join-Path $PSScriptRoot '../backend'
Set-Location -LiteralPath $backendPath
if (Test-Path -LiteralPath '.env') {
    throw 'Local mode refuses an existing backend/.env. Use a clean checkout for isolated development.'
}
$pythonPath = Join-Path $backendPath '.venv/Scripts/python.exe'
if (-not (Test-Path -LiteralPath $pythonPath)) {
    throw 'Create backend/.venv with Python 3.12+ and install backend/.[dev] first. See docs/safe-development.md.'
}
# This process only: no persistent settings and no production credentials.
$env:APP_ENV = 'development'
$env:DATABASE_URL = ''
$env:EMAIL_PROVIDER = 'console'
$env:RESEND_API_KEY = ''
$env:POSTMARK_SERVER_TOKEN = ''
$env:ADMIN_EMAIL = ''
$env:ADMIN_PASSWORD_HASH = ''
$env:SECRET_KEY = [Guid]::NewGuid().ToString('N') + [Guid]::NewGuid().ToString('N')
$env:SITE_URL = 'http://localhost:3210'
$env:API_URL = 'http://127.0.0.1:8010'
$env:BACKEND_CORS_ORIGINS = 'http://localhost:3210'
$env:ENABLE_API_DOCS = 'true'
if ($Test) {
    & $pythonPath -m pytest -q
} else {
    & $pythonPath -m uvicorn app.main:app --host 127.0.0.1 --port 8010
}
exit $LASTEXITCODE
