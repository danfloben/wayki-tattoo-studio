# build.ps1 — Ensambla index.html desde las secciones
$sections = Get-ChildItem -Path ".\sections" -Filter "*.html" | Sort-Object Name
$output   = $sections | ForEach-Object { Get-Content $_.FullName -Encoding UTF8 }
$output   | Out-File -FilePath ".\index.html" -Encoding UTF8
Write-Host "✓ index.html generado ($($sections.Count) secciones)" -ForegroundColor Green
