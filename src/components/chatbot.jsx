import React, { useState } from 'react';
import './Chatbot.css'; // Optional: Add styles for the chatbot

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);

    // Simulate API call to AI service (replace this with your actual API call)
    const botResponse = await fetchChatbotResponse(input);
    const botMessage = { text: botResponse, sender: 'bot' };
    setMessages((prev) => [...prev, botMessage]);

    setInput('');
  };

  const fetchChatbotResponse = async (userInput) => {
    // Here you would call your AI API, e.g., ChatGPT, Bing, etc.
    // For demonstration, we'll return a static response
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`You said: "${userInput}". How can I assist you further?`);
      }, 1000); // Simulate a delay
    });
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">Chatbot</div>
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
