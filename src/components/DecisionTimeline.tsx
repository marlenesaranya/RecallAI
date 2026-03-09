import React, { useMemo } from 'react';
import { Decision } from '../types';
import { mockDecisions } from '../data/mockData';
import { Mail, FileText, MessageCircle, ChevronRight, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

interface DecisionTimelineProps {
  onViewSource: (doc: any) => void;
}

export const DecisionTimeline: React.FC<DecisionTimelineProps> = ({ onViewSource }) => {
  // Sort and group decisions by month
  const groupedDecisions = useMemo(() => {
    const sorted = [...mockDecisions].sort((a, b) => b.timestamp - a.timestamp);
    
    const groups: { [key: string]: Decision[] } = {};
    
    sorted.forEach(decision => {
      const date = new Date(decision.timestamp);
      const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' }).toUpperCase();
      
      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }
      groups[monthYear].push(decision);
    });
    
    return Object.entries(groups);
  }, []);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-white tracking-tight">Timeline of Decisions</h3>
        <p className="text-sm text-zinc-400 mt-1">A chronological record of all key decisions identified by RecallAI across your workspace.</p>
      </div>
      
      <div className="space-y-16">
        {groupedDecisions.map(([month, decisions], groupIndex) => (
          <div key={month} className="space-y-8">
            {/* Month Header */}
            <div className="flex items-center gap-4">
              <h4 className="text-lg font-black text-white tracking-[0.2em] whitespace-nowrap">{month}</h4>
              <div className="h-px w-full bg-zinc-800/50" />
            </div>

            <div className="relative space-y-10 pl-8 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-px before:bg-zinc-800">
              {decisions.map((decision, index) => (
                <motion.div 
                  key={decision.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                >
                  {/* Timeline Dot */}
                  <div className="absolute -left-[33px] top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-950 border-2 border-indigo-500 z-10 group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                  
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Date Column */}
                    <div className="md:w-24 shrink-0">
                      <p className="text-sm font-bold text-zinc-500 uppercase tracking-wider">{decision.date.split(',')[0]}</p>
                    </div>

                    {/* Decision Card */}
                    <div className="flex-1 bg-zinc-900/40 border border-zinc-800/50 p-6 rounded-2xl hover:border-zinc-700 hover:bg-zinc-900/60 transition-all shadow-xl">
                      <div className="flex items-start justify-between mb-4">
                        <div className="space-y-1">
                          <h5 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">{decision.title}</h5>
                          <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                            {decision.sourceType === 'email' && <Mail size={10} className="text-indigo-500" />}
                            {decision.sourceType === 'pdf' && <FileText size={10} className="text-emerald-500" />}
                            {decision.sourceType === 'chat' && <MessageCircle size={10} className="text-amber-500" />}
                            <span>Source: {decision.source}</span>
                          </div>
                        </div>
                        <div className="p-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-500">
                          <Calendar size={14} />
                        </div>
                      </div>

                      <p className="text-sm text-zinc-400 leading-relaxed mb-6">{decision.summary}</p>
                      
                      <div className="flex items-center justify-end pt-4 border-t border-zinc-800/50">
                        <button 
                          onClick={() => onViewSource({
                            title: decision.source,
                            type: decision.sourceType,
                            content: `This is the original content for ${decision.source}. \n\nDecision: ${decision.title}\nDate: ${decision.date}\n\nSummary: ${decision.summary}`
                          })}
                          className="text-indigo-400 hover:text-indigo-300 text-xs font-bold flex items-center gap-1 transition-colors group/btn"
                        >
                          View Source 
                          <ChevronRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
