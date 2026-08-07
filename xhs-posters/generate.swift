import AppKit

let canvasWidth: CGFloat = 1080
let canvasHeight: CGFloat = 1440
let root = URL(fileURLWithPath: FileManager.default.currentDirectoryPath)
let assetRoot = root.appendingPathComponent("remi-site/assets")
let outputRoot = root.appendingPathComponent("remi-site/xhs-posters/output")
try FileManager.default.createDirectory(at: outputRoot, withIntermediateDirectories: true)

struct Palette {
    static let ink = NSColor(calibratedRed: 0.13, green: 0.09, blue: 0.08, alpha: 1)
    static let muted = NSColor(calibratedRed: 0.43, green: 0.32, blue: 0.28, alpha: 1)
    static let clay = NSColor(calibratedRed: 0.70, green: 0.43, blue: 0.34, alpha: 1)
    static let cream = NSColor(calibratedRed: 1.00, green: 0.96, blue: 0.92, alpha: 1)
    static let peach = NSColor(calibratedRed: 1.00, green: 0.84, blue: 0.76, alpha: 1)
    static let mint = NSColor(calibratedRed: 0.58, green: 0.78, blue: 0.70, alpha: 1)
    static let gold = NSColor(calibratedRed: 0.90, green: 0.70, blue: 0.34, alpha: 1)
    static let dark = NSColor(calibratedRed: 0.18, green: 0.13, blue: 0.11, alpha: 1)
}

func r(_ x: CGFloat, _ y: CGFloat, _ w: CGFloat, _ h: CGFloat) -> NSRect {
    NSRect(x: x, y: canvasHeight - y - h, width: w, height: h)
}

func color(_ red: CGFloat, _ green: CGFloat, _ blue: CGFloat, _ alpha: CGFloat = 1) -> NSColor {
    NSColor(calibratedRed: red, green: green, blue: blue, alpha: alpha)
}

func font(_ size: CGFloat, _ weight: NSFont.Weight) -> NSFont {
    NSFont.systemFont(ofSize: size, weight: weight)
}

func fillRounded(_ rect: NSRect, radius: CGFloat, color: NSColor, shadow: NSShadow? = nil, stroke: NSColor? = nil, lineWidth: CGFloat = 1) {
    NSGraphicsContext.saveGraphicsState()
    shadow?.set()
    let path = NSBezierPath(roundedRect: rect, xRadius: radius, yRadius: radius)
    color.setFill()
    path.fill()
    if let stroke {
        stroke.setStroke()
        path.lineWidth = lineWidth
        path.stroke()
    }
    NSGraphicsContext.restoreGraphicsState()
}

func drawText(_ text: String, x: CGFloat, y: CGFloat, w: CGFloat, h: CGFloat, size: CGFloat, weight: NSFont.Weight, color: NSColor = Palette.ink, align: NSTextAlignment = .left, lineSpacing: CGFloat = 5) {
    let style = NSMutableParagraphStyle()
    style.alignment = align
    style.lineBreakMode = .byWordWrapping
    style.lineSpacing = lineSpacing
    let attr = NSAttributedString(string: text, attributes: [
        .font: font(size, weight),
        .foregroundColor: color,
        .paragraphStyle: style
    ])
    attr.draw(in: r(x, y, w, h))
}

func drawImage(_ url: URL, x: CGFloat, y: CGFloat, w: CGFloat, h: CGFloat, radius: CGFloat = 0) {
    guard let image = NSImage(contentsOf: url) else { return }
    NSGraphicsContext.saveGraphicsState()
    if radius > 0 {
        NSBezierPath(roundedRect: r(x, y, w, h), xRadius: radius, yRadius: radius).addClip()
    }
    image.draw(in: r(x, y, w, h), from: .zero, operation: .sourceOver, fraction: 1)
    NSGraphicsContext.restoreGraphicsState()
}

