import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FileUpload from "../components/FileUpload";
import ChatBox from "../components/ChatBox";
import StudyMode from "../components/StudyMode";
import { CheckCircle2, ArrowRight, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function SubjectView() {
  const { subjectName } = useParams();
  const navigate = useNavigate();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const [isNotesConfirmed, setIsNotesConfirmed] = useState(false);
  const [noteIds, setNoteIds] = useState([]);

  // Capitalize subject name for display
  const displaySubject = subjectName.charAt(0).toUpperCase() + subjectName.slice(1);

  const handleUploadSuccess = (ids) => {
    setUploadedFileName(`${ids.length} file(s)`);
    setNoteIds(ids);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <button 
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-6 group"
      >
        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-semibold">Back to Dashboard</span>
      </button>

      <AnimatePresence mode="wait">
        {!isConfirmed ? (
          <motion.div
            key="confirm-subject"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-md mx-auto bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-100 dark:border-slate-800 shadow-xl shadow-indigo-100/20 dark:shadow-none text-center mt-10 transition-colors"
          >
            <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Confirm Selection</h2>
            <p className="text-gray-500 dark:text-slate-400 mb-8">
              You've selected <span className="text-indigo-600 dark:text-indigo-400 font-bold">{displaySubject}</span>. Are you sure you want to proceed to the study dashboard?
            </p>
            <div className="space-y-3">
              <button
                onClick={() => setIsConfirmed(true)}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-200 dark:shadow-none active:scale-95"
              >
                <span>Confirm & Continue</span>
                <ArrowRight size={20} />
              </button>
              <button
                onClick={() => navigate("/")}
                className="w-full py-4 text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 font-semibold transition-all"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        ) : !isNotesConfirmed && uploadedFileName ? (
          <motion.div
            key="confirm-notes"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-md mx-auto bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-100 dark:border-slate-800 shadow-xl shadow-indigo-100/20 dark:shadow-none text-center mt-10 transition-colors"
          >
            <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Notes Uploaded!</h2>
            <p className="text-gray-500 dark:text-slate-400 mb-8">
              Successfully uploaded <span className="text-emerald-600 dark:text-emerald-400 font-bold">{uploadedFileName}</span>. Are you sure you want to start the AI Chatbot?
            </p>
            <div className="space-y-3">
              <button
                onClick={() => setIsNotesConfirmed(true)}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-emerald-200 dark:shadow-none active:scale-95"
              >
                <span>Yes, Start Chatbot</span>
                <ArrowRight size={20} />
              </button>
              <button
                onClick={() => setUploadedFileName(null)}
                className="w-full py-4 text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 font-semibold transition-all"
              >
                Upload Different File
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-8">
              <h1 className="text-3xl font-black text-gray-900 dark:text-white">{displaySubject} Study Lab</h1>
              <p className="text-gray-500 dark:text-slate-400">
                {isNotesConfirmed ? "Notes analyzed. Start chatting with AI!" : "Upload your notes and start learning with AI."}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-8">
                {!isNotesConfirmed && (
                  <FileUpload 
                    subject={displaySubject} 
                    onSuccess={handleUploadSuccess} 
                  />
                )}
                {isNotesConfirmed && (
                  <ChatBox subject={displaySubject} noteIds={noteIds} />
                )}
              </div>
              <div className="lg:col-span-5">
                {isNotesConfirmed && (
                  <StudyMode subject={displaySubject} />
                )}
                
                <div className="mt-12 top-0 bg-amber-50 dark:bg-amber-900/10 rounded-2xl p-6 border border-amber-100 dark:border-amber-900/20 transition-colors">
                  <h3 className="font-bold text-amber-900 dark:text-amber-400 mb-2 flex items-center gap-2">
                    💡 Study Tip
                  </h3>
                  <p className="text-sm text-amber-800 dark:text-amber-200/70 leading-relaxed">
                    Try to explain a concept back to the AI. Teaching is one of the most effective ways to solidify your understanding of new material!
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SubjectView;
