const express = require('express');
const cors = require('cors');
const { Ollama } = require('ollama');
const app = express();
const port = 3000;

const ollama = new Ollama({ host: 'http://localhost:11434' });

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/api/generate', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    const response = await ollama.generate({
      model: 'deepseek-r1:1.5b',
      prompt: prompt,
      stream: false
    });

    res.json({ response: response.response });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
