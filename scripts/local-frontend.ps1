$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath (Join-Path $PSScriptRoot '../frontend')
$envFiles = Get-ChildItem -Force -File -Filter '.env*' | Where-Object { $_.Name -ne '.env.example' }
if ($envFiles) {
    throw 'Local mode refuses existing frontend .env files. Use a clean checkout for isolated development.'
}
$env:NEXT_PUBLIC_API_URL = 'http://127.0.0.1:8010'
$env:NEXT_PUBLIC_SITE_URL = 'http://localhost:3210'
$env:NEXT_PUBLIC_ANALYTICS_PROVIDER = 'none'
$env:NEXT_PUBLIC_GA_MEASUREMENT_ID = ''
$env:NEXT_TELEMETRY_DISABLED = '1'
& npm.cmd run dev -- --hostname 127.0.0.1 --port 3210
exit $LASTEXITCODE
