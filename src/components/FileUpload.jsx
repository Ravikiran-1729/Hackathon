import React, { useState } from "react";
import { Upload, File, CheckCircle2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils";

function FileUpload({ subject, onSuccess }) {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("subject", subject);

    try {
      await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });
      setIsDone(true);
      if (onSuccess) onSuccess(file.name);
      setTimeout(() => {
        setIsDone(false);
        setFile(null);
      }, 3000);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 mb-8 transition-colors">
      <div className="flex items-center gap-2 mb-4">
        <Upload className="text-indigo-600 dark:text-indigo-400" size={20} />
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Upload {subject} Notes</h2>
      </div>

      <div 
        className={cn(
          "relative group border-2 border-dashed rounded-xl p-8 transition-all duration-200 text-center",
          file 
            ? "border-indigo-400 dark:border-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/10" 
            : "border-gray-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500 hover:bg-gray-50/50 dark:hover:bg-slate-800/50"
        )}
      >
        <input
          type="file"
          id="file-upload"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={(e) => setFile(e.target.files[0])}
        />
        
        <div className="flex flex-col items-center gap-3">
          {file ? (
            <div className="flex items-center gap-3 bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm border border-indigo-100 dark:border-indigo-900/50">
              <File className="text-indigo-600 dark:text-indigo-400" size={24} />
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-700 dark:text-slate-200 truncate max-w-[200px]">{file.name}</p>
                <p className="text-xs text-gray-500 dark:text-slate-500">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
            </div>
          ) : (
            <>
              <div className="p-4 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-500 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                <Upload size={32} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 dark:text-slate-300">Click or drag and drop</p>
                <p className="text-xs text-gray-500 dark:text-slate-500 mt-1">PDF, DOCX or TXT files up to 10MB</p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={handleUpload}
          disabled={!file || isUploading || isDone}
          className={cn(
            "flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all duration-200",
            !file 
              ? "bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-600 cursor-not-allowed" 
              : isDone 
                ? "bg-green-500 text-white" 
                : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg active:scale-95 shadow-indigo-200 dark:shadow-none"
          )}
        >
          {isUploading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : isDone ? (
            <CheckCircle2 size={20} />
          ) : (
            <Upload size={20} />
          )}
          <span>{isUploading ? "Uploading..." : isDone ? "Uploaded!" : "Upload Notes"}</span>
        </button>
      </div>
    </div>
  );
}

export default FileUpload;