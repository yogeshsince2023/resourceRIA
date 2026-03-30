import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { askRIA } from "../lib/gemini";
import "./RIAModal.css";

const RIAModal = ({ subject, onClose }) => {
  const [messages, setMessages] = useState([
    { role: "assistant", content: `Hi! I'm RIA ✨. I'm here to explain concepts, suggest analogies, and guide your learning for **${subject?.name || 'this subject'}**. What would you like to know?` }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const isMountedRef = useRef(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const promptContext = `Context: The student is asking about the subject "${subject?.name || 'this subject'}". Ensure your explanation is simple, provides a real-world analogy if possible, and suggests related topics.\n\nStudent Query: ${userMessage}`;
      const response = await askRIA(promptContext);
      if (isMountedRef.current) {
        setMessages(prev => [...prev, { role: "assistant", content: response }]);
      }
    } catch (error) {
      console.error("Error in RIA:", error);
      if (isMountedRef.current) {
        setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I couldn't process your request right now. Please try again." }]);
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  };

  return (
    <div className="ria-modal-backdrop" onClick={onClose}>
      <motion.div
        className="ria-modal"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="ria-modal-header">
          <h3>Ask RIA ✨</h3>
          <p>{subject?.name || 'this subject'}</p>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <div className="ria-chat-window">
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-bubble ${msg.role}`}>
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          ))}
          {loading && (
            <div className="chat-bubble assistant typing">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="ria-modal-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder={`Ask about ${subject?.name || 'this subject'}...`}
            disabled={loading}
          />
          <button onClick={handleSend} disabled={loading || !input.trim()} className="btn-primary">
            Send
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default RIAModal;
