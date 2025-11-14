
import { NextResponse } from 'next/server';

const TELEGRAM_BOT_API_URL = "https://api.telegram.org/bot8219416435:AAHlhlp2vPogvuW-3r1b57nQwGE5oTdkPg0/sendMessage";
const TELEGRAM_CHAT_ID = "7711916897"; // Chat ID where the messages will be sent 

const API_URL = BOT_TOKEN
  ? `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`
  : '';

export async function POST(request: Request) {
  if (!BOT_TOKEN || !CHAT_ID) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Bot token or chat id is not configured on the server.',
      },
      { status: 500 }
    );
  }

  const { fullName, telegramUser, comment } = await request.json();

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
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text }),
    });

    return NextResponse.json(
      { status: 'success', message: 'Sent to Telegram.' },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { status: 'error', message: 'Failed to send to Telegram.' },
      { status: 500 }
    );
  }
}