func drawBackground(_ rep: NSBitmapImageRep, warm: Bool = true) {
    let ctx = NSGraphicsContext.current!.cgContext
    let colors = warm
        ? [color(1, 0.98, 0.95).cgColor, color(1, 0.88, 0.80).cgColor, color(0.96, 0.68, 0.60).cgColor]
        : [color(0.97, 1.00, 0.97).cgColor, color(0.83, 0.93, 0.88).cgColor, color(0.99, 0.86, 0.74).cgColor]
    let gradient = CGGradient(colorsSpace: CGColorSpaceCreateDeviceRGB(), colors: colors as CFArray, locations: [0, 0.56, 1])!
    ctx.drawLinearGradient(gradient, start: CGPoint(x: 0, y: canvasHeight), end: CGPoint(x: canvasWidth, y: 0), options: [])

    color(1, 1, 1, 0.56).setFill()
    NSBezierPath(ovalIn: r(76, 38, 480, 480)).fill()
    (warm ? Palette.gold.withAlphaComponent(0.26) : Palette.mint.withAlphaComponent(0.28)).setFill()
    NSBezierPath(ovalIn: r(820, 300, 520, 520)).fill()
    Palette.mint.withAlphaComponent(0.18).setFill()
    NSBezierPath(ovalIn: r(-180, 1010, 560, 560)).fill()

    color(0.44, 0.28, 0.20, 0.08).setStroke()
    for x in stride(from: CGFloat(0), through: canvasWidth, by: 40) {
        let path = NSBezierPath()
        path.move(to: CGPoint(x: x, y: 0))
        path.line(to: CGPoint(x: x, y: canvasHeight))
        path.lineWidth = 1
        path.stroke()
    }
    for y in stride(from: CGFloat(0), through: canvasHeight, by: 40) {
        let path = NSBezierPath()
        path.move(to: CGPoint(x: 0, y: y))
        path.line(to: CGPoint(x: canvasWidth, y: y))
        path.lineWidth = 1
        path.stroke()
    }
}

func shadow(_ blur: CGFloat = 28, y: CGFloat = -14, alpha: CGFloat = 0.18) -> NSShadow {
    let shadow = NSShadow()
    shadow.shadowColor = color(0.28, 0.14, 0.08, alpha)
    shadow.shadowBlurRadius = blur
    shadow.shadowOffset = NSSize(width: 0, height: y)
    return shadow
}

func drawBrand(tag: String) {
    drawImage(assetRoot.appendingPathComponent("app-icon.png"), x: 70, y: 64, w: 58, h: 58, radius: 15)
    drawText("Remi", x: 144, y: 65, w: 220, h: 64, size: 42, weight: .heavy)
    fillRounded(r(700, 66, 310, 58), radius: 29, color: color(1, 1, 1, 0.62), shadow: nil, stroke: color(0.43, 0.26, 0.20, 0.14))
    drawText(tag, x: 728, y: 77, w: 260, h: 36, size: 25, weight: .bold, color: color(0.43, 0.27, 0.21), align: .center)
}

func drawPill(_ text: String, x: CGFloat, y: CGFloat, w: CGFloat, dark: Bool = true) {
    fillRounded(r(x, y, w, 60), radius: 30, color: dark ? Palette.dark.withAlphaComponent(0.92) : color(1, 1, 1, 0.72), shadow: shadow(18, y: -8, alpha: 0.10))
    drawText(text, x: x + 22, y: y + 11, w: w - 44, h: 36, size: 25, weight: .heavy, color: dark ? .white : Palette.ink, align: .center)
}

func drawChip(_ text: String, x: CGFloat, y: CGFloat, w: CGFloat) {
    fillRounded(r(x, y, w, 50), radius: 25, color: color(1, 1, 1, 0.70), shadow: shadow(14, y: -7, alpha: 0.08), stroke: color(0.44, 0.28, 0.20, 0.11))
    drawText(text, x: x + 16, y: y + 10, w: w - 32, h: 30, size: 21, weight: .bold, color: color(0.36, 0.24, 0.20), align: .center)
}

func drawPhone(_ shot: String, x: CGFloat, y: CGFloat, w: CGFloat) {
    let innerW = w - 26
    let innerH = innerW * 1558 / 720
    let phoneH = innerH + 26
    fillRounded(r(x, y, w, phoneH), radius: 48, color: color(0.12, 0.10, 0.09), shadow: shadow(42, y: -24, alpha: 0.26))
    drawImage(assetRoot.appendingPathComponent("shots/zh/\(shot).png"), x: x + 13, y: y + 13, w: innerW, h: innerH, radius: 36)
}

func drawRow(_ title: String, value: String, x: CGFloat, y: CGFloat, w: CGFloat) {
    fillRounded(r(x, y, w, 72), radius: 22, color: color(1, 1, 1, 0.74), shadow: shadow(14, y: -8, alpha: 0.08), stroke: color(1, 1, 1, 0.44))
    drawText(title, x: x + 24, y: y + 19, w: 160, h: 36, size: 26, weight: .heavy)
    drawText(value, x: x + 180, y: y + 21, w: w - 204, h: 34, size: 24, weight: .semibold, color: Palette.muted, align: .right)
}

func drawFooter(_ text: String) {
    drawText(text, x: 70, y: 1368, w: 940, h: 34, size: 22, weight: .bold, color: color(0.30, 0.22, 0.19, 0.70), align: .center)
}

