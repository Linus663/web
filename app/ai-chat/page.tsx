'use client';

import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import styles from './ai-chat.module.css';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: string;
}

export default function AIChatPage() {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 初始化歡迎訊息
  useEffect(() => {
    setMessages([{
      id: 1,
      text: "您好！我是AI助手，很高興為您服務。請問有什麼我可以幫您的嗎？",
      isUser: false,
      timestamp: new Date().toLocaleTimeString()
    }]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    // 添加用戶訊息
    const userMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date().toLocaleTimeString()
    };

    // 將新訊息添加到陣列開頭
    setMessages(prev => [userMessage, ...prev]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // 調用 API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'API 請求失敗');
      }

      // 添加 AI 回應到陣列開頭
      const aiMessage: Message = {
        id: Date.now() + 1,
        text: data.response,
        isUser: false,
        timestamp: data.timestamp
      };

      setMessages(prev => [aiMessage, ...prev]);
    } catch (error) {
      console.error('Error:', error);
      alert(error instanceof Error ? error.message : '發生錯誤，請稍後再試');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.chatContainer}>
        <div className={styles.inputContainer}>
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="請輸入您的訊息..."
            className={styles.input}
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            className={styles.sendButton}
            disabled={inputMessage.trim() === '' || isLoading}
          >
            {isLoading ? '處理中...' : '發送'}
          </button>
        </div>
        <div className={styles.messagesContainer}>
          {isLoading && (
            <div className={`${styles.messageWrapper} ${styles.aiMessage}`}>
              <div className={styles.avatar}>
                <Image
                  src="/images/ai.jpg"
                  alt="AI"
                  width={40}
                  height={40}
                  className={styles.avatarImage}
                />
              </div>
              <div className={styles.message}>
                <div className={styles.loadingMessage}>
                  <FontAwesomeIcon icon={faSpinner} spin className={styles.spinner} />
                  <span>AI思考中，請稍後...</span>
                </div>
                <div className={styles.timestamp}>{new Date().toLocaleTimeString()}</div>
              </div>
            </div>
          )}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`${styles.messageWrapper} ${
                message.isUser ? styles.userMessage : styles.aiMessage
              }`}
            >
              {!message.isUser && (
                <div className={styles.avatar}>
                  <Image
                    src="/images/ai.jpg"
                    alt="AI"
                    width={40}
                    height={40}
                    className={styles.avatarImage}
                  />
                </div>
              )}
              <div className={styles.message}>
                {message.text}
                <div className={styles.timestamp}>{message.timestamp}</div>
              </div>
              {message.isUser && (
                <div className={styles.avatar}>
                  <Image
                    src="/images/user.jpg"
                    alt="User"
                    width={40}
                    height={40}
                    className={styles.avatarImage}
                  />
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
}
