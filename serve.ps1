param (
    [int]$Port = 8000
)

$HostName = "localhost"
$Url = "http://${HostName}:${Port}/"
$Folder = $PSScriptRoot

if (-not $Folder) {
    $Folder = Get-Location
}

$MimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".htm"  = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".gif"  = "image/gif"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
    ".woff" = "font/woff"
    ".woff2"= "font/woff2"
    ".ttf"  = "font/ttf"
}

$Listener = New-Object System.Net.HttpListener
$Listener.Prefixes.Add($Url)

try {
    $Listener.Start()
} catch {
    Write-Host "[!] Could not bind to port $Port. Trying port $($Port + 1)..." -ForegroundColor Yellow
    $Port = $Port + 1
    $Url = "http://${HostName}:${Port}/"
    $Listener = New-Object System.Net.HttpListener
    $Listener.Prefixes.Add($Url)
    $Listener.Start()
}

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " ❄️ SnowyCare Prototype Server is Running!" -ForegroundColor Magenta
Write-Host " Local URL: " -NoNewline -ForegroundColor White
Write-Host $Url -ForegroundColor Green
Write-Host " Serving files from: $Folder" -ForegroundColor Gray
Write-Host " Press Ctrl+C in this window to stop the server." -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan

# Automatically launch user's default browser
Start-Process $Url

while ($Listener.IsListening) {
    try {
        $Context = $Listener.GetContext()
        $Request = $Context.Request
        $Response = $Context.Response

        $LocalPath = $Request.Url.LocalPath
        if ($LocalPath -eq "/" -or [string]::IsNullOrWhiteSpace($LocalPath)) {
            $LocalPath = "/index.html"
        }

        # Normalize relative path
        $FilePath = [System.IO.Path]::Combine($Folder, $LocalPath.TrimStart('/').Replace('/', [System.IO.Path]::DirectorySeparatorChar))

        if ([System.IO.File]::Exists($FilePath)) {
            $Ext = [System.IO.Path]::GetExtension($FilePath).ToLower()
            $ContentType = $MimeTypes[$Ext]
            if (-not $ContentType) { $ContentType = "application/octet-stream" }

            $Response.ContentType = $ContentType
            $Bytes = [System.IO.File]::ReadAllBytes($FilePath)
            $Response.ContentLength64 = $Bytes.Length
            $Response.OutputStream.Write($Bytes, 0, $Bytes.Length)
            $Response.StatusCode = 200
        } else {
            $Response.StatusCode = 404
            $NotFoundMsg = [System.Text.Encoding]::UTF8.GetBytes("<h1>404 Not Found</h1><p>File not found.</p>")
            $Response.ContentType = "text/html; charset=utf-8"
            $Response.ContentLength64 = $NotFoundMsg.Length
            $Response.OutputStream.Write($NotFoundMsg, 0, $NotFoundMsg.Length)
        }
        $Response.Close()
    } catch {
        # Catch cancellation or client aborts silently
    }
}
