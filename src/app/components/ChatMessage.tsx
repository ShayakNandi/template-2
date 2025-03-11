import React from 'react';
import Image from 'next/image';

interface ChatMessageProps {
  content: string;
  isPhilosopher: boolean;
  philosopherImage?: string;
}

export default function ChatMessage({ content, isPhilosopher, philosopherImage }: ChatMessageProps) {
  return (
    <div className={`flex ${isPhilosopher ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`max-w-3/4 ${isPhilosopher ? 'bg-white' : 'bg-indigo-100'} rounded-lg px-4 py-2 shadow`}>
        {isPhilosopher && philosopherImage && (
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
              <Image 
                src={philosopherImage} 
                alt="Philosopher" 
                width={32} 
                height={32} 
                className="object-cover"
              />
            </div>
            <span className="font-medium">Philosopher</span>
          </div>
        )}
        <p className="text-gray-800">{content}</p>
      </div>
    </div>
  );
} 