import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { FaArrowUp } from "react-icons/fa";
import chatbotIcon from "../../assets/image.png"; 
import ChatMessages from "../chatbot/ChatMessages";
import { ChatInput } from "../chatbot/ChatInput";
import "./FloatingActions.css"; 

const FloatingActions = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { message: "Hello! I am Amor Chat", sender: "robot", id: crypto.randomUUID() }
  ]);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) setIsVisible(true);
      else setIsVisible(false);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="floating-container">
      {isOpen && (
        <div className="chatbot-popup shadow-lg">
          <div className="chatbot-header">
            <span>Amor Chat</span>
            <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
          </div>
          <div className="chatbot-body">
            <ChatMessages chatMessages={chatMessages} />
          </div>
          <div className="chatbot-footer">
            <ChatInput setChatMessages={setChatMessages} />
          </div>
        </div>
      )}

      {isVisible && (
        <Button 
          variant="primary" 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} 
          className="rounded-circle shadow btn-scroll mb-2"
        >
          <FaArrowUp />
        </Button>
      )}

      <div className="chatbot-trigger" onClick={() => setIsOpen(!isOpen)}>
        <img src={chatbotIcon} alt="Chatbot" className="chatbot-img shadow" />
      </div>
    </div>
  );
};

export default FloatingActions;