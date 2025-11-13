// app/api/contact/route.ts

import { NextResponse } from 'next/server';

const TELEGRAM_BOT_API_URL = "https://api.telegram.org/bot8219416435:AAHlhlp2vPogvuW-3r1b57nQwGE5oTdkPg0/sendMessage";
const TELEGRAM_CHAT_ID = "7711916897"; // Chat ID where the messages will be sent

async function sendToTelegram(name: string, telegramUser: string, comment: string) {
  const message = `New comment from UniHero contact form:\n\nFull Name: ${name}\nTelegram User: ${telegramUser}\nComment: ${comment}`;

  const response = await fetch(TELEGRAM_BOT_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
    }),
  });

  return response.json();
}

export async function POST(request: Request) {
  const { fullName, telegramUser, comment } = await request.json();

  if (!fullName || !telegramUser || !comment) {
    return NextResponse.json({
      status: 'error',
      message: 'All fields are required!',
    }, { status: 400 });
  }

  await sendToTelegram(fullName, telegramUser, comment);

  return NextResponse.json({
    status: 'success',
    message: 'Your comment has been sent successfully!',
  }, { status: 200 });
}
