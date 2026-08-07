import AppKit

let canvasWidth: CGFloat = 1080
let canvasHeight: CGFloat = 1440
let root = URL(fileURLWithPath: FileManager.default.currentDirectoryPath)
let assetRoot = root.appendingPathComponent("remi-site/assets")
let outputRoot = root.appendingPathComponent("remi-site/xhs-posters/output")
try FileManager.default.createDirectory(at: outputRoot, withIntermediateDirectories: true)

func rect(_ x: CGFloat, _ y: CGFloat, _ width: CGFloat, _ height: CGFloat) -> NSRect {
    NSRect(x: x, y: canvasHeight - y - height, width: width, height: height)
}

func color(_ red: CGFloat, _ green: CGFloat, _ blue: CGFloat, _ alpha: CGFloat = 1) -> NSColor {
    NSColor(calibratedRed: red, green: green, blue: blue, alpha: alpha)
}

func font(_ size: CGFloat, _ weight: NSFont.Weight) -> NSFont {
    NSFont.systemFont(ofSize: size, weight: weight)
}

func shadow(blur: CGFloat = 30, y: CGFloat = -14, alpha: CGFloat = 0.18) -> NSShadow {
    let shadow = NSShadow()
    shadow.shadowColor = color(0.26, 0.12, 0.06, alpha)
    shadow.shadowBlurRadius = blur
    shadow.shadowOffset = NSSize(width: 0, height: y)
    return shadow
}

func fillRounded(_ rect: NSRect, radius: CGFloat, fill: NSColor, stroke: NSColor? = nil, lineWidth: CGFloat = 1, shadow: NSShadow? = nil) {
    NSGraphicsContext.saveGraphicsState()
    shadow?.set()
    let path = NSBezierPath(roundedRect: rect, xRadius: radius, yRadius: radius)
    fill.setFill()
    path.fill()
    if let stroke {
        stroke.setStroke()
        path.lineWidth = lineWidth
        path.stroke()
    }
    NSGraphicsContext.restoreGraphicsState()
}

func drawText(_ text: String, x: CGFloat, y: CGFloat, width: CGFloat, height: CGFloat, size: CGFloat, weight: NSFont.Weight, textColor: NSColor, align: NSTextAlignment = .left, lineSpacing: CGFloat = 5) {
    let style = NSMutableParagraphStyle()
    style.alignment = align
    style.lineBreakMode = .byWordWrapping
    style.lineSpacing = lineSpacing
    let attributed = NSAttributedString(string: text, attributes: [
        .font: font(size, weight),
        .foregroundColor: textColor,
        .paragraphStyle: style
    ])
    attributed.draw(in: rect(x, y, width, height))
}

func drawImage(_ url: URL, x: CGFloat, y: CGFloat, width: CGFloat, height: CGFloat, radius: CGFloat) {
    guard let image = NSImage(contentsOf: url) else { return }
    NSGraphicsContext.saveGraphicsState()
    NSBezierPath(roundedRect: rect(x, y, width, height), xRadius: radius, yRadius: radius).addClip()
    image.draw(in: rect(x, y, width, height), from: .zero, operation: .sourceOver, fraction: 1)
    NSGraphicsContext.restoreGraphicsState()
}

func drawBackground() {
    let context = NSGraphicsContext.current!.cgContext
    let colors = [
        color(1.00, 0.98, 0.95).cgColor,
        color(1.00, 0.88, 0.78).cgColor,
        color(0.93, 0.66, 0.58).cgColor
    ] as CFArray
    let gradient = CGGradient(colorsSpace: CGColorSpaceCreateDeviceRGB(), colors: colors, locations: [0, 0.56, 1])!
    context.drawLinearGradient(gradient, start: CGPoint(x: 0, y: canvasHeight), end: CGPoint(x: canvasWidth, y: 0), options: [])

    color(1, 1, 1, 0.58).setFill()
    NSBezierPath(ovalIn: rect(62, 36, 520, 520)).fill()
    color(0.87, 0.66, 0.34, 0.25).setFill()
    NSBezierPath(ovalIn: rect(760, 156, 540, 540)).fill()
    color(0.54, 0.78, 0.68, 0.25).setFill()
    NSBezierPath(ovalIn: rect(-190, 980, 620, 620)).fill()

    color(0.42, 0.24, 0.16, 0.07).setStroke()
    for x in stride(from: CGFloat(0), through: canvasWidth, by: 42) {
        let path = NSBezierPath()
        path.move(to: CGPoint(x: x, y: 0))
        path.line(to: CGPoint(x: x, y: canvasHeight))
        path.lineWidth = 1
        path.stroke()
    }
    for y in stride(from: CGFloat(0), through: canvasHeight, by: 42) {
        let path = NSBezierPath()
        path.move(to: CGPoint(x: 0, y: y))
        path.line(to: CGPoint(x: canvasWidth, y: y))
        path.lineWidth = 1
        path.stroke()
    }
}

