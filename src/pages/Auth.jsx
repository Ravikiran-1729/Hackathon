import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Lock, Mail, ArrowRight, GraduationCap } from "lucide-react";
import axios from "axios";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeat_password, setRepeatPassword] = useState(""); // exact spelling
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const toggleAuth = () => {
    setIsLogin(!isLogin);
    setMessage(null);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      if (isLogin) {
        // LOGIN - send username, password
        const res = await axios.post(
          "http://localhost:3000/AskMyNotes/login",
          {
            username,
            password,
          },
          {
            withCredentials: true,
          }
        );
        if (res.data?.user?.id) {
          localStorage.setItem("userId", res.data.user.id);
        }
        setMessage(res.data.message);
      } else {
        // SIGNUP - send username, email, password, repeat_password
        if (password !== repeat_password) {
          setError("Passwords do not match");
          return;
        }

        const res = await axios.post(
          "http://localhost:3000/AskMyNotes/signup",
          {
            user: {
              username,
              email,
              password,
              repeat_password,
            },
          },
          {
            withCredentials: true,
          }
        );
        if (res.data?.user?.id) {
          localStorage.setItem("userId", res.data.user.id);
        }
        setMessage(res.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
    }
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
            {isLogin
              ? "Log in to access your study lab."
              : "Start your personalized learning journey today."}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-gray-100 dark:border-slate-800 shadow-2xl shadow-gray-200/50 dark:shadow-none"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 dark:text-slate-300">
                Username
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                  <User size={20} />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-slate-800 border-none rounded-2xl text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                />
              </div>
            </div>

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

              <div className="space-y-2 mt-4">
                <label className="block text-sm font-bold text-gray-700 dark:text-slate-300">
                  Password
                </label>
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

              {!isLogin && (
                <div className="space-y-2 mt-4">
                  <label className="block text-sm font-bold text-gray-700 dark:text-slate-300">
                    Repeat Password
                  </label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                      <Lock size={20} />
                    </div>
                    <input
                      type="password"
                      value={repeat_password}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-slate-800 border-none rounded-2xl text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                    />
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-indigo-200 dark:shadow-none flex items-center justify-center gap-2 group active:scale-95"
            >
              <span>{isLogin ? "Sign In" : "Create Account"}</span>
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>

            {message && (
              <p className="mt-4 text-green-600 text-center font-medium">{message}</p>
            )}
            {error && (
              <p className="mt-4 text-red-600 text-center font-medium">{error}</p>
            )}
          </form>

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