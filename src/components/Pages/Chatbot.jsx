import { useState, useEffect, useRef } from 'react';
import chatFlow from '../json/chatFlow.json';


const Chatbot = () => {
  const [currentStep, setCurrentStep] = useState('start');
  const [messages, setMessages] = useState([
    { type: 'bot', text: chatFlow.start.message },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChatbotVisible, setChatbotVisible] = useState(false);
  const chatWindowRef = useRef(null);

  const handleOptionClick = (nextStep, userText) => {
    const userMessage = { type: 'user', text: userText };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true); 
    setTimeout(() => {
      const nextFlow = chatFlow[nextStep];
      const botMessage = { type: 'bot', text: nextFlow.message };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentStep(nextStep);
      setIsLoading(false); 
    }, 1500); 
  };

  const handleUserInput = () => {
    const userMessage = { type: 'user', text: input.trim() };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
  
    const matchedOption = chatFlow[currentStep].options.find(
      (option) => option.text.toLowerCase() === input.trim().toLowerCase()
    );
  
    if (matchedOption) {
 
      setTimeout(() => {
        const nextFlow = chatFlow[matchedOption.next];
        const botMessage = { type: 'bot', text: nextFlow.message };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
        setCurrentStep(matchedOption.next);
      }, 1500); 
    } else {
  
      setTimeout(() => {
        const botResponse = { type: 'bot', text: "Sorry, I didn’t understand that." };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      }, 1500); 
    }
  
    setInput('');
  };
  

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <button
        className={`chat-toggle ${isChatbotVisible ? 'chat-toggle-open' : ''}`}
        onClick={() => setChatbotVisible(!isChatbotVisible)}
      >
        {isChatbotVisible ? '▼' : '💬'}
      </button>
      {isChatbotVisible && (
        <div className="chatbot">
          <div className="chat-window" ref={chatWindowRef}>
            {messages.map((msg, idx) => (
              <div key={idx} className={msg.type === 'bot' ? 'bot-message' : 'user-message'}>
                <div className="message-text">{msg.text}</div>
                </div>
            ))}
            {isLoading && (
               <div className="loading-message">
               <div className="dot-spinner">
                 <span></span>
                 <span></span>
                 <span></span>
               </div>
             
             </div>
           )}
            <div className="chat-options">
              {!isLoading &&
                chatFlow[currentStep].options.map((option, idx) => (
                  <button key={idx} onClick={() => handleOptionClick(option.next, option.text)}>
                    {option.text}
                  </button>
                ))}
            </div>
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button onClick={handleUserInput}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