func drawTag(_ text: String, x: CGFloat, y: CGFloat, width: CGFloat, fill: NSColor = color(1, 1, 1, 0.70), textColor: NSColor = color(0.28, 0.18, 0.15)) {
    fillRounded(rect(x, y, width, 62), radius: 31, fill: fill, stroke: color(1, 1, 1, 0.55), shadow: shadow(blur: 14, y: -7, alpha: 0.08))
    drawText(text, x: x + 18, y: y + 15, width: width - 36, height: 34, size: 24, weight: .bold, textColor: textColor, align: .center)
}

func drawSpark(_ x: CGFloat, _ y: CGFloat, _ size: CGFloat, color sparkColor: NSColor) {
    let path = NSBezierPath()
    path.move(to: CGPoint(x: x, y: canvasHeight - y - size))
    path.line(to: CGPoint(x: x + size * 0.18, y: canvasHeight - y - size * 0.18))
    path.line(to: CGPoint(x: x + size, y: canvasHeight - y))
    path.line(to: CGPoint(x: x + size * 0.18, y: canvasHeight - y + size * 0.18))
    path.line(to: CGPoint(x: x, y: canvasHeight - y + size))
    path.line(to: CGPoint(x: x - size * 0.18, y: canvasHeight - y + size * 0.18))
    path.line(to: CGPoint(x: x - size, y: canvasHeight - y))
    path.line(to: CGPoint(x: x - size * 0.18, y: canvasHeight - y - size * 0.18))
    path.close()
    sparkColor.setFill()
    path.fill()
}

let bitmap = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: Int(canvasWidth), pixelsHigh: Int(canvasHeight), bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true, isPlanar: false, colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0)!
bitmap.size = NSSize(width: canvasWidth, height: canvasHeight)

NSGraphicsContext.saveGraphicsState()
NSGraphicsContext.current = NSGraphicsContext(bitmapImageRep: bitmap)

drawBackground()

let ink = color(0.12, 0.08, 0.07)
let muted = color(0.42, 0.31, 0.27)
let clay = color(0.66, 0.38, 0.30)
let dark = color(0.16, 0.11, 0.09)

fillRounded(rect(70, 60, 940, 118), radius: 42, fill: color(1, 1, 1, 0.58), stroke: color(1, 1, 1, 0.52), shadow: shadow(blur: 18, y: -8, alpha: 0.08))
drawImage(assetRoot.appendingPathComponent("app-icon.png"), x: 94, y: 78, width: 82, height: 82, radius: 22)
drawText("Remi", x: 198, y: 84, width: 220, height: 54, size: 46, weight: .heavy, textColor: ink)
drawText("AI Reminders", x: 198, y: 132, width: 260, height: 28, size: 22, weight: .bold, textColor: muted)
drawTag("AI 自动整理", x: 704, y: 88, width: 250, fill: dark, textColor: .white)

fillRounded(rect(376, 218, 328, 328), radius: 78, fill: color(1, 1, 1, 0.72), stroke: color(1, 1, 1, 0.65), shadow: shadow(blur: 36, y: -18, alpha: 0.18))
drawImage(assetRoot.appendingPathComponent("app-icon.png"), x: 420, y: 262, width: 240, height: 240, radius: 56)
drawSpark(742, 268, 28, color: color(0.87, 0.61, 0.28, 0.90))
drawSpark(332, 390, 22, color: color(0.57, 0.74, 0.66, 0.92))
drawSpark(716, 508, 18, color: color(0.68, 0.40, 0.32, 0.82))

drawText("说一句话，\nAI 帮你建好提醒", x: 86, y: 608, width: 908, height: 202, size: 74, weight: .heavy, textColor: ink, align: .center, lineSpacing: 8)
drawText("自动识别时间、日期、清单和子任务；重要事项还能设置闹钟式提醒。", x: 126, y: 828, width: 828, height: 92, size: 30, weight: .semibold, textColor: muted, align: .center, lineSpacing: 6)

fillRounded(rect(116, 960, 848, 122), radius: 36, fill: dark.withAlphaComponent(0.94), stroke: color(1, 1, 1, 0.08), shadow: shadow(blur: 30, y: -14, alpha: 0.18))
drawText("“明天早上 8 点叫我吃药，提前 10 分钟响”", x: 154, y: 992, width: 772, height: 56, size: 33, weight: .heavy, textColor: .white, align: .center)

let firstRow: [(String, CGFloat)] = [("语音速记", 178), ("AI 拆时间", 200), ("闹钟提醒", 178)]
var x: CGFloat = 168
for item in firstRow {
    drawTag(item.0, x: x, y: 1138, width: item.1)
    x += item.1 + 18
}

let secondRow: [(String, CGFloat)] = [("中英双语", 178), ("iCloud 同步", 210), ("无账号无广告", 230)]
x = 116
for item in secondRow {
    drawTag(item.0, x: x, y: 1220, width: item.1)
    x += item.1 + 18
}

drawTag("离线解析兜底", x: 732, y: 1220, width: 232)

drawText("评论「提醒」获取下载 / 内测链接", x: 70, y: 1360, width: 940, height: 38, size: 25, weight: .bold, textColor: color(0.30, 0.22, 0.19, 0.72), align: .center)

NSGraphicsContext.restoreGraphicsState()

let data = bitmap.representation(using: .png, properties: [:])!
let output = outputRoot.appendingPathComponent("remi-xhs-cover-ai.png")
try data.write(to: output)
print(output.path)
