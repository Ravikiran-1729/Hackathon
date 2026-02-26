import React from "react";
import { Calculator, Beaker, ScrollText, Book, Globe, Languages, Music, Palette } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../utils";
import { useNavigate } from "react-router-dom";
import { useSubjects } from "../context/SubjectContext";

function SubjectSelector({ selectedSubject }) {
  const navigate = useNavigate();
  const { subjects } = useSubjects();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
      {subjects.map((sub) => {
        const Icon = sub.icon;
        const isSelected = selectedSubject === sub.name;
        
        return (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            key={sub.name}
            onClick={() => navigate(`/subject/${sub.name.toLowerCase()}`)}
            className={cn(
              "flex items-center p-4 rounded-xl border-2 transition-all duration-200 shadow-sm",
              isSelected 
                ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 ring-2 ring-indigo-200 dark:ring-indigo-900/50" 
                : "border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-md"
            )}
          >
            <div className={cn("p-3 rounded-lg mr-4", sub.bg, sub.color)}>
              <Icon size={24} />
            </div>
            <div className="text-left">
              <h3 className={cn("font-bold text-lg", isSelected ? "text-indigo-900 dark:text-indigo-100" : "text-gray-700 dark:text-slate-200")}>
                {sub.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-slate-400">Study your notes</p>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}

export default SubjectSelector;