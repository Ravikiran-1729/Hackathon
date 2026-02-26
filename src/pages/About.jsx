import React from "react";
import { motion } from "framer-motion";
import { Info, Target, Zap, Shield, Users, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";


const features = [
  {
    icon: Zap,
    title: "Instant Analysis",
    description: "Our AI processes your notes in seconds, extracting key concepts and creating study materials automatically.",
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-900/20"
  },
  {
    icon: Target,
    title: "Smart Quizzing",
    description: "Personalized MCQs and short-answer questions generated directly from your specific course materials.",
    color: "text-indigo-500",
    bg: "bg-indigo-50 dark:bg-indigo-900/20"
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your notes are yours. We ensure your data is processed securely and never shared with third parties.",
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-900/20"
  }
];

function About() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center justify-center p-3 mb-6 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
          <Info size={32} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
          About <span className="text-indigo-600">AskMyNotes</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          We're on a mission to revolutionize how students interact with their study materials using cutting-edge AI technology.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-xl shadow-gray-100/50 dark:shadow-none"
          >
            <div className={`w-12 h-12 rounded-xl ${feature.bg} ${feature.color} flex items-center justify-center mb-6`}>
              <feature.icon size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
            <p className="text-gray-600 dark:text-slate-400 leading-relaxed text-sm">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-indigo-600 rounded-[3rem] p-12 text-white text-center relative overflow-hidden shadow-2xl shadow-indigo-200 dark:shadow-none"
      >
        <div className="relative z-10">
          <GraduationCap size={64} className="mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl font-bold mb-6">Ready to elevate your learning?</h2>
          <p className="text-indigo-100 mb-10 max-w-xl mx-auto text-lg leading-relaxed">
            Join thousands of students who are already using AskMyNotes to study smarter, not harder.
          </p>
          <Link to="/" className="bg-white text-indigo-600 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-50 transition-all active:scale-95 inline-block">
            Get Started Now
          </Link>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
      </motion.div>

      <footer className="mt-20 py-10 border-t border-gray-100 dark:border-slate-800 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="bg-indigo-600 p-1 rounded-lg text-white">
            <GraduationCap size={16} />
          </div>
          <span className="font-bold text-gray-900 dark:text-white">AskMyNotes</span>
        </div>
        <p className="text-sm text-gray-500 dark:text-slate-500">
          &copy; {new Date().getFullYear()} AskMyNotes AI. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default About;
