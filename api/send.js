// api/send.js
module.exports = async function handler(req, res) {
  console.log('🔔 API called at:', new Date().toISOString());
  
  if (req.method !== 'POST') {
    console.log('❌ Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, service, budget, deadline, message } = req.body || {};
    console.log('📨 Received data:', { name, email, service });

    // Проверяем Environment Variables
    if (!process.env.TELEGRAM_TOKEN) {
      console.error('❌ TELEGRAM_TOKEN is missing');
      return res.status(500).json({ error: 'Server configuration error: TELEGRAM_TOKEN missing' });
    }
    
    if (!process.env.CHAT_ID) {
      console.error('❌ CHAT_ID is missing');
      return res.status(500).json({ error: 'Server configuration error: CHAT_ID missing' });
    }

    console.log('✅ Environment variables are set');

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

    console.log('📤 Sending to Telegram...');
    
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
    console.log('📩 Telegram response:', data);

    if (data.ok) {
      console.log('✅ Message sent successfully');
      return res.status(200).json({ success: true });
    } else {
      console.error('❌ Telegram API error:', data);
      return res.status(500).json({ error: 'Telegram API error', details: data });
    }
  } catch (error) {
    console.error('🔥 Server error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}