func render(_ name: String, warm: Bool = true, draw: () -> Void) throws {
    let rep = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: Int(canvasWidth), pixelsHigh: Int(canvasHeight), bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true, isPlanar: false, colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0)!
    rep.size = NSSize(width: canvasWidth, height: canvasHeight)
    NSGraphicsContext.saveGraphicsState()
    NSGraphicsContext.current = NSGraphicsContext(bitmapImageRep: rep)
    drawBackground(rep, warm: warm)
    draw()
    NSGraphicsContext.restoreGraphicsState()
    let data = rep.representation(using: .png, properties: [:])!
    try data.write(to: outputRoot.appendingPathComponent(name))
}

try render("remi-xhs-01.png") {
    drawBrand(tag: "AI 提醒 + 闹钟")
    drawPill("想到就说，不用打字", x: 70, y: 178, w: 340)
    drawText("懒得填表的人，\n真的需要 Remi", x: 70, y: 270, w: 630, h: 200, size: 74, weight: .heavy, lineSpacing: 8)
    drawText("说一句话，AI 自动建提醒；重要的事还能像闹钟一样叫你。", x: 70, y: 492, w: 570, h: 92, size: 29, weight: .semibold, color: Palette.muted)
    drawChip("语音速记", x: 70, y: 620, w: 150)
    drawChip("AI 整理", x: 238, y: 620, w: 138)
    drawChip("闹钟提醒", x: 394, y: 620, w: 150)
    drawChip("中英双语", x: 70, y: 690, w: 150)
    drawPhone("voice", x: 640, y: 520, w: 350)
    fillRounded(r(70, 1022, 500, 92), radius: 28, color: Palette.dark.withAlphaComponent(0.92), shadow: shadow())
    drawText("普通通知容易错过，\n重要的事要响起来。", x: 102, y: 1040, w: 436, h: 56, size: 26, weight: .heavy, color: .white, align: .center, lineSpacing: 3)
    drawFooter("评论「提醒」获取下载 / 内测链接")
}

try render("remi-xhs-02.png") {
    drawBrand(tag: "语音速记")
    drawPill("一句话创建提醒", x: 70, y: 178, w: 300)
    drawText("走路、做饭、\n通勤时，直接说", x: 70, y: 270, w: 600, h: 190, size: 72, weight: .heavy, lineSpacing: 8)
    drawText("不用切到日历，不用一个个选时间，把脑子里的事先倒出来。", x: 70, y: 492, w: 560, h: 92, size: 29, weight: .semibold, color: Palette.muted)
    drawPhone("voice", x: 92, y: 640, w: 340)
    fillRounded(r(456, 710, 520, 132), radius: 34, color: Palette.dark.withAlphaComponent(0.94), shadow: shadow(30, y: -16, alpha: 0.20))
    drawText("“明天早上 8 点叫我吃药，\n提前 10 分钟响。”", x: 492, y: 736, w: 448, h: 78, size: 28, weight: .heavy, color: .white, align: .center)
    fillRounded(r(506, 884, 410, 92), radius: 28, color: color(1, 1, 1, 0.78), shadow: shadow(18, y: -10, alpha: 0.10))
    drawText("Remi 会把这句话变成\n一条可提醒的任务。", x: 532, y: 904, w: 358, h: 56, size: 23, weight: .bold, color: Palette.muted, align: .center)
    drawFooter("适合突然想起事情、但不想打字的时刻")
}

try render("remi-xhs-03.png") {
    drawBrand(tag: "AI 智能整理")
    drawPill("不是只记一句话", x: 70, y: 178, w: 310)
    drawText("AI 帮你拆好\n时间、清单和子任务", x: 70, y: 270, w: 780, h: 190, size: 68, weight: .heavy, lineSpacing: 8)
    drawText("自然说话也能变成结构化提醒，少一步手动编辑。", x: 70, y: 490, w: 610, h: 70, size: 29, weight: .semibold, color: Palette.muted)
    drawRow("标题", value: "吃药", x: 70, y: 650, w: 470)
    drawRow("时间", value: "明天 8:00", x: 70, y: 742, w: 470)
    drawRow("清单", value: "健康", x: 70, y: 834, w: 470)
    drawRow("提醒", value: "提前 10 分钟", x: 70, y: 926, w: 470)
    drawPhone("details", x: 626, y: 555, w: 360)
    drawFooter("离线时也有本地解析兜底")
}

