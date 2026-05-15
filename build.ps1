# build.ps1 — Wayki Tattoo Studio multipage builder
$s = ".\sections"
function S($f) { return (Get-Content "$s\$f" -Encoding UTF8) -join "`n" }
$H = S "00-head.html"
$N = S "01-navbar.html"
$F = S "08-footer.html"
$J = S "09-scripts.html"
function Page($out, $sections) {
  $body = ($sections | ForEach-Object { S $_ }) -join "`n"
  ($H + "`n" + $N + "`n" + $body + "`n" + $F + "`n" + $J) | Out-File -FilePath ".\$out" -Encoding UTF8
  Write-Host "OK  $out"
}
Page "index.html"      @("02-hero.html", "03-servicios.html")
Page "portafolio.html" @("04-portafolio.html")
Page "artistas.html"   @("06-artistas.html")
Page "nosotros.html"   @("05-nosotros.html")
Page "resenas.html"    @("055-testimonios.html")
Page "merch.html"      @("035-merch.html")
Page "contacto.html"   @("07-contacto.html")
Write-Host ""; Write-Host "Build completado — 7 paginas generadas."
