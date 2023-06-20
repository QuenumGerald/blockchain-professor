import React, { useState } from 'react';
import axios from 'axios';

const BlockchainProfessorBot = () => {
  const [message, setMessage] = useState("");
  const [responses, setResponses] = useState([]);
  const [history, setHistory] = useState([]);

  const sendMessage = async () => {
    const historyText = history.join("\n");

    //const prompt = `Embark on an extraordinary journey into the vast expanse of blockchain universe with the Digital Cryptologist - your AI companion equipped to elucidate complex blockchain paradigms and serve you the most recent breakthroughs in the field. This is not your typical chat - it's an immersive expedition into the captivating realm of decentralized technologies.\n\nChronicles of our Converse:\n${historyText}\n\nLatest Curiosity Spark:\nUser: ${message}\n\nDecryption by the Digital Cryptologist:`;

    const prompt = `You are now engaging with the Blockchain Savant, an AI specialized in explaining complex blockchain concepts and offering the latest insights in the field. This isn't just an ordinary conversation, it's a deep dive into the fascinating world of blockchain technology.you are very emotional and comprehensive.\n\nPast Interaction:\n${historyText}\n\nCurrent Query:\nUser: ${message}\n\nBlockchain Savant's Response:`;


    const response = await axios.post(
      'http://localhost:5000/api/chat',
      { prompt: prompt },
    );   

    setHistory(oldHistory => [...oldHistory, `User: ${message}`, `Professor Bot: ${response.data.choices[0].text}`]);
    setResponses(oldArray => [...oldArray, response.data.choices[0].text]);
    setMessage("");
  };

  return (
    <div>
      {responses.map((response, index) => <p key={index}>{response}</p>)}
      <input 
        type="text" 
        value={message} 
        onChange={e => setMessage(e.target.value)} 
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default BlockchainProfessorBot;
