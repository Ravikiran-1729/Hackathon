import React from "react";
import SubjectSelector from "../components/SubjectSelector";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import { useSubjects } from "../context/SubjectContext";

function Home() {
  const { subjects } = useSubjects();

  // Create sequence from dynamic subjects
  const animationSequence = subjects.flatMap((sub) => [sub.name, 2000]);

  return (
    <div className="max-w-5xl mx-auto">
      
      {/* HEADER */}
      <div className="mb-10">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2"
        >
          Welcome back, <span className = "text-blue-600">Student!</span> 👋
        </motion.h1>

        {/* 🔥 DYNAMIC TYPING ANIMATION */}
        <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
          Learn{" "}
          <TypeAnimation
            sequence={animationSequence}
            speed={50}
            repeat={Infinity}
            wrapper="span"
            className="border-r-2 border-indigo-500 pr-1"
          />
        </p>

        <p className="text-gray-500 dark:text-slate-400 mt-2">
          Choose a subject to start your personalized study session.
        </p>
      </div>

      {/* SUBJECT SELECTOR */}
      <SubjectSelector />

      {/* BOTTOM SECTION */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <div className="w-32 h-32 bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center text-indigo-200 dark:text-indigo-800 mb-6">
          <GraduationCap size={64} />
        </div>

        <h2 className="text-xl font-bold text-gray-700 dark:text-slate-300">
          Ready to study?
        </h2>

        <p className="text-gray-400 dark:text-slate-500 mt-2">
          Select one of the subjects above to access your notes and study tools.
        </p>
      </motion.div>
    </div>
  );
}

export default Home;