// import { Configuration, OpenAIApi } from "openai";
// import readline from "readline";

// const configuration = new Configuration({
//     organization: VITE_OPENAI_API_URL,
//     apiKey: VITE_OPENAI_API_KEY,
//   });

// const openai = new OpenAIApi(configuration);

// const express = require('express')
// const app = express()
// const port = 3000

// app.get('/',(req,res) => {
//     res.send('');
// })

// app.listen(port, () => {
//     console.log(`Example app listing port on ${port}`);
// })


// require("dotenv").config();
// const axios = require("axios");

// const endpoint = 'https://crosscult.openai.azure.com/';
// const apiKey = '97SGT1aNouNR6myZnKV3PlTResX2zcLoB0hoKR8wZy6wBgRe6euEJQQJ99BAACYeBjFXJ3w3AAABACOGNzJE';
// const deploymentName = 'gpt-35-turbo';

// const chatCompletion = async () => {
//   try {
//     const response = await axios.post(
//       `${endpoint}openai/deployments/${deploymentName}/chat/completions?api-version=2023-03-15-preview`,
//       {
//         messages: [
//           { role: "system", content: "You are a helpful assistant." },
//           { role: "user", content: "What's the HTML?" },
//         ],
//         max_tokens: 50,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "api-key": apiKey,
//         },
//       }
//     );

//     console.log(response.data.choices[0].message.content);
//   } catch (error) {
//     console.error(error.response ? error.response.data : error.message);
//   }
// };

// chatCompletion();




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
const endpoint = "https://crosscult.openai.azure.com/";
const apiKey = "97SGT1aNouNR6myZnKV3PlTResX2zcLoB0hoKR8wZy6wBgRe6euEJQQJ99BAACYeBjFXJ3w3AAABACOGNzJE";
const apiVersion = "2024-05-01-preview";
const deployment = "gpt-35-turbo"; // This must match your deployment name.

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