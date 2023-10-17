const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
  
    try {
      const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
        prompt: message,
        max_tokens: 50,
        temperature: 0.7
      }, {
        headers: {
          'Authorization': `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`  // actual API key
        }
      });
  
      res.json({ reply: response.data.choices[0].text.trim() });
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  });
