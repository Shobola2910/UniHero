// app/api/contact/route.ts

import { NextResponse } from 'next/server';

const TELEGRAM_BOT_API_URL = "https://api.telegram.org/botYOUR_BOT_API_KEY/sendMessage";
const TELEGRAM_CHAT_ID = "YOUR_CHAT_ID"; // Chat ID where the messages will be sent

// Function to send the message to the Telegram bot
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

// Handle the GET request (for testing API)
export async function GET() {
  return NextResponse.json({
    status: 'success',
    message: 'Contact API is working perfectly.',
  }, { status: 200 });
}

// Handle the POST request (for submitting contact form)
export async function POST(request: Request) {
  try {
    const { fullName, telegramUser, comment } = await request.json();

    if (!fullName || !telegramUser || !comment) {
      return NextResponse.json({
        status: 'error',
        message: 'All fields are required!',
      }, { status: 400 });
    }

    // Send the comment to Telegram
    await sendToTelegram(fullName, telegramUser, comment);

    return NextResponse.json({
      status: 'success',
      message: 'Your comment has been sent successfully!',
    }, { status: 200 });

  } catch (error) {
    console.error('Error in processing contact form:', error);
    return NextResponse.json({
      status: 'error',
      message: 'An error occurred while processing your request.',
    }, { status: 500 });
  }
}
