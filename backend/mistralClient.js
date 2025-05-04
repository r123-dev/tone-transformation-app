const axios = require('axios');

function mapToneLevel(level) {
  if (level < 30) return 'formal';
  if (level > 70) return 'casual';
  return 'neutral';
}

async function adjustTone(text, toneLevel) {
  const tone = mapToneLevel(toneLevel);
  const prompt = `Please rewrite this text in a ${tone} tone: "${text}"`;

  const response = await axios.post(
    'https://api.mistral.ai/v1/chat/completions',
    {
      model: 'mistral-small',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data.choices[0].message.content;
}

module.exports = { adjustTone };
