import React, { useState, useRef, useEffect } from "react";
import { Send, MessageSquare, Loader2, Eraser } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MessageBubble from "./MessageBubble";
import { cn } from "../utils";

function ChatBox({ subject, noteIds }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    if (!noteIds || noteIds.length === 0) {
      setMessages(prev => [
        ...prev,
        {
          type: "bot",
          answer: "Please upload and confirm your notes first, then try again.",
        },
      ]);
      return;
    }

    const userMsg = { type: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:3000/chat/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ noteIds }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to generate questions");
      }

      setMessages(prev => [
        ...prev,
        { type: "bot", answer: data.questions },
      ]);
    } catch (error) {
      console.error("Chat failed:", error);
      setMessages(prev => [...prev, { 
        type: "bot", 
        answer: "Sorry, I couldn't reach the server. Please check your connection." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => setMessages([]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 mb-8 flex flex-col h-[500px] overflow-hidden transition-colors">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-50 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400">
            <MessageSquare size={18} />
          </div>
          <div>
            <h2 className="font-bold text-gray-800 dark:text-white">Study Assistant</h2>
            <p className="text-[10px] text-emerald-500 dark:text-emerald-400 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
              Ready for {subject}
            </p>
          </div>
        </div>
        <button 
          onClick={clearChat}
          className="p-2 text-gray-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
          title="Clear chat"
        >
          <Eraser size={18} />
        </button>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 bg-gray-50/30 dark:bg-slate-950/30 space-y-2"
      >
        <AnimatePresence initial={false}>
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-200 dark:text-indigo-800">
                <MessageSquare size={32} />
              </div>
              <div>
                <p className="text-gray-500 dark:text-slate-400 font-medium">No messages yet</p>
                <p className="text-sm text-gray-400 dark:text-slate-500">Ask me anything about your {subject} notes!</p>
              </div>
            </div>
          ) : (
            messages.map((msg, i) => (
              <MessageBubble key={i} msg={msg} />
            ))
          )}
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start mb-4"
            >
              <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                <Loader2 className="animate-spin text-indigo-600 dark:text-indigo-400" size={16} />
                <span className="text-sm text-gray-500 dark:text-slate-400">Thinking...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-slate-900 border-t border-gray-50 dark:border-slate-800">
        <div className="relative flex items-center gap-2">
          <input
            className="flex-1 bg-gray-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20 rounded-xl px-4 py-3 text-sm transition-all outline-none dark:text-white dark:placeholder-slate-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder={`Ask about ${subject}...`}
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className={cn(
              "p-3 rounded-xl transition-all duration-200",
              !input.trim() || isLoading
                ? "bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-600"
                : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100 dark:shadow-none active:scale-95"
            )}
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;