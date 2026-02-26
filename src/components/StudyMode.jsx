import React, { useState } from "react";
import { Sparkles, BookOpen, CheckCircle, HelpCircle, ChevronRight, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils";

function StudyMode({ subject }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("mcqs");

  const generateStudy = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:3000/study", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject }),
      });
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error("Study generation failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden transition-colors">
      <div className="p-6 border-b border-gray-50 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
            <Sparkles size={18} />
          </div>
          <div>
            <h2 className="font-bold text-gray-800 dark:text-white text-lg">Smart Study Mode</h2>
            <p className="text-sm text-gray-500 dark:text-slate-400">AI-generated questions from your notes</p>
          </div>
        </div>
        
        {!data && (
          <button
            onClick={generateStudy}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-purple-100 dark:shadow-none disabled:bg-gray-100 dark:disabled:bg-slate-800 disabled:text-gray-400 dark:disabled:text-slate-600 disabled:shadow-none"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : <BookOpen size={20} />}
            <span>{isLoading ? "Generating..." : "Generate Study Material"}</span>
          </button>
        )}
      </div>

      {data ? (
        <div className="flex flex-col">
          {/* Tabs */}
          <div className="flex px-6 pt-4 gap-6 border-b border-gray-50 dark:border-slate-800">
            {["mcqs", "short"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "pb-3 text-sm font-semibold transition-all relative",
                  activeTab === tab ? "text-purple-600 dark:text-purple-400" : "text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300"
                )}
              >
                {tab === "mcqs" ? "Multiple Choice" : "Short Answers"}
                {activeTab === tab && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 dark:bg-purple-400 rounded-full"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="p-6 max-h-[400px] overflow-y-auto bg-gray-50/30 dark:bg-slate-950/30">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                {activeTab === "mcqs" ? (
                  data.mcqs.map((q, i) => (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      key={i} 
                      className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm flex gap-3 group"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800 dark:text-slate-200 font-medium leading-relaxed">{q}</p>
                        <div className="mt-3 flex items-center gap-2 text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider group-hover:text-blue-500 transition-colors">
                          <ChevronRight size={12} />
                          Tap to reveal answer
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  data.short.map((q, i) => (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      key={i} 
                      className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm flex gap-3 group"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-bold">
                        <HelpCircle size={16} />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800 dark:text-slate-200 font-medium leading-relaxed">{q}</p>
                      </div>
                    </motion.div>
                  ))
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="p-4 bg-gray-50 dark:bg-slate-900 flex justify-center">
            <button 
              onClick={() => setData(null)}
              className="text-xs font-bold text-gray-400 dark:text-slate-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-1"
            >
              Refresh Study Material
            </button>
          </div>
        </div>
      ) : !isLoading && (
        <div className="p-12 text-center flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-200 dark:text-purple-800">
            <BookOpen size={40} />
          </div>
          <div>
            <h3 className="text-gray-600 dark:text-slate-300 font-bold">No Study Material Yet</h3>
            <p className="text-sm text-gray-400 dark:text-slate-500 mt-1 max-w-[250px] mx-auto">Click the button above to generate personalized study questions from your notes.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudyMode;