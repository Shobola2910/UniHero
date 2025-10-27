// pages/api/send-comment.js

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, telegramUsername, comment } = req.body;
    
    const message = `
      New Comment Submitted:
      Name: ${name}
      Telegram Username: ${telegramUsername}
      Comment: ${comment}
    `;
    
    const botToken = process.env.TELEGRAM_COMMENT_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID; // Replace with your admin chat ID
    
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.ok) {
        res.status(200).json({ message: "Comment sent successfully!" });
      } else {
        res.status(500).json({ error: "Failed to send message" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to send message" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
