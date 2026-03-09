import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ChatInterface } from './components/ChatInterface';
import { DecisionTimeline } from './components/DecisionTimeline';
import { UpcomingEvents } from './components/UpcomingEvents';
import { DocumentViewer } from './components/DocumentViewer';
import { 
  LayoutDashboard, 
  Activity, 
  Users, 
  Clock, 
  ChevronRight, 
  Calendar, 
  CheckCircle2, 
  MapPin, 
  Zap, 
  FileText 
} from 'lucide-react';
import { motion } from 'motion/react';
import { mockDecisions, mockEvents } from './data/mockData';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDocViewerOpen, setIsDocViewerOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<any>(null);

  const openDoc = (doc: any) => {
    setSelectedDoc(doc);
    setIsDocViewerOpen(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="p-8 space-y-12 max-w-7xl mx-auto">
            {/* 1. Overview Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total Decisions', value: '124', icon: Activity, color: 'text-indigo-500', trend: '+12%' },
                { label: 'Active Projects', value: '12', icon: LayoutDashboard, color: 'text-emerald-500', trend: '+2' },
                { label: 'Key Contacts', value: '48', icon: Users, color: 'text-amber-500', trend: '+5' },
                { label: 'Memory Usage', value: '2.4 GB', icon: Clock, color: 'text-rose-500', trend: 'Stable' },
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-zinc-900/50 border border-zinc-800/50 p-6 rounded-2xl backdrop-blur-sm hover:border-zinc-700 transition-colors"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={cn("p-2 rounded-lg bg-zinc-950 border border-zinc-800", stat.color)}>
                      <stat.icon size={18} />
                    </div>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{stat.trend} this week</span>
                  </div>
                  <p className="text-3xl font-bold text-white tracking-tight">{stat.value}</p>
                  <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* 2. Upcoming Events Section */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Calendar size={20} className="text-emerald-500" />
                  Upcoming Events
                </h3>
                <button onClick={() => setActiveTab('events')} className="text-xs text-indigo-400 hover:text-indigo-300 font-bold uppercase tracking-widest">View Calendar</button>
              </div>
              <div className="space-y-4">
                {mockEvents.map((event, i) => (
                  <motion.div 
                    key={event.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="bg-zinc-900/40 border border-zinc-800/50 p-4 rounded-2xl flex items-center gap-6 hover:bg-zinc-900/60 transition-colors group"
                  >
                    <div className="flex flex-col items-center justify-center w-16 h-16 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-400 group-hover:border-emerald-500/50 transition-colors shrink-0">
                      <span className="text-[10px] font-bold uppercase tracking-tighter">{event.date.split(' ')[0]}</span>
                      <span className="text-2xl font-bold text-white leading-none">{event.date.split(' ')[1].replace(',', '')}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-base font-bold text-white truncate">{event.name}</h4>
                        <span className={cn(
                          "text-[9px] font-bold uppercase px-2 py-0.5 rounded-full",
                          event.status === 'confirmed' ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
                        )}>
                          {event.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-zinc-500">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={12} className="text-zinc-600" />
                          <span className="truncate">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={12} className="text-zinc-600" />
                          <span>10:00 AM</span>
                        </div>
                      </div>
                    </div>
                    <button className="p-2 text-zinc-600 hover:text-zinc-400 transition-colors">
                      <ChevronRight size={20} />
                    </button>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* 3. Recent Decisions Section */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-indigo-500" />
                  Recent Decisions
                </h3>
                <button onClick={() => setActiveTab('timeline')} className="text-xs text-indigo-400 hover:text-indigo-300 font-bold uppercase tracking-widest">Full Timeline</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockDecisions.map((decision, i) => (
                  <motion.div 
                    key={decision.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="bg-zinc-900/40 border-l-4 border-l-indigo-500 border-y border-r border-zinc-800/50 p-6 rounded-r-2xl relative group hover:bg-zinc-900/60 transition-all"
                  >
                    <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                      <CheckCircle2 size={16} />
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{decision.date}</span>
                      <span className="w-1 h-1 rounded-full bg-zinc-700" />
                      <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">{decision.sourceType}</span>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">{decision.title}</h4>
                    <p className="text-sm text-zinc-400 leading-relaxed">{decision.summary}</p>
                    <div className="mt-4 flex items-center gap-2 text-[10px] text-zinc-600 font-bold uppercase">
                      <FileText size={12} />
                      Source: {decision.source}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* 4. Recent Activity Section */}
            <section className="space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Zap size={20} className="text-rose-500" />
                Recent Activity
              </h3>
              <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-6">
                <div className="space-y-8">
                  {[
                    { title: 'New decision identified', desc: 'RecallAI processed "Venue_Contract.pdf" and extracted a catering decision.', time: '1 hour ago', icon: CheckCircle2, color: 'text-indigo-500' },
                    { title: 'Document processed', desc: 'Indexing complete for "Marketing_Strategy_v2.docx". 4 new entities detected.', time: '3 hours ago', icon: FileText, color: 'text-emerald-500' },
                    { title: 'Event extracted', desc: 'New meeting "Budget Review" found in email thread with Priya.', time: '5 hours ago', icon: Calendar, color: 'text-amber-500' },
                    { title: 'Contact detected', desc: 'New contact "Suresh (Logistics)" added to your network.', time: 'Yesterday', icon: Users, color: 'text-rose-500' },
                  ].map((activity, i) => (
                    <div key={i} className="flex gap-4 relative last:pb-0 pb-8 before:absolute before:left-4 before:top-8 before:bottom-0 before:w-px before:bg-zinc-800/50 last:before:hidden">
                      <div className={cn("w-8 h-8 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center shrink-0 z-10", activity.color)}>
                        <activity.icon size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm text-zinc-200 font-bold">{activity.title}</p>
                          <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">{activity.time}</span>
                        </div>
                        <p className="text-xs text-zinc-500 leading-relaxed">{activity.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        );
      case 'chat':
        return <ChatInterface />;
      case 'timeline':
        return <DecisionTimeline onViewSource={openDoc} />;
      case 'events':
        return <UpcomingEvents />;
      default:
        return (
          <div className="flex items-center justify-center h-full text-zinc-500">
            <div className="text-center">
              <p className="text-lg font-medium">Section coming soon</p>
              <p className="text-sm">We're still indexing your {activeTab} information.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-200 font-sans overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto">
          {renderContent()}
        </div>
      </main>

      <DocumentViewer 
        isOpen={isDocViewerOpen} 
        onClose={() => setIsDocViewerOpen(false)} 
        document={selectedDoc}
      />
    </div>
  );
}
