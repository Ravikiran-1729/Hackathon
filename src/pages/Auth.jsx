import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Lock, Mail, ArrowRight, Github, Chrome, GraduationCap } from "lucide-react";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const toggleAuth = () => setIsLogin(!isLogin);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", { email, password, isLogin });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center p-3 mb-6 rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-200 dark:shadow-none">
            <GraduationCap size={32} />
          </div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
            {isLogin ? "Welcome Back!" : "Join AskMyNotes"}
          </h1>
          <p className="text-gray-500 dark:text-slate-400">
            {isLogin ? "Log in to access your study lab." : "Start your personalized learning journey today."}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-gray-100 dark:border-slate-800 shadow-2xl shadow-gray-200/50 dark:shadow-none"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700 dark:text-slate-300">
                  Full Name
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                    <User size={20} />
                  </div>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-slate-800 border-none rounded-2xl text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 dark:text-slate-300">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@study.com"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-slate-800 border-none rounded-2xl text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                />

              </div>
              <label className="block text-sm font-bold text-gray-700 dark:text-slate-300">
                Username
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                  <Mail size={20} />
                </div>
                <input
                  type="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="student@study.com"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-slate-800 border-none rounded-2xl text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                />

              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-bold text-gray-700 dark:text-slate-300">
                  Password
                </label>
                {isLogin && (
                  <button type="button" className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                  <Lock size={20} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-slate-800 border-none rounded-2xl text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-indigo-200 dark:shadow-none flex items-center justify-center gap-2 group active:scale-95"
            >
              <span>{isLogin ? "Sign In" : "Create Account"}</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100 dark:border-slate-800" />
            </div>

          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* <button className="flex items-center justify-center gap-2 py-3 border border-gray-100 dark:border-slate-800 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-all active:scale-95">
            <Chrome size={20} className="text-rose-500" />
            <span className="text-sm font-bold text-gray-700 dark:text-slate-300">Google</span>
          </button> */}
            {/* <button className="flex items-center justify-center gap-2 py-3 border border-gray-100 dark:border-slate-800 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-all active:scale-95">
            <Github size={20} className="text-gray-900 dark:text-white" />
            <span className="text-sm font-bold text-gray-700 dark:text-slate-300">GitHub</span>
          </button> */}
          </div>

          <p className="mt-6 text-center text-sm text-gray-500 dark:text-slate-500 font-medium">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={toggleAuth}
              className="ml-2 text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
            >
              {isLogin ? "Sign Up" : "Log In"}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Auth;
