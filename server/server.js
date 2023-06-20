const express = require("express");
const axios = require("axios");
const cors = require("cors");
require('dotenv').config()

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", function(req,res){
  res.sendFile(path.join(__dirname,"../client/build/index.html"),
  function (err){
    if(err){
      res.status(500).send(err);
    }
  })
});

app.use(express.static(path.join(__dirname, 'blockchain-bot/build')));


app.post("/api/chat", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {  model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 150,
        temperature: 0.9
      },
      {
        headers: {
          Authorization:`Bearer ${process.env.OPENAI_API_KEY}`
        }
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
  
});

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server started on port ${port}`));
 //console.log(process.env.OPENAI_API_KEY)