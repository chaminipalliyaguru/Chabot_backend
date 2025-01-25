import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { AzureOpenAI } from 'openai';

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Azure OpenAI configuration
const endpoint = "";
const apiKey = "";
const apiVersion = "";
const deployment = ""; // This must match your deployment name.

const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment });

// API endpoint to handle user input
app.post('/chat', async (req, res) => {
  try {
    const userInput = req.body.message;


    const result = await client.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant about cultures in the countries." },
        { role: "user", content: userInput },
      ],
      model: deployment,
    });

    const response = result.choices[0].message.content;
    res.json({ response });
  } catch (err) {
    console.error("The sample encountered an error:", err);
    res.status(500).json({ error: "An error occurred while processing your request." });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
