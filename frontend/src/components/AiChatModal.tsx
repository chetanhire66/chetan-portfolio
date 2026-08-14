import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Sparkles, Bot, User, RefreshCw, ThumbsUp, Code2, Cpu } from 'lucide-react';
import { usePortfolio } from '../data/PortfolioContext';

interface AiChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

export const AiChatModal: React.FC<AiChatModalProps> = ({ isOpen, onClose }) => {
  const { personalInfo: PERSONAL_INFO } = usePortfolio();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'ai',
      text: `Hello! I am **Chetan Motilal Hire's Portfolio AI Assistant**. Ask me anything about his B.Tech AI & ML coursework at PES Modern College, his MERN stack skills, or his flagship projects (WanderLust, Smart Parking Finder, Chobify)!`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    "What is Chetan's tech stack?",
    "Tell me about WanderLust project",
    "When does Chetan graduate?",
    "How can I contact Chetan?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Unable to reach the portfolio assistant.');
      
      const aiReply: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.reply || "Chetan is an AI & ML engineer skilled in React, Node, Python, and MongoDB. Feel free to email him at chetanhire818@gmail.com!",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiReply]);
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackReply: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: "I am currently running in offline portfolio mode. Chetan is pursuing B.Tech in AI & ML (Class of 2028) and specializes in MERN full stack development. You can reach him at **chetanhire818@gmail.com**!",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    setMessages([
      {
        id: Date.now().toString(),
        sender: 'ai',
        text: "Conversation refreshed! How else can I assist you with Chetan's resume or developer background?",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Helper markdown parser formatting bold text
  const renderMessageText = (txt: string) => {
    const parts = txt.split(/(\*\*.*?\*\*|\n)/g);
    return parts.map((part, i) => {
      if (part === '\n') return <br key={i} />;
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-blue-400 font-bold">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ duration: 0.3 }}
          className="bg-slate-900 light:bg-white text-slate-100 light:text-slate-900 border border-slate-800 light:border-slate-200 rounded-3xl max-w-2xl w-full h-[620px] flex flex-col shadow-2xl overflow-hidden relative"
        >
          {/* Top Banner Header */}
          <div className="p-5 bg-slate-950 light:bg-slate-100 border-b border-slate-800 light:border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative p-2.5 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-md shadow-purple-500/20">
                <Bot className="w-5 h-5" />
                <span className="w-2 h-2 rounded-full bg-emerald-400 absolute -top-0.5 -right-0.5 ring-2 ring-slate-950 animate-pulse" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-100 light:text-slate-900 flex items-center gap-1.5">
                  <span>Chetan's Portfolio Assistant</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    Portfolio AI
                  </span>
                </h3>
                <p className="text-[10px] font-mono text-slate-400 light:text-slate-600">Trained on Chetan Hire's Resume Context</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={clearHistory}
                title="Reset Chat"
                className="p-2 rounded-xl bg-slate-800 light:bg-slate-200 text-slate-400 light:text-slate-700 hover:text-white transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              <button
                onClick={onClose}
                aria-label="Close Chat"
                className="p-2 rounded-xl bg-slate-800 light:bg-slate-200 text-slate-400 light:text-slate-700 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 font-sans bg-slate-900/50 light:bg-slate-50">
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 max-w-[85%] ${m.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white'
                }`}>
                  {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none shadow-md'
                    : 'glass-card border border-slate-800 light:border-slate-200 text-slate-200 light:text-slate-800 rounded-tl-none shadow-sm'
                }`}>
                  <div className="mb-1 flex items-center justify-between gap-4 opacity-60 text-[10px] font-mono">
                    <span>{m.sender === 'user' ? 'You' : 'Chetan Bot'}</span>
                    <span>{m.time}</span>
                  </div>
                  <div>{renderMessageText(m.text)}</div>
                </div>
              </motion.div>
            ))}

            {loading && (
              <div className="flex gap-3 max-w-[80%] items-center">
                <div className="w-8 h-8 rounded-xl bg-purple-600/30 flex items-center justify-center animate-pulse">
                  <Bot className="w-4 h-4 text-purple-400" />
                </div>
                <div className="glass-card px-4 py-3 rounded-2xl text-xs text-slate-400 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-spin" />
                  <span>Consulting resume knowledge base...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Prompts Bar */}
          <div className="px-5 py-2.5 bg-slate-950/60 light:bg-slate-100/60 border-t border-slate-800/60 light:border-slate-200/60 overflow-x-auto flex items-center gap-2 no-scrollbar">
            <span className="text-[10px] font-mono text-slate-500 uppercase font-bold flex-shrink-0">Suggested:</span>
            {suggestedPrompts.map((sp) => (
              <button
                key={sp}
                onClick={() => handleSend(sp)}
                disabled={loading}
                className="px-3 py-1 rounded-full text-[11px] font-mono whitespace-nowrap bg-slate-800/80 light:bg-slate-200 hover:bg-purple-600 hover:text-white text-slate-300 light:text-slate-700 transition-all border border-slate-700 light:border-slate-300 disabled:opacity-50 flex-shrink-0 cursor-pointer"
              >
                {sp}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <div className="p-4 bg-slate-950 light:bg-white border-t border-slate-800 light:border-slate-200">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
              <input
                type="text"
                placeholder="Ask about Chetan's skills, hackathons, or contact..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
                className="flex-1 px-4 py-3 rounded-xl bg-slate-900 light:bg-slate-100 border border-slate-800 light:border-slate-300 focus:border-purple-500 focus:outline-none text-xs sm:text-sm text-slate-100 light:text-slate-900 placeholder:text-slate-500 transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-purple-500/20 disabled:opacity-50 transition-all flex items-center justify-center cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  );
};
