// app/api/contact/route.ts
import { NextResponse } from "next/server";

const TELEGRAM_BOT_API_URL =
  "https://api.telegram.org/bot8219416435:AAHlhlp2vPogvuW-3r1b57nQwGE5oTdkPg0/sendMessage";

const TELEGRAM_CHAT_ID = "7711916897"; // bu yerga o'zingning chat ID'ing qo'yilgan

export async function POST(request: Request) {
  try {
    const { fullName, telegramUser, comment } = await request.json();

    const text =
      "📨 Yangi UniHero contact so'rovi\n\n" +
      `👤 Full name: ${fullName || "-"}\n` +
      `💬 Telegram: ${telegramUser || "-"}\n` +
      `📝 Comment:\n${comment || "-"}`;

    const telegramResponse = await fetch(TELEGRAM_BOT_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: "HTML",
      }),
    });

    if (!telegramResponse.ok) {
      const errorText = await telegramResponse.text();
      console.error(
        "Telegram API xatosi:",
        telegramResponse.status,
        errorText
      );
      return NextResponse.json(
        { ok: false, error: "Telegramga yuborishda xato" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact API xatosi:", error);
    return NextResponse.json(
      { ok: false, error: "Server xatosi" },
      { status: 500 }
    );
  }
}

export function GET() {
  return NextResponse.json({
    ok: true,
    message: "Contact uchun POST so'rov yuboring.",
  });
}
