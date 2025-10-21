// api/send.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, service, budget, deadline, message } = req.body || {};

  const telegramMessage = `
🎬 *НОВА ЗАЯВКА НА ВІДЕОМОНТАЖ!*

👤 *Ім'я:* ${name || 'Не вказано'}
📧 *Email:* ${email || 'Не вказано'}
📞 *Телефон:* ${phone || 'Не вказано'}
🎯 *Послуга:* ${service || 'Не вказано'}
💰 *Бюджет:* ${budget || 'Не вказано'}
⏰ *Терміни:* ${deadline || 'Не вказано'}

📝 *Опис проекту:*
${message || 'Не вказано'}

🕒 ${new Date().toLocaleString('uk-UA')}
  `;

  try {
    const response = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: process.env.CHAT_ID,
        text: telegramMessage,
        parse_mode: 'Markdown'
      })
    });

    const data = await response.json();
    if (!response.ok || !data.ok) {
      return res.status(500).json({ error: 'Помилка при відправці в Telegram', details: data });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Внутрішня помилка сервера' });
  }
}