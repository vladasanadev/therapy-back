const axios = require('axios');

exports.handler = async (event) => {
  const { message } = JSON.parse(event.body);

  try {
    const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
      prompt: message,
      max_tokens: 50,
      temperature: 0.7
    }, {
      headers: {
        'Authorization': `Bearer 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` // Replace with your actual API key
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: response.data.choices[0].text.trim() })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Something went wrong' })
    };
  }
};
