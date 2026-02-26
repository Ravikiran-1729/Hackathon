import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Settings as SettingsIcon, 
  Bell, 
  Lock, 
  Eye, 
  Globe, 
  Sparkles, 
  Save,
  CheckCircle2
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

function Settings() {
  const { darkMode, toggleDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "preferences", label: "Preferences", icon: SettingsIcon },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Lock },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Settings</h1>
        <p className="text-gray-500 dark:text-slate-400">Manage your account settings and preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Tabs */}
        <aside className="w-full md:w-64 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none"
                  : "text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800"
              }`}
            >
              <tab.icon size={20} />
              <span>{tab.label}</span>
            </button>
          ))}
        </aside>

        {/* Content Area */}
        <main className="flex-1">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-100 dark:border-slate-800 shadow-xl shadow-gray-100/50 dark:shadow-none"
          >
            {activeTab === "profile" && (
              <div className="space-y-6">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-20 h-20 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <User size={40} />
                  </div>
                  <div>
                    <button className="px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-lg text-sm font-bold hover:bg-indigo-100 transition-all">
                      Change Avatar
                    </button>
                    <p className="text-xs text-gray-400 mt-2">JPG, GIF or PNG. Max size of 2MB</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-slate-300">Full Name</label>
                    <input type="text" defaultValue="Student User" className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none dark:text-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-slate-300">Email Address</label>
                    <input type="email" defaultValue="student@study.com" className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none dark:text-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-slate-300">Bio</label>
                  <textarea rows="3" placeholder="Tell us about yourself..." className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none dark:text-white resize-none"></textarea>
                </div>
              </div>
            )}

            {activeTab === "preferences" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-slate-800/50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400">
                      <Eye size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 dark:text-white">Dark Mode</p>
                      <p className="text-xs text-gray-500">Toggle application theme</p>
                    </div>
                  </div>
                  <button 
                    onClick={toggleDarkMode}
                    className={`w-12 h-6 rounded-full transition-all relative ${darkMode ? 'bg-indigo-600' : 'bg-gray-300'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${darkMode ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-slate-800/50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
                      <Sparkles size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 dark:text-white">AI Response Length</p>
                      <p className="text-xs text-gray-500">Control how detailed AI answers are</p>
                    </div>
                  </div>
                  <select className="bg-white dark:bg-slate-800 border-none rounded-lg text-sm font-bold text-gray-700 dark:text-slate-300 focus:ring-2 focus:ring-indigo-500">
                    <option>Concise</option>
                    <option selected>Balanced</option>
                    <option>Detailed</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-slate-800/50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400">
                      <Globe size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 dark:text-white">Language</p>
                      <p className="text-xs text-gray-500">Primary study language</p>
                    </div>
                  </div>
                  <select className="bg-white dark:bg-slate-800 border-none rounded-lg text-sm font-bold text-gray-700 dark:text-slate-300 focus:ring-2 focus:ring-indigo-500">
                    <option selected>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-4">
                {["Study Reminders", "New Feature Updates", "Account Activity", "Weekly Progress"].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-slate-800/50">
                    <p className="font-bold text-gray-700 dark:text-slate-300">{item}</p>
                    <button className="w-12 h-6 rounded-full bg-indigo-600 relative">
                      <div className="absolute top-1 left-7 w-4 h-4 bg-white rounded-full" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-slate-300">Current Password</label>
                    <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-slate-300">New Password</label>
                    <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white" />
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-100 dark:border-slate-800">
                  <button className="text-sm font-bold text-red-500 hover:text-red-600 transition-colors">
                    Delete Account
                  </button>
                </div>
              </div>
            )}

            <div className="mt-10 pt-6 border-t border-gray-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-indigo-100 dark:shadow-none"
              >
                {isSaved ? <CheckCircle2 size={20} /> : <Save size={20} />}
                <span>{isSaved ? "Settings Saved!" : "Save Changes"}</span>
              </button>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

export default Settings;
