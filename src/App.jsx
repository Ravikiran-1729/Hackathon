import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import SubjectView from "./pages/SubjectView";
import { GraduationCap, LayoutDashboard, Settings, User as UserIcon, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "./utils";
import TopNav from "./components/TopNav";

function Sidebar() {
  const location = useLocation();
  
  return (
    <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-slate-900 border-r border-gray-100 dark:border-slate-800 p-6 sticky top-0 h-screen transition-colors">
      <Link to="/" className="flex items-center gap-2 mb-10 px-2">
        <div className="bg-indigo-600 p-2 rounded-lg text-white">
          <GraduationCap size={24} />
        </div>
        <span className="font-bold text-xl tracking-tight dark:text-white">AskMyNotes</span>
      </Link>

      <nav className="flex-1 space-y-2">
        <Link 
          to="/" 
          className={cn(
            "flex items-center gap-3 w-full p-3 rounded-xl font-semibold transition-all",
            location.pathname === "/" 
              ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400" 
              : "text-gray-400 dark:text-slate-500 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-600 dark:hover:text-slate-300"
          )}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>
        <button className="flex items-center gap-3 w-full p-3 rounded-xl text-gray-400 dark:text-slate-500 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-600 dark:hover:text-slate-300 transition-all">
          <Settings size={20} />
          <span>Settings</span>
        </button>
      </nav>

      <div className="mt-auto space-y-4">
        {/* <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-100 dark:shadow-none">
          <p className="text-xs font-medium opacity-80 mb-1">PRO PLAN</p>
          <p className="text-sm font-bold mb-3">Unlimited uploads</p>
          <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-bold transition-all">
            Upgrade Now
          </button>
        </div> */}
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-slate-800 flex items-center justify-center">
            <UserIcon size={20} className="text-gray-500 dark:text-slate-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold truncate dark:text-white">Student User</p>
            <p className="text-xs text-gray-400 dark:text-slate-500 truncate">student@study.com</p>
          </div>
          <button className="text-gray-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 flex flex-col md:flex-row font-sans text-gray-900 dark:text-slate-100 transition-colors">
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            {/* Header for mobile & TopNav for desktop */}
            <header className="flex items-center justify-between mb-8">
              <Link to="/" className="md:hidden flex items-center gap-2">
                <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
                  <GraduationCap size={20} />
                </div>
                <span className="font-bold text-lg dark:text-white">AskMyNotes</span>
              </Link>
              
              <div className="flex-1 flex justify-end items-center">
                <TopNav />
              </div>
            </header>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/subject/:subjectName" element={<SubjectView />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;