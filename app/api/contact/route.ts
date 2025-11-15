// app/api/contact/route.ts
import { NextResponse } from 'next/server';

// ⚠️ Diqqat: odatda token ENV orqali yashirin saqlanadi,
// lekin hozir senga qulay bo‘lishi uchun to‘g‘ridan-to‘g‘ri yozib qo‘ydik.
const TELEGRAM_BOT_API_URL =
  'https://api.telegram.org/bot8219416435:AAHlhlp2vPogvuW-3r1b57nQwGE5oTdkPg0/sendMessage';

const TELEGRAM_CHAT_ID = '7711916897'; // xabar keladigan chat ID

type ContactBody = {
  fullName?: string;
  telegramUser?: string;
  comment?: string;
};

export async function POST(request: Request) {
  let body: ContactBody;

  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json(
      { status: 'error', message: 'Invalid JSON body.' },
      { status: 400 }
    );
  }

  const { fullName, telegramUser, comment } = body;

  if (!fullName || !telegramUser || !comment) {
    return NextResponse.json(
      { status: 'error', message: 'All fields are required.' },
      { status: 400 }
    );
  }

  const text =
    `New UniHero contact:\n\n` +
    `Full name: ${fullName}\n` +
    `Telegram user: ${telegramUser}\n` +
    `Comment:\n${comment}`;

  try {
    const res = await fetch(TELEGRAM_BOT_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json(
        {
          status: 'error',
          message: 'Telegram API error: ' + errText,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { status: 'success', message: 'Sent to Telegram.' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: 'Failed to send to Telegram.' },
      { status: 500 }
    );
  }
}
