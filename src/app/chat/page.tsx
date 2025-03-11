'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ChatMessage from '../components/ChatMessage';
import PhilosopherSelector from '../components/PhilosopherSelector';

// Sample data for demonstration
const samplePhilosophers = [
  { id: '1', name: 'Socrates', image: '/images/plato_6.svg' },
  { id: '2', name: 'Plato', image: '/images/plato_6.svg' },
  { id: '3', name: 'Aristotle', image: '/images/plato_6.svg' },
];

export default function ChatPage() {
  const [message, setMessage] = useState('');
  const [chatHistory, setHistory] = useState<{role: string, content: string}[]>([]);
  const [selectedPhilosopher, setSelectedPhilosopher] = useState(samplePhilosophers[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Add user message to chat history
    setHistory([...chatHistory, { role: 'user', content: message }]);
    
    // Will implement AI chat response later
    setMessage('');
  };

  return (
    <div className="flex flex-col h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-slate-200 py-4 px-8 flex justify-between items-center border-b border-slate-300">
        <h1 className="text-4xl font-bold text-slate-700">Philosopher&apos;s Mosaic</h1>
        <button className="bg-indigo-500 text-white px-3 py-1 rounded-md hover:bg-indigo-600 transition">
          Help
        </button>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar - Previous chats */}
        <div className="w-56 bg-slate-200 border-r border-slate-300 flex flex-col">
          <div className="p-4 font-medium text-slate-700 border-b border-slate-300">
            Previous Chats
          </div>
          <div className="flex-1 overflow-y-auto">
            {/* Previous chat entries would go here */}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col relative">
          {/* Top bar with philosopher selection */}
          <div className="absolute top-0 right-0 p-4 flex items-center">
            <PhilosopherSelector 
              philosophers={samplePhilosophers}
              selectedPhilosopher={selectedPhilosopher}
              onSelect={setSelectedPhilosopher}
            />
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-6 pt-16">
            {chatHistory.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
            ) : (
              chatHistory.map((msg, index) => (
                <ChatMessage 
                  key={index}
                  content={msg.content}
                  isPhilosopher={msg.role !== 'user'}
                  philosopherImage={msg.role !== 'user' ? selectedPhilosopher.image : undefined}
                />
              ))
            )}
          </div>

          {/* Input area */}
          <div className="p-4 border-t border-slate-300">
            <form onSubmit={handleSubmit} className="flex">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask Anything"
                className="flex-1 border border-slate-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 