try render("remi-xhs-04.png") {
    drawBrand(tag: "闹钟功能")
    drawPill("重要的事别只弹一下", x: 70, y: 178, w: 360)
    drawText("吃药、会议、出门，\n到点真的提醒你", x: 70, y: 270, w: 780, h: 190, size: 68, weight: .heavy, lineSpacing: 8)
    drawText("普通通知一忙就划走。Remi 支持更强的闹钟式提醒，适合不能错过的事。", x: 70, y: 494, w: 700, h: 92, size: 29, weight: .semibold, color: Palette.muted)
    fillRounded(r(628, 646, 310, 310), radius: 155, color: color(1, 0.99, 0.96), shadow: shadow(34, y: -18, alpha: 0.22), stroke: Palette.dark, lineWidth: 14)
    drawText("08:00", x: 682, y: 770, w: 202, h: 62, size: 44, weight: .heavy, color: Palette.clay, align: .center)
    drawRow("吃药", value: "每天 8 点", x: 70, y: 674, w: 480)
    drawRow("会议", value: "提前 10 分钟", x: 70, y: 766, w: 480)
    drawRow("出门", value: "到点响铃", x: 70, y: 858, w: 480)
    fillRounded(r(118, 1044, 840, 86), radius: 28, color: Palette.dark.withAlphaComponent(0.92), shadow: shadow())
    drawText("把“我等会儿再记”变成“到点就响”", x: 150, y: 1066, w: 776, h: 42, size: 27, weight: .heavy, color: .white, align: .center)
    drawFooter("适合吃药、会议、缴费、出门、接人")
}

try render("remi-xhs-05.png", warm: false) {
    drawBrand(tag: "适用场景")
    drawPill("这些事最适合交给 Remi", x: 70, y: 178, w: 430)
    drawText("别再靠脑子\n硬记生活琐事", x: 70, y: 270, w: 720, h: 188, size: 72, weight: .heavy, lineSpacing: 8)
    drawText("学习、工作、生活、健康，都可以用一句话塞进提醒里。", x: 70, y: 494, w: 650, h: 70, size: 29, weight: .semibold, color: Palette.muted)
    let cards = [
        ("学生党", "DDL、考试、作业\n社团活动"),
        ("上班族", "会议、报销、客户跟进\n周报"),
        ("生活党", "缴费、取快递、买菜\n关火"),
        ("健康管理", "吃药、喝水、复诊\n运动")
    ]
    for (index, item) in cards.enumerated() {
        let col = CGFloat(index % 2)
        let row = CGFloat(index / 2)
        let x = 70 + col * 485
        let y = 670 + row * 210
        fillRounded(r(x, y, 440, 170), radius: 30, color: color(1, 1, 1, 0.72), shadow: shadow(18, y: -10, alpha: 0.10), stroke: color(1, 1, 1, 0.50))
        drawText(item.0, x: x + 28, y: y + 28, w: 384, h: 42, size: 30, weight: .heavy)
        drawText(item.1, x: x + 28, y: y + 82, w: 384, h: 64, size: 24, weight: .semibold, color: Palette.muted, lineSpacing: 4)
    }
    drawFooter("评论区告诉我：你最常忘什么？")
}

try render("remi-xhs-06.png") {
    drawBrand(tag: "隐私 + 同步")
    drawPill("好用，也要安心", x: 70, y: 178, w: 300)
    drawText("无账号、无广告，\n用自己的 iCloud 同步", x: 70, y: 270, w: 820, h: 190, size: 66, weight: .heavy, lineSpacing: 8)
    drawText("提醒存在你的设备和私人 iCloud。没有第三方广告追踪，也不需要注册登录。", x: 70, y: 494, w: 700, h: 92, size: 29, weight: .semibold, color: Palette.muted)
    drawPhone("widget", x: 610, y: 608, w: 340)
    drawRow("无账号", value: "打开就能用", x: 70, y: 690, w: 470)
    drawRow("无广告", value: "不打扰", x: 70, y: 782, w: 470)
    drawRow("iCloud", value: "多设备同步", x: 70, y: 874, w: 470)
    drawFooter("主屏小组件让今天的提醒一眼可见")
}

try render("remi-xhs-07.png", warm: false) {
    drawBrand(tag: "下载互动")
    drawPill("想试试这个 AI 提醒 App？", x: 70, y: 178, w: 430)
    drawText("评论「提醒」", x: 70, y: 284, w: 940, h: 120, size: 86, weight: .heavy, align: .center)
    drawText("我发你下载 / 内测链接。也想知道：你最希望 Remi 用闹钟提醒你什么？", x: 140, y: 428, w: 800, h: 94, size: 29, weight: .semibold, color: Palette.muted, align: .center)
    drawPhone("themes", x: 370, y: 560, w: 340)
    fillRounded(r(112, 1016, 856, 184), radius: 40, color: Palette.dark.withAlphaComponent(0.94), shadow: shadow(34, y: -18, alpha: 0.24))
    drawText("语音创建提醒\nAI 整理，到点响铃", x: 154, y: 1044, w: 772, h: 88, size: 38, weight: .heavy, color: .white, align: .center, lineSpacing: 4)
    drawText("中英双语 · iCloud 同步 · 7 天免费试用", x: 154, y: 1146, w: 772, h: 34, size: 24, weight: .semibold, color: color(0.95, 0.82, 0.75), align: .center)
    drawFooter("Remi · Voice-first AI reminders")
}

print("Generated posters in \(outputRoot.path)")