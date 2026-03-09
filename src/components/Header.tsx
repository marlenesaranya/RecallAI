import React from 'react';
import { Logo } from './Logo';

export const Header: React.FC = () => {
  return (
    <header className="h-16 border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-md flex items-center px-8 sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <Logo size={32} />
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">RecallAI</h2>
          <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">Personal Executive Agent</p>
        </div>
      </div>
      
      <div className="ml-auto flex items-center gap-4">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search your memory..." 
            className="bg-zinc-900 border border-zinc-800 rounded-full px-4 py-1.5 text-sm text-zinc-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 w-64"
          />
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-1.5 rounded-full transition-colors">
          New Query
        </button>
      </div>
    </header>
  );
};
