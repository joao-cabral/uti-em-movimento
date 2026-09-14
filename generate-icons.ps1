Add-Type -AssemblyName System.Drawing

function New-AppIcon {
    param([int]$Size, [string]$OutFile)
    $scale = $Size / 512.0
    $bmp = New-Object System.Drawing.Bitmap($Size, $Size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias

    $rect = New-Object System.Drawing.RectangleF(0, 0, $Size, $Size)
    $radius = 112.0 * $scale
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $d = $radius * 2
    $path.AddArc($rect.X, $rect.Y, $d, $d, 180, 90)
    $path.AddArc($rect.Right - $d, $rect.Y, $d, $d, 270, 90)
    $path.AddArc($rect.Right - $d, $rect.Bottom - $d, $d, $d, 0, 90)
    $path.AddArc($rect.X, $rect.Bottom - $d, $d, $d, 90, 90)
    $path.CloseFigure()

    $c1 = [System.Drawing.Color]::FromArgb(255, 7, 61, 90)
    $c2 = [System.Drawing.Color]::FromArgb(255, 39, 163, 198)
    $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, $c1, $c2, 45)
    $g.FillPath($brush, $path)

    # outer translucent circle
    $circlePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(51, 255, 255, 255), (18.0 * $scale))
    $cx = (256 - 184) * $scale
    $cd = (184 * 2) * $scale
    $g.DrawEllipse($circlePen, $cx, $cx, $cd, $cd)

    # heartbeat polyline
    $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::White, (30.0 * $scale))
    $pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $pen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
    $pts = @(
        (New-Object System.Drawing.PointF((90 * $scale), (266 * $scale))),
        (New-Object System.Drawing.PointF((170 * $scale), (266 * $scale))),
        (New-Object System.Drawing.PointF((204 * $scale), (182 * $scale))),
        (New-Object System.Drawing.PointF((258 * $scale), (350 * $scale))),
        (New-Object System.Drawing.PointF((306 * $scale), (232 * $scale))),
        (New-Object System.Drawing.PointF((336 * $scale), (298 * $scale))),
        (New-Object System.Drawing.PointF((422 * $scale), (298 * $scale)))
    )
    $g.DrawLines($pen, $pts)

    $g.Dispose()
    $bmp.Save($OutFile, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Output "OK $OutFile"
}

$pub = Join-Path (Get-Location) "public"
New-AppIcon -Size 192 -OutFile (Join-Path $pub "icon-192.png")
New-AppIcon -Size 512 -OutFile (Join-Path $pub "icon-512.png")
New-AppIcon -Size 180 -OutFile (Join-Path $pub "apple-touch-icon.png")
