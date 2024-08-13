import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

interface Messages {
  user: string;
  text: string;
}

const ChatWindow = () => {
  const [userText, setUserText] = useState<string>('');
  const [messages, setMessages] = useState<Messages[]>([]);
  const socket = io('http://localhost:8000');

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Receive messages and push to state
    socket.on('message', (msg: Messages) => {
      setMessages((prevState) => [...prevState, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    // Scroll to the bottom of the messages list when a new message arrives
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const username: string | null = localStorage.getItem('username');
      if (userText.trim()) {
        if (username) {
          socket.emit('message', { user: username, text: userText });
          setMessages((prevMessages) => [...prevMessages, { user: username, text: userText }]);
          setUserText('');
        }
      }
    } catch (error: any) {
      console.log('Error sending message', error?.message);
    }
  };

  const username = localStorage.getItem('username');

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-900">
      <div className="flex items-center justify-between mb-4 p-4 bg-gray-700 rounded-lg shadow-lg">
        <h1 className="text-xl font-bold text-white">
          You are logged in as: <span className="text-blue-300">{username}</span>
        </h1>
      </div>
      <h2 className="text-3xl font-bold text-white mb-4">Chat Window</h2>
      <div className="flex-1 overflow-y-auto mb-4 bg-gray-800 p-4 rounded-lg shadow-lg">
        <div className="flex-1 h-64 overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.user === username ? 'justify-end' : 'justify-start'
              } mb-2`}
            >
              <div
                className={`p-2 rounded-lg ${
                  message.user === username
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-700 text-white'
                }`}
              >
                <strong>{message.user}</strong>: {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          placeholder="Type your message"
          value={userText}
          onChange={(e) => setUserText(e.target.value)}
          className="flex-1 px-3 py-2 mr-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="py-2 px-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;