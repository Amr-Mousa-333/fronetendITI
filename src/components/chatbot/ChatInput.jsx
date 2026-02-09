import { useState } from 'react';
import { getBotResponse } from "../../utils/getBotResponse";
import './ChatInput.css';

export function ChatInput({ setChatMessages }) {
  const [inputText, setInputText] = useState('');

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  function sendMessage() {
    if (!inputText.trim()) return;

    const userMessage = {
      message: inputText,
      sender: 'user',
      id: crypto.randomUUID()
    };

    const botMessage = {
      message: getBotResponse(inputText),
      sender: 'robot',
      id: crypto.randomUUID()
    };

    setChatMessages(prev => [...prev, userMessage, botMessage]);
    setInputText('');
  }

  return (
    <div className="chat-input-container">
      <input
        placeholder="Send a message to Chatbot"
        size="30"
        value={inputText}
        onChange={saveInputText}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        className="chat-input"
      />
      <button
        onClick={sendMessage}
        className="send-button"
      >
        Send
      </button>
    </div>
  );
}
