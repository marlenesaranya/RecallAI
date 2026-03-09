import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  FileText, 
  Mail, 
  MessageCircle, 
  Paperclip, 
  ChevronRight, 
  Calendar, 
  Activity, 
  Users, 
  Wallet, 
  CheckCircle2, 
  Clock,
  ExternalLink
} from 'lucide-react';
import { Message, Event, Decision } from '../types';
import { mockMessages } from '../data/mockData';
import { motion, AnimatePresence } from 'motion/react';
import { DecisionGraph } from './DecisionGraph';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Logo } from './Logo';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };
    
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput('');
    
    // Simulate AI response based on input
    setTimeout(() => {
      let aiMsg: Message;
      
      if (currentInput.toLowerCase().includes('event') || currentInput.toLowerCase().includes('logistics')) {
        aiMsg = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "I've analyzed your communications regarding event logistics. Here are the key details I've extracted:",
          structuredData: {
            events: [
              { id: 'e1', name: 'Tech Fest', date: 'Mar 20', location: 'Main Auditorium', status: 'confirmed' },
              { id: 'e2', name: 'Workshop', date: 'Mar 15', location: 'Lab 2', status: 'pending' }
            ],
            budget: { amount: '₹50,000', status: 'Finalized', details: 'Allocated for venue and catering' },
            contacts: [
              { name: 'Rahul', role: 'Primary contact for venue coordination' }
            ]
          },
          sources: [
            { title: 'Logistics_Team_Email.eml', type: 'email' },
            { title: 'Venue_Contract.pdf', type: 'pdf' }
          ],
          graphData: {
            nodes: [
              { id: 'e1', label: 'Tech Fest', type: 'event' },
              { id: 'l1', label: 'Main Auditorium', type: 'location' },
              { id: 'b1', label: '₹50,000 Budget', type: 'budget' },
              { id: 'p1', label: 'Rahul', type: 'person' },
              { id: 'd1', label: 'Logistics Finalized', type: 'decision' }
            ],
            links: [
              { source: 'e1', target: 'l1' },
              { source: 'e1', target: 'd1' },
              { source: 'd1', target: 'b1' },
              { source: 'd1', target: 'p1' }
            ]
          }
        };
      } else if (currentInput.toLowerCase().includes('budget') || currentInput.toLowerCase().includes('marketing')) {
        aiMsg = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "Regarding the marketing budget, I found the following information in your recent documents:",
          structuredData: {
            budget: { amount: '₹80,000', status: 'Approved', details: 'Allocation for social media and banners' },
            contacts: [
              { name: 'Priya', role: 'Responsible for budget allocation' }
            ],
            decisions: [
              { id: 'd2', title: 'Marketing budget approved', date: 'Feb 28, 2026', timestamp: Date.now(), summary: '₹80,000 allocated for advertising', source: 'Budget_Approval_Q1.pdf', sourceType: 'pdf' }
            ]
          },
          sources: [
            { title: 'Budget_Approval_Q1.pdf', type: 'pdf' },
            { title: 'Marketing_Strategy.docx', type: 'document' }
          ],
          graphData: {
            nodes: [
              { id: 'd2', label: 'Marketing Budget', type: 'decision' },
              { id: 'b2', label: '₹80,000', type: 'budget' },
              { id: 'p2', label: 'Priya', type: 'person' },
              { id: 's1', label: 'Social Media Ads', type: 'task' }
            ],
            links: [
              { source: 'd2', target: 'b2' },
              { source: 'd2', target: 'p2' },
              { source: 'd2', target: 's1' }
            ]
          }
        };
      } else {
        aiMsg = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "I'm analyzing your documents for that information. Based on what I've found so far, it seems related to your general project planning.",
          sources: [
            { title: 'General_Notes.pdf', type: 'pdf' }
          ]
        };
      }
      
      setMessages(prev => [...prev, aiMsg]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-zinc-950">
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={cn(
                "max-w-[85%] space-y-4",
                msg.role === 'user' ? "w-auto" : "w-full"
              )}>
                {msg.role === 'user' ? (
                  <div className="bg-indigo-600 text-white rounded-2xl rounded-tr-none p-4 shadow-lg">
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* RecallAI Response Card */}
                    <div className="bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-2xl rounded-tl-none overflow-hidden shadow-2xl">
                      {/* Header */}
                      <div className="px-6 py-4 border-b border-zinc-800 bg-zinc-900/50 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Logo size={24} />
                          <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">RecallAI Response</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Live Analysis</span>
                        </div>
                      </div>

                      <div className="p-6 space-y-8">
                        {/* Main Content */}
                        <p className="text-sm leading-relaxed text-zinc-300">{msg.content}</p>

                        {/* Structured Data Sections */}
                        {msg.structuredData && (
                          <div className="space-y-8">
                            {/* Event Insights */}
                            {msg.structuredData.events && msg.structuredData.events.length > 0 && (
                              <div className="space-y-4">
                                <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                  <Calendar size={14} className="text-emerald-500" />
                                  Event Insights
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {msg.structuredData.events.map((event) => (
                                    <div key={event.id} className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors">
                                      <div className="flex items-center justify-between mb-2">
                                        <h5 className="text-sm font-bold text-white">{event.name}</h5>
                                        <span className={cn(
                                          "text-[9px] font-bold uppercase px-2 py-0.5 rounded-full",
                                          event.status === 'confirmed' ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
                                        )}>
                                          {event.status}
                                        </span>
                                      </div>
                                      <div className="space-y-1">
                                        <p className="text-xs text-zinc-400 flex items-center gap-1.5">
                                          <Clock size={10} /> {event.date}
                                        </p>
                                        <p className="text-xs text-zinc-500 flex items-center gap-1.5">
                                          <Activity size={10} /> {event.location}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Budget Summary */}
                            {msg.structuredData.budget && (
                              <div className="space-y-4">
                                <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                  <Wallet size={14} className="text-indigo-500" />
                                  Budget Summary
                                </h4>
                                <div className="p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-xl flex items-center justify-between">
                                  <div>
                                    <p className="text-2xl font-bold text-white tracking-tight">{msg.structuredData.budget.amount}</p>
                                    <p className="text-xs text-zinc-400 mt-1">{msg.structuredData.budget.details}</p>
                                  </div>
                                  <span className="text-[10px] font-bold uppercase px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full border border-indigo-500/30">
                                    {msg.structuredData.budget.status}
                                  </span>
                                </div>
                              </div>
                            )}

                            {/* Key Contacts */}
                            {msg.structuredData.contacts && msg.structuredData.contacts.length > 0 && (
                              <div className="space-y-4">
                                <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                  <Users size={14} className="text-amber-500" />
                                  Key Contacts
                                </h4>
                                <div className="space-y-2">
                                  {msg.structuredData.contacts.map((contact, i) => (
                                    <div key={i} className="flex items-center gap-4 p-3 bg-zinc-950 border border-zinc-800 rounded-xl">
                                      <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 font-bold text-xs uppercase">
                                        {contact.name.substring(0, 2)}
                                      </div>
                                      <div>
                                        <p className="text-sm font-bold text-white">{contact.name}</p>
                                        <p className="text-xs text-zinc-500">{contact.role}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Decisions */}
                            {msg.structuredData.decisions && msg.structuredData.decisions.length > 0 && (
                              <div className="space-y-4">
                                <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                  <CheckCircle2 size={14} className="text-indigo-500" />
                                  Key Decisions
                                </h4>
                                <div className="space-y-3">
                                  {msg.structuredData.decisions.map((decision) => (
                                    <div key={decision.id} className="p-4 bg-zinc-950 border-l-2 border-l-indigo-500 border-y border-r border-zinc-800 rounded-r-xl">
                                      <h5 className="text-sm font-bold text-white mb-1">{decision.title}</h5>
                                      <p className="text-xs text-zinc-500">{decision.summary}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Sources Section */}
                        {msg.sources && (
                          <div className="pt-6 border-t border-zinc-800">
                            <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-4">Sources</h4>
                            <div className="flex flex-wrap gap-2">
                              {msg.sources.map((source, i) => (
                                <button key={i} className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 px-3 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-white hover:border-zinc-600 transition-all group">
                                  {source.type === 'pdf' && <FileText size={14} className="text-rose-500" />}
                                  {source.type === 'email' && <Mail size={14} className="text-indigo-500" />}
                                  {source.type === 'chat' && <MessageCircle size={14} className="text-amber-500" />}
                                  {source.type === 'document' && <FileText size={14} className="text-emerald-500" />}
                                  <span className="font-medium">{source.title}</span>
                                  <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Conditional Graph Card */}
                    {msg.graphData && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl"
                      >
                        <DecisionGraph 
                          nodes={msg.graphData.nodes} 
                          links={msg.graphData.links}
                          title="Related Knowledge Graph"
                          subtitle="Visualizing entities and relationships detected in this response."
                          height="h-[400px]"
                        />
                      </motion.div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {/* Input Area */}
      <div className="p-6 border-t border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto">
          <div className="relative group">
            <div className="absolute inset-0 bg-indigo-500/5 blur-xl rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
            <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-2 flex items-center gap-2 shadow-xl focus-within:border-zinc-700 transition-all">
              <button className="p-2 text-zinc-500 hover:text-zinc-300 transition-colors">
                <Paperclip size={20} />
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about events, budgets, decisions, or contacts..."
                className="flex-1 bg-transparent border-none px-2 py-2 text-sm text-zinc-200 focus:outline-none placeholder:text-zinc-600"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim()}
                className={cn(
                  "p-2 rounded-xl transition-all flex items-center justify-center",
                  input.trim() 
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-500" 
                    : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                )}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 mt-4">
            <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-black flex items-center gap-2">
              <Logo size={12} />
              Context-Aware Intelligence
            </p>
            <span className="w-1 h-1 rounded-full bg-zinc-800" />
            <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-black flex items-center gap-2">
              <CheckCircle2 size={12} />
              Verified Sources
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
