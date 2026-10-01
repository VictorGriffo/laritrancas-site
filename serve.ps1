$root = Join-Path $PSScriptRoot "site"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8080/")
$listener.Start()
Write-Host "Serving $root on http://localhost:8080/"

$mime = @{
  ".html"="text/html"; ".css"="text/css"; ".js"="application/javascript";
  ".jpeg"="image/jpeg"; ".jpg"="image/jpeg"; ".png"="image/png"; ".ico"="image/x-icon"
}

while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  $req = $ctx.Request
  $path = $req.Url.LocalPath
  if ($path -eq "/") { $path = "/larissa-lima-site.html" }
  $file = Join-Path $root ($path.TrimStart("/"))
  $res = $ctx.Response
  if (Test-Path $file -PathType Leaf) {
    $ext = [System.IO.Path]::GetExtension($file)
    $res.ContentType = $mime[$ext]
    if (-not $res.ContentType) { $res.ContentType = "application/octet-stream" }
    $bytes = [System.IO.File]::ReadAllBytes($file)
    $res.ContentLength64 = $bytes.Length
    $res.OutputStream.Write($bytes, 0, $bytes.Length)
  } else {
    $res.StatusCode = 404
  }
  $res.OutputStream.Close()
}
