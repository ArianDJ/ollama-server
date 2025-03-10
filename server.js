const express = require('express');
const cors = require('cors');
const ollama = require('ollama');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Ollama route
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
