import React, { useState } from 'react';
import Image from 'next/image';

interface Philosopher {
  id: string;
  name: string;
  image: string;
}

interface PhilosopherSelectorProps {
  philosophers: Philosopher[];
  selectedPhilosopher: Philosopher;
  onSelect: (philosopher: Philosopher) => void;
}

export default function PhilosopherSelector({ 
  philosophers, 
  selectedPhilosopher, 
  onSelect 
}: PhilosopherSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        className="flex items-center space-x-2 bg-slate-200 px-4 py-2 rounded-md hover:bg-slate-300 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Change Philosopher</span>
        <span className="text-pink-500">
          {selectedPhilosopher.image ? (
            <Image 
              src={selectedPhilosopher.image} 
              alt={selectedPhilosopher.name} 
              width={24} 
              height={24} 
              className="rounded-full"
            />
          ) : (
            '👤'
          )}
        </span>
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white rounded-md shadow-lg overflow-hidden z-10 w-56">
          {philosophers.map(philosopher => (
            <button
              key={philosopher.id}
              className="flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-slate-100"
              onClick={() => {
                onSelect(philosopher);
                setIsOpen(false);
              }}
            >
              {philosopher.image ? (
                <Image 
                  src={philosopher.image} 
                  alt={philosopher.name} 
                  width={24} 
                  height={24} 
                  className="rounded-full"
                />
              ) : (
                <span>👤</span>
              )}
              <span>{philosopher.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 