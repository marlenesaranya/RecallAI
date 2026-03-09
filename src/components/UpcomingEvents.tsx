import React from 'react';
import { Event } from '../types';
import { mockEvents } from '../data/mockData';
import { Calendar, MapPin, Clock, MoreHorizontal } from 'lucide-react';
import { motion } from 'motion/react';

export const UpcomingEvents: React.FC = () => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white">Upcoming Events</h3>
        <p className="text-sm text-zinc-400">Events and meetings extracted from your calendar and communications.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4">
              <button className="text-zinc-600 hover:text-zinc-400 transition-colors">
                <MoreHorizontal size={18} />
              </button>
            </div>
            
            <div className="w-12 h-12 bg-indigo-600/10 rounded-xl flex items-center justify-center text-indigo-500 mb-4 group-hover:scale-110 transition-transform">
              <Calendar size={24} />
            </div>
            
            <h4 className="text-lg font-bold text-white mb-4">{event.name}</h4>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-zinc-400">
                <Clock size={16} className="text-zinc-600" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-400">
                <MapPin size={16} className="text-zinc-600" />
                <span>{event.location}</span>
              </div>
            </div>
            
            <div className="mt-6 flex items-center justify-between">
              <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${
                event.status === 'confirmed' 
                  ? 'bg-emerald-500/10 text-emerald-500' 
                  : 'bg-rose-500/10 text-rose-500'
              }`}>
                {event.status}
              </span>
              <button className="text-xs font-semibold text-white bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg transition-colors">
                Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
