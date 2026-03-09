import React from 'react';
import { FileText, Mail, MessageCircle, X, Download, Share2 } from 'lucide-react';

interface DocumentViewerProps {
  isOpen: boolean;
  onClose: () => void;
  document?: {
    title: string;
    type: 'pdf' | 'email' | 'chat';
    content: string;
  };
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({ isOpen, onClose, document }) => {
  if (!isOpen || !document) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-zinc-900 border border-zinc-800 w-full max-w-4xl h-[80vh] rounded-2xl flex flex-col overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-800 rounded-lg text-indigo-400">
              {document.type === 'pdf' && <FileText size={20} />}
              {document.type === 'email' && <Mail size={20} />}
              {document.type === 'chat' && <MessageCircle size={20} />}
            </div>
            <div>
              <h4 className="text-white font-semibold">{document.title}</h4>
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">{document.type}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 text-zinc-400 hover:text-white transition-colors">
              <Download size={18} />
            </button>
            <button className="p-2 text-zinc-400 hover:text-white transition-colors">
              <Share2 size={18} />
            </button>
            <div className="w-px h-6 bg-zinc-800 mx-2" />
            <button 
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-8 bg-zinc-950">
          <div className="max-w-2xl mx-auto bg-white text-zinc-900 p-12 shadow-inner min-h-full rounded-sm">
            {document.type === 'email' && (
              <div className="mb-8 pb-8 border-b border-zinc-200">
                <p className="text-sm"><strong>From:</strong> Logistics Team &lt;logistics@college.edu&gt;</p>
                <p className="text-sm"><strong>To:</strong> Marlene Saranya &lt;marlene@snsct.org&gt;</p>
                <p className="text-sm"><strong>Subject:</strong> Re: Event Logistics Finalization</p>
              </div>
            )}
            <div className="prose prose-zinc">
              <p className="whitespace-pre-wrap leading-relaxed">
                {document.content || "Document content loading..."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
