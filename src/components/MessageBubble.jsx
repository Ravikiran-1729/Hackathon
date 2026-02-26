import React from "react";
import { User, Bot, Quote, Info } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../utils";

function MessageBubble({ msg }) {
  const isUser = msg.type === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={cn(
        "flex w-full mb-6",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div className={cn(
        "flex max-w-[85%] md:max-w-[75%]",
        isUser ? "flex-row-reverse" : "flex-row"
      )}>
        {/* Avatar */}
        <div className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1",
          isUser 
            ? "ml-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400" 
            : "mr-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
        )}>
          {isUser ? <User size={16} /> : <Bot size={16} />}
        </div>

        {/* Content */}
        <div className={cn(
          "flex flex-col",
          isUser ? "items-end" : "items-start"
        )}>
          <div className={cn(
            "px-4 py-3 rounded-2xl shadow-sm text-sm md:text-base",
            isUser 
              ? "bg-indigo-600 text-white rounded-tr-none" 
              : "bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-gray-800 dark:text-slate-200 rounded-tl-none"
          )}>
            {isUser ? (
              <p className="leading-relaxed">{msg.text}</p>
            ) : (
              <div className="space-y-3">
                <p className="leading-relaxed whitespace-pre-wrap">{msg.answer}</p>
                
                {/* Meta Information for Bot Response */}
                <div className="pt-2 mt-2 border-t border-gray-50 dark:border-slate-700 flex flex-wrap gap-2">
                  {msg.confidence && (
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-medium">
                      <Info size={10} />
                      Confidence: {msg.confidence}
                    </div>
                  )}
                  {msg.citations && msg.citations.length > 0 && (
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] font-medium">
                      <Quote size={10} />
                      Sources: {msg.citations.join(", ")}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <span className="text-[10px] text-gray-400 dark:text-slate-500 mt-1 px-1">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default MessageBubble;