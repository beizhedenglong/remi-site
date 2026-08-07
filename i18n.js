/* Remi site — lightweight bilingual (EN / 中文) i18n. No dependencies, no build.
 *
 * Usage in markup:
 *   <el data-i18n="key">            → sets textContent
 *   <el data-i18n-html="key">       → sets innerHTML (strings that contain markup)
 *   <el data-i18n-attr="attr:key">  → sets attribute(s); comma-separate pairs
 *
 * Language resolves from ?lang= → localStorage("remi.lang") → navigator.language.
 * A tiny inline snippet in each page's <head> mirrors this to avoid a flash of
 * English for 中文 visitors; this file is the source of truth for the copy.
 */
(function () {
  "use strict";

  var STORAGE_KEY = "remi.lang";
  var SUPPORTED = ["en", "zh"];

  /* ---------------------------------------------------------------- Dictionary */
  var T = {
    en: {
      // Shared — nav / footer
      "nav.features": "Features",
      "nav.how": "How it works",
      "nav.pricing": "Pricing",
      "common.support": "Support",
      "common.download": "Download",
      "common.onAppStore": "Download Remi on the App Store",
      "common.privacyPolicy": "Privacy Policy",
      "common.termsOfUse": "Terms of Use",
      "lang.aria": "Language",
      "footer.tagline": "Voice-first, AI-powered reminders in English and 中文 — private by design.",
      "footer.product": "Product",
      "footer.legalSupport": "Legal & support",
      "footer.rights": "All rights reserved.",
      "footer.contactLabel": "Contact:",

      // index — meta
      "index.title": "Remi — Voice-first reminders, organized by AI",
      "index.desc": "Remi is a bilingual (English / 中文) reminder app. Speak naturally and AI turns your words into dated, sorted reminders — private by design, synced with your own iCloud.",

      // index — hero
      "hero.eyebrow": "Voice-first reminders",
      "hero.title": "Say it once.<br /><span class=\"accent\">Remi</span> remembers.",
      "hero.sub": "The bilingual reminder app that turns your voice into perfectly organized, on-time reminders — powered by AI, private by design.",
      "hero.badgeSmall": "Download on the",
      "hero.seeFeatures": "See features",
      "hero.note": "7-day free trial · No account needed",

      // index — screenshot showcase (real device captures; src is language-aware)
      "gallery.eyebrow": "See it in action",
      "gallery.title": "A closer look at Remi",
      "gallery.intro": "Real screens from the app — capture by voice, let AI organize, make it yours, and keep today in view.",
      "shot.main.src": "assets/shots/en/main.png",
      "shot.main.alt": "Remi home screen showing the All Reminders list",
      "shot.voice.src": "assets/shots/en/voice.png",
      "shot.voice.cap": "Hold to speak — Remi captures the whole thought.",
      "shot.details.src": "assets/shots/en/details.png",
      "shot.details.cap": "AI fills in the date, time, list, and subtasks.",
      "shot.themes.src": "assets/shots/en/themes.png",
      "shot.themes.cap": "Six color themes, in light & dark, to match your style.",
      "shot.widget.src": "assets/shots/en/widget.png",
      "shot.widget.cap": "Home-screen widgets keep today's reminders in view.",

      // index — features
      "features.eyebrow": "Why Remi",
      "features.title": "Everything you need to remember",
      "features.intro": "Capture fast, let AI do the organizing, and stay on track across every device.",
      "features.c1.title": "Capture by voice",
      "features.c1.body": "Just speak to add reminders in seconds — no typing, hands-free.",
      "features.c2.title": "AI organizes it",
      "features.c2.body": "Smart parsing turns your words into dated, sorted reminders — with an on-device fallback offline.",
      "features.c3.title": "Lists & widgets",
      "features.c3.body": "Unlimited reminders, lists, and home-screen widgets to keep everything in view.",
      "features.c4.title": "iCloud sync",
      "features.c4.body": "Your reminders stay in sync across all your devices through your private iCloud.",

      // index — how it works
      "how.eyebrow": "How it works",
      "how.title": "Three steps to a clearer mind",
      "how.intro": "From a spoken thought to an on-time reminder — Remi handles the busywork.",
      "how.s1.title": "Capture by voice",
      "how.s1.body": "Tap the mic and speak naturally. No forms, no fuss.",
      "how.s2.title": "AI organizes it",
      "how.s2.body": "Remi extracts the title, date, time, list, and subtasks for you.",
      "how.s3.title": "Never miss a thing",
      "how.s3.body": "Smart notifications, widgets, and iCloud keep you on track everywhere.",

      // index — bilingual
      "bi.eyebrow": "Bilingual",
      "bi.title": "Fluent in English and 中文",
      "bi.body": "Remi understands and speaks both languages. Switch anytime and dictate reminders in whichever language you're thinking in — the interface, voice capture, and AI parsing all follow along.",
      "bi.check1": "Speak or type in English or 中文",
      "bi.check2": "AI understands mixed, natural phrasing",
      "bi.check3": "Full interface localization, switchable anytime",

      // index — privacy teaser
      "privt.check1": "Reminders live on your device and your own iCloud",
      "privt.check2": "No ads, no tracking, no third-party analytics",
      "privt.check3": "No account or login required",
      "privt.check4": "Works offline with on-device parsing",
      "privt.eyebrow": "Private by design",
      "privt.title": "Your reminders stay yours",
      "privt.body": "Remi was built to keep your data on your device and in your own iCloud. We don't sell your data, show ads, or track you across other apps. Reminder text is used only to create your reminders.",
      "privt.read": "Read our Privacy Policy",

      // index — pricing
      "pricing.eyebrow": "Pricing",
      "pricing.title": "Start free, then keep it simple",
      "pricing.intro": "Unlock voice capture, AI parsing, unlimited reminders & lists, and iCloud sync.",
      "pricing.trialTag": "7-day free trial",
      "pricing.price": "Free<small> for 7 days</small>",
      "pricing.thenLine": "then $1.99/month, billed monthly",
      "pricing.cta": "Start your free trial",
      "pricing.fine": "Auto-renewable subscription. Cancel anytime in the App Store at least 24 hours before the trial ends. See the <a href=\"https://www.apple.com/legal/internet-services/itunes/dev/stdeula/\">Terms of Use</a> and <a href=\"privacy.html\">Privacy Policy</a>.",

      // support — meta + hero
      "support.title": "Support — Remi",
      "support.desc": "Get help with Remi: voice capture, AI parsing, iCloud sync, subscriptions, and more. Frequently asked questions and how to contact us.",
      "support.eyebrow": "Support",
      "support.h1": "How can we help?",
      "support.sub": "Answers to common questions about Remi — and how to reach us.",
      "support.q1": "How do I create a reminder by voice?",
      "support.a1": "Tap the microphone button on the Tasks screen and speak naturally — for example, \"Remind me to call the dentist tomorrow at 9.\" Remi transcribes your speech and uses AI to fill in the title, date, time, list, and any subtasks.",
      "support.q2": "Does Remi work offline?",
      "support.a2": "Yes. If the AI service is unreachable, Remi falls back to an on-device parser, so you can still create reminders in airplane mode or with a poor connection.",
      "support.q3": "How does iCloud sync work?",
      "support.a3": "Turn on iCloud sync in Settings and your reminders, lists, and subtasks sync across your devices through your own private iCloud account. Prefer to keep everything on one device? Leave sync off — your data stays local.",
      "support.q4": "What languages does Remi support?",
      "support.a4": "English and 简体中文. You can switch the language anytime in Settings, and dictate reminders in whichever language you're using — voice capture and AI parsing follow along.",
      "support.q5": "What's included in the subscription and free trial?",
      "support.a5": "The subscription unlocks voice capture, AI parsing, unlimited reminders and lists, and iCloud sync. New subscribers get a 7-day free trial; it converts to a monthly subscription unless canceled at least 24 hours before the trial ends.",
      "support.q6": "How do I cancel or manage my subscription?",
      "support.a6": "Open the <strong>App Store</strong> → tap your account → <strong>Subscriptions</strong> → select Remi to change or cancel. Cancel at least 24 hours before your trial or renewal date to avoid being charged.",
      "support.q7": "How do I restore my purchase on a new device?",
      "support.a7": "Tap <strong>Restore Purchases</strong> on the paywall or in Settings while signed in with the same Apple ID you used to subscribe.",
      "support.q8": "How do I recover a deleted reminder?",
      "support.a8": "Open <strong>Recently Deleted</strong> to restore a reminder before it expires and is permanently removed.",
      "support.q9": "What data does Remi collect?",
      "support.a9": "Remi has no account, no ads, and no tracking. Your reminders live on your device and in your own iCloud. Reminder text is used only to create your reminders. See our <a href=\"privacy.html\">Privacy Policy</a> for details.",
      "support.contactEyebrow": "Still need help?",
      "support.contactTitle": "Get in touch",
      "support.contactBody": "Email us and we'll get back to you as soon as we can.",
      "support.contactNote": "When reporting an issue, let us know your device model, iOS version, and the app version so we can help faster.",

      // privacy — meta + doc
      "privacy.title": "Privacy Policy — Remi",
      "privacy.desc": "How Remi handles your data: on your device and in your own iCloud. No ads, no tracking, no account required.",
      "privacy.eyebrow": "Legal",
      "privacy.h1": "Privacy Policy",
      "privacy.updated": "Effective date: 2026-07-19 · Provider: Remi Developers · Contact: <a href=\"mailto:2501211450@qq.com\">2501211450@qq.com</a>",
      "privacy.note": "This policy is tailored to Remi's current behavior. The provider should review and adapt it to their jurisdiction before publishing; it is not legal advice.",
      "privacy.intro": "Remi is a reminder app with voice capture and AI-assisted task parsing. We built it to keep your data on your device and in your own iCloud. We do <strong>not</strong> sell your data, show ads, or track you across other apps or websites.",
      "privacy.h2process": "What we process",
      "privacy.h3reminder": "Reminder content (text you type or dictate)",
      "privacy.pReminder": "When you create a reminder, the text is sent to our processing service and to a <strong>third-party AI provider</strong> to turn natural language into structured reminders (title, date, time, list, subtasks). We send only the reminder text plus your list names, the current time, and time-zone. This content is processed to return your reminders and is <strong>not</strong> linked to your identity (Remi has no account or login). If the service is unavailable, Remi parses your text on-device instead.",
      "privacy.h3voice": "Voice input",
      "privacy.pVoice": "When you use voice capture, audio is transcribed using <strong>Apple's Speech Recognition</strong>. Depending on your device, Apple may process audio on device or on Apple's servers under Apple's privacy policy. We do not store your audio; we use only the resulting text as reminder content (see above).",
      "privacy.h3storage": "Your reminders and lists (storage)",
      "privacy.pStorage": "Reminders are stored locally on your device. If you enable iCloud sync, they are stored in <strong>your private iCloud account</strong> (Apple CloudKit) so they sync across your devices. We cannot access your iCloud data.",
      "privacy.h3settings": "App settings",
      "privacy.pSettings": "Preferences such as language, default reminder timing, and sync on/off are stored on your device (and in your app group / iCloud key-value store) to make the app work. They are not used to identify you.",
      "privacy.h3purchases": "Purchases",
      "privacy.pPurchases": "Subscriptions are processed by <strong>Apple</strong>. We receive only whether you have an active entitlement; we never receive your payment details.",
      "privacy.h2notCollect": "What we do <strong>not</strong> collect",
      "privacy.nc1": "No name, email, phone number, or account.",
      "privacy.nc2": "No advertising identifiers; no cross-app/website tracking.",
      "privacy.nc3": "No location data (time zone is a device setting, not your location).",
      "privacy.nc4": "No third-party analytics or ad SDKs.",
      "privacy.h2third": "Third parties",
      "privacy.tpApple": "<strong>Apple</strong> — Speech Recognition, iCloud/CloudKit, App Store &amp; subscriptions.",
      "privacy.tpAI": "<strong>Third-party AI provider</strong> — AI parsing of reminder text.",
      "privacy.tpCloud": "<strong>Alibaba Cloud</strong> — hosts our request-forwarding service.",
      "privacy.pThird": "We ask these providers to process data only to deliver the feature and not for their own unrelated purposes. Reminder text sent for parsing is used to return your result and is not used by us to build a profile of you.",
      "privacy.h2retention": "Data retention",
      "privacy.pRetention": "Reminder content is processed transiently to return results. We do not maintain our own user database of your reminders. Data you store in iCloud stays until you delete it. Operational request logs are retained for up to 30 days for security and reliability, then deleted.",
      "privacy.h2children": "Children",
      "privacy.pChildren": "Remi is intended for a general audience (rating 4+) and is not directed to children under 13. We do not knowingly collect personal data from children.",
      "privacy.h2choices": "Your choices",
      "privacy.ch1": "Turn off iCloud sync in Settings to keep data on device only.",
      "privacy.ch2": "Skip voice capture and type reminders instead.",
      "privacy.ch3": "Delete reminders in-app (including \"Recently Deleted\"); manage or delete iCloud data from your Apple device settings.",
      "privacy.ch4": "Manage or cancel your subscription in the App Store.",
      "privacy.h2changes": "Changes",
      "privacy.pChanges": "We may update this policy; material changes will be reflected by a new effective date on this page.",
      "privacy.h2contact": "Contact",
      "privacy.pContact": "Questions? Contact us at <a href=\"mailto:2501211450@qq.com\">2501211450@qq.com</a>."
    },

    zh: {
      // Shared — nav / footer
      "nav.features": "功能",
      "nav.how": "使用方法",
      "nav.pricing": "定价",
      "common.support": "支持",
      "common.download": "下载",
      "common.onAppStore": "在 App Store 下载 Remi",
      "common.privacyPolicy": "隐私政策",
      "common.termsOfUse": "使用条款",
      "lang.aria": "语言",
      "footer.tagline": "语音优先、AI 驱动的中英文提醒——注重隐私。",
      "footer.product": "产品",
      "footer.legalSupport": "法律与支持",
      "footer.rights": "版权所有。",
      "footer.contactLabel": "联系：",

      // index — meta
      "index.title": "Remi —— 语音优先、AI 智能整理的提醒",
      "index.desc": "Remi 是一款中英双语提醒应用。自然说话，AI 就把你的话变成带时间、自动排序的提醒——注重隐私，并通过你自己的 iCloud 同步。",

      // index — hero
      "hero.eyebrow": "语音优先的提醒",
      "hero.title": "说一次，<br /><span class=\"accent\">Remi</span> 就记住。",
      "hero.sub": "这款中英双语提醒应用，把你的语音变成井井有条、准时送达的提醒——由 AI 驱动，注重隐私。",
      "hero.badgeSmall": "立即下载",
      "hero.seeFeatures": "查看功能",
      "hero.note": "7 天免费试用 · 无需账户",

      // index — screenshot showcase (real device captures; src is language-aware)
      "gallery.eyebrow": "实机演示",
      "gallery.title": "近距离看看 Remi",
      "gallery.intro": "来自应用的真实界面——语音速记、AI 整理、随心配色，让今天一目了然。",
      "shot.main.src": "assets/shots/zh/main.png",
      "shot.main.alt": "Remi 主界面，显示“所有提醒”列表",
      "shot.voice.src": "assets/shots/zh/voice.png",
      "shot.voice.cap": "按住说话——Remi 记下你的每一句话。",
      "shot.details.src": "assets/shots/zh/details.png",
      "shot.details.cap": "AI 自动填好日期、时间、清单和子任务。",
      "shot.themes.src": "assets/shots/zh/themes.png",
      "shot.themes.cap": "六款配色主题，支持浅色与深色，随心搭配。",
      "shot.widget.src": "assets/shots/zh/widget.png",
      "shot.widget.cap": "主屏小组件，让今天的提醒一目了然。",

      // index — features
      "features.eyebrow": "为什么选择 Remi",
      "features.title": "记住一切，所需皆备",
      "features.intro": "快速记录，让 AI 帮你整理，在每台设备上都有条不紊。",
      "features.c1.title": "语音速记",
      "features.c1.body": "开口即记，几秒创建提醒，无需打字，解放双手。",
      "features.c2.title": "AI 智能整理",
      "features.c2.body": "智能解析把你的话变成带时间、自动排序的提醒——离线时还有本地解析兜底。",
      "features.c3.title": "清单与小组件",
      "features.c3.body": "无限提醒、清单和主屏小组件，让一切尽收眼底。",
      "features.c4.title": "iCloud 同步",
      "features.c4.body": "通过你的私人 iCloud，在所有设备间保持提醒同步。",

      // index — how it works
      "how.eyebrow": "使用方法",
      "how.title": "三步，让思绪更清爽",
      "how.intro": "从一句话到准时提醒——琐事都交给 Remi。",
      "how.s1.title": "语音速记",
      "how.s1.body": "点按麦克风，自然说话。没有表单，毫不费力。",
      "how.s2.title": "AI 智能整理",
      "how.s2.body": "Remi 为你提取标题、日期、时间、清单和子任务。",
      "how.s3.title": "重要事项不遗漏",
      "how.s3.body": "智能通知、小组件与 iCloud，随时随地帮你记牢。",

      // index — bilingual
      "bi.eyebrow": "双语",
      "bi.title": "中英文，皆流利",
      "bi.body": "Remi 既听得懂也说得出两种语言。随时切换，用你此刻正在思考的语言口述提醒——界面、语音识别和 AI 解析都会随之而动。",
      "bi.check1": "用英文或中文说话或输入",
      "bi.check2": "AI 理解中英夹杂的自然表达",
      "bi.check3": "完整界面本地化，随时切换",

      // index — privacy teaser
      "privt.check1": "提醒只保存在你的设备和你自己的 iCloud 中",
      "privt.check2": "无广告、无追踪、无第三方分析",
      "privt.check3": "无需账户或登录",
      "privt.check4": "离线也能用，支持本地解析",
      "privt.eyebrow": "隐私为本",
      "privt.title": "你的提醒，始终属于你",
      "privt.body": "Remi 的设计初衷，是把你的数据留在你的设备和你自己的 iCloud 中。我们不出售你的数据、不展示广告，也不跨应用追踪你。提醒文本仅用于创建你的提醒。",
      "privt.read": "阅读隐私政策",

      // index — pricing
      "pricing.eyebrow": "定价",
      "pricing.title": "先免费开始，再简单续用",
      "pricing.intro": "解锁语音识别、AI 解析、无限提醒与清单，以及 iCloud 同步。",
      "pricing.trialTag": "7 天免费试用",
      "pricing.price": "免费<small>试用 7 天</small>",
      "pricing.thenLine": "之后 ¥12/月，按月计费",
      "pricing.cta": "开始免费试用",
      "pricing.fine": "自动续订订阅。可随时在 App Store 取消，只需在试用结束前至少 24 小时操作。详见<a href=\"https://www.apple.com/legal/internet-services/itunes/dev/stdeula/\">使用条款</a>与<a href=\"privacy.html\">隐私政策</a>。",

      // support — meta + hero
      "support.title": "支持 —— Remi",
      "support.desc": "获取 Remi 使用帮助：语音识别、AI 解析、iCloud 同步、订阅等常见问题解答，以及联系我们的方式。",
      "support.eyebrow": "支持",
      "support.h1": "需要什么帮助？",
      "support.sub": "关于 Remi 的常见问题解答，以及联系我们的方式。",
      "support.q1": "如何用语音创建提醒？",
      "support.a1": "在“提醒”界面点按麦克风按钮，自然说话——例如“提醒我明天 9 点给牙医打电话”。Remi 会转写你的语音，并用 AI 填好标题、日期、时间、清单和子任务。",
      "support.q2": "Remi 能离线使用吗？",
      "support.a2": "可以。若 AI 服务无法连接，Remi 会退回到设备本地解析，因此在飞行模式或网络不佳时你仍能创建提醒。",
      "support.q3": "iCloud 同步如何运作？",
      "support.a3": "在“设置”中开启 iCloud 同步，你的提醒、清单和子任务就会通过你自己的私人 iCloud 账户在各设备间同步。想把一切只留在一台设备上？关闭同步即可——数据只保存在本地。",
      "support.q4": "Remi 支持哪些语言？",
      "support.a4": "英文和简体中文。你可以随时在“设置”中切换语言，并用当前使用的语言口述提醒——语音识别和 AI 解析都会随之跟进。",
      "support.q5": "订阅和免费试用包含什么？",
      "support.a5": "订阅可解锁语音识别、AI 解析、无限提醒与清单，以及 iCloud 同步。新订阅用户可享 7 天免费试用；除非在试用结束前至少 24 小时取消，否则将转为按月订阅。",
      "support.q6": "如何取消或管理我的订阅？",
      "support.a6": "打开 <strong>App Store</strong> → 点按你的账户 → <strong>订阅</strong> → 选择 Remi 进行更改或取消。请在试用或续订日期前至少 24 小时取消，以免被扣费。",
      "support.q7": "如何在新设备上恢复购买？",
      "support.a7": "使用订阅时所用的同一 Apple ID 登录后，在付费页或“设置”中点按<strong>恢复购买</strong>。",
      "support.q8": "如何恢复已删除的提醒？",
      "support.a8": "打开<strong>最近删除</strong>，在提醒过期并被永久移除之前将其恢复。",
      "support.q9": "Remi 会收集哪些数据？",
      "support.a9": "Remi 没有账户、没有广告、也没有追踪。你的提醒保存在你的设备和你自己的 iCloud 中。提醒文本仅用于创建你的提醒。详见我们的<a href=\"privacy.html\">隐私政策</a>。",
      "support.contactEyebrow": "仍需帮助？",
      "support.contactTitle": "联系我们",
      "support.contactBody": "给我们发邮件，我们会尽快回复。",
      "support.contactNote": "反馈问题时，请告诉我们你的设备型号、iOS 版本和 App 版本，以便我们更快为你解决。",

      // privacy — meta + doc
      "privacy.title": "隐私政策 —— Remi",
      "privacy.desc": "Remi 如何处理你的数据：保存在你的设备和你自己的 iCloud 中。无广告、无追踪、无需账户。",
      "privacy.eyebrow": "法律",
      "privacy.h1": "隐私政策",
      "privacy.updated": "生效日期：2026-07-19 · 提供方：Remi Developers · 联系：<a href=\"mailto:2501211450@qq.com\">2501211450@qq.com</a>",
      "privacy.note": "本政策依据 Remi 当前的行为撰写。提供方应在发布前结合自身司法辖区进行审阅和调整；本文不构成法律意见。",
      "privacy.intro": "Remi 是一款具备语音识别与 AI 辅助任务解析的提醒应用。我们的初衷，是把你的数据留在你的设备和你自己的 iCloud 中。我们<strong>不会</strong>出售你的数据、不展示广告，也不跨其他应用或网站追踪你。",
      "privacy.h2process": "我们处理哪些信息",
      "privacy.h3reminder": "提醒内容（你输入或口述的文本）",
      "privacy.pReminder": "当你创建提醒时，文本会发送到我们的处理服务以及一家<strong>第三方 AI 提供商</strong>，以便把自然语言转换为结构化提醒（标题、日期、时间、清单、子任务）。我们仅发送提醒文本，以及你的清单名称、当前时间和时区。此内容仅用于返回你的提醒，且<strong>不会</strong>与你的身份关联（Remi 没有账户或登录）。若该服务不可用，Remi 会改用设备本地解析。",
      "privacy.h3voice": "语音输入",
      "privacy.pVoice": "当你使用语音识别时，音频会通过 <strong>Apple 的语音识别</strong>进行转写。视你的设备而定，Apple 可能在设备本地或其服务器上处理音频，并遵循 Apple 的隐私政策。我们不存储你的音频；仅将转写得到的文本用作提醒内容（见上文）。",
      "privacy.h3storage": "你的提醒与清单（存储）",
      "privacy.pStorage": "提醒保存在你设备的本地。如启用 iCloud 同步，它们会存储在<strong>你的私人 iCloud 账户</strong>（Apple CloudKit）中，以便在各设备间同步。我们无法访问你的 iCloud 数据。",
      "privacy.h3settings": "应用设置",
      "privacy.pSettings": "诸如语言、默认提醒时间、同步开关等偏好设置，会保存在你的设备上（以及 App Group／iCloud 键值存储中）以使应用正常运行。它们不会用于识别你。",
      "privacy.h3purchases": "购买",
      "privacy.pPurchases": "订阅由 <strong>Apple</strong> 处理。我们仅获知你是否拥有有效的订阅权益；绝不会收到你的支付信息。",
      "privacy.h2notCollect": "我们<strong>不会</strong>收集",
      "privacy.nc1": "不收集姓名、邮箱、电话号码或账户。",
      "privacy.nc2": "不使用广告标识符；不进行跨应用／网站追踪。",
      "privacy.nc3": "不收集位置数据（时区是设备设置，并非你的位置）。",
      "privacy.nc4": "不使用第三方分析或广告 SDK。",
      "privacy.h2third": "第三方",
      "privacy.tpApple": "<strong>Apple</strong> —— 语音识别、iCloud/CloudKit、App Store 与订阅。",
      "privacy.tpAI": "<strong>第三方 AI 提供商</strong> —— 对提醒文本进行 AI 解析。",
      "privacy.tpCloud": "<strong>阿里云</strong> —— 托管我们的请求转发服务。",
      "privacy.pThird": "我们要求这些提供商仅为实现相应功能而处理数据，不得用于其自身的无关目的。发送用于解析的提醒文本仅用于返回你的结果，我们不会用它来为你建立画像。",
      "privacy.h2retention": "数据留存",
      "privacy.pRetention": "提醒内容仅被临时处理以返回结果。我们不会为你的提醒维护自有的用户数据库。你存储在 iCloud 中的数据会一直保留，直到你删除它。运营性请求日志出于安全与稳定考虑最多保留 30 天，之后即删除。",
      "privacy.h2children": "儿童",
      "privacy.pChildren": "Remi 面向一般受众（分级 4+），并非面向 13 岁以下儿童。我们不会在知情的情况下收集儿童的个人数据。",
      "privacy.h2choices": "你的选择",
      "privacy.ch1": "在“设置”中关闭 iCloud 同步，让数据仅保留在设备上。",
      "privacy.ch2": "跳过语音识别，改用输入来创建提醒。",
      "privacy.ch3": "在应用内删除提醒（包括“最近删除”）；在你的 Apple 设备设置中管理或删除 iCloud 数据。",
      "privacy.ch4": "在 App Store 中管理或取消你的订阅。",
      "privacy.h2changes": "变更",
      "privacy.pChanges": "我们可能会更新本政策；重大变更将通过本页新的生效日期予以体现。",
      "privacy.h2contact": "联系我们",
      "privacy.pContact": "有疑问？请通过 <a href=\"mailto:2501211450@qq.com\">2501211450@qq.com</a> 联系我们。"
    }
  };

  /* ------------------------------------------------------------------- Engine */
  function detectLang() {
    try {
      var q = new URLSearchParams(window.location.search).get("lang");
      if (q && SUPPORTED.indexOf(q) !== -1) return q;
      var saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;
    } catch (e) {}
    var nav = (navigator.language || "en").toLowerCase();
    return nav.indexOf("zh") === 0 ? "zh" : "en";
  }

  function lookup(lang, key) {
    if (T[lang] && Object.prototype.hasOwnProperty.call(T[lang], key)) return T[lang][key];
    if (Object.prototype.hasOwnProperty.call(T.en, key)) return T.en[key];
    if (window.console && console.warn) console.warn("[i18n] missing key:", key);
    return null;
  }

  function apply(lang) {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var v = lookup(lang, el.getAttribute("data-i18n"));
      if (v != null) el.textContent = v;
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var v = lookup(lang, el.getAttribute("data-i18n-html"));
      if (v != null) el.innerHTML = v;
    });
    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr").split(",").forEach(function (pair) {
        var idx = pair.indexOf(":");
        if (idx === -1) return;
        var v = lookup(lang, pair.slice(idx + 1).trim());
        if (v != null) el.setAttribute(pair.slice(0, idx).trim(), v);
      });
    });

    document.documentElement.setAttribute("lang", lang === "zh" ? "zh-Hans" : "en");
    document.documentElement.setAttribute("data-lang", lang);

    // Re-fill the footer year (also set independently by script.js).
    var year = String(new Date().getFullYear());
    document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = year; });
  }

  function reveal() {
    document.documentElement.classList.remove("i18n-hold");
  }

  function setLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) return;
    try { window.localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    apply(lang);
  }

  function init() {
    apply(detectLang());
    reveal();
    document.querySelectorAll("[data-set-lang]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLang(btn.getAttribute("data-set-lang"));
      });
    });
  }

  // Safety net: never leave the page hidden if something above fails.
  window.setTimeout(reveal, 1200);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
