// pages/api/send-comment.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, telegramUsername, comment } = req.body;

    // Telegram botga izoh yuborish kodi
    const message = `New comment:\nName: ${name}\nTelegram Username: ${telegramUsername}\nComment: ${comment}`;
    
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID;

    const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: message })
    });

    if (response.ok) {
      return res.status(200).json({ message: 'Comment sent successfully!' });
    } else {
      return res.status(500).json({ message: 'Failed to send comment' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
