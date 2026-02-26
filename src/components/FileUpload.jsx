// src/components/FileUpload.jsx
import React, { useState } from "react";
import { Upload, File, CheckCircle2, Loader2, XCircle } from "lucide-react";
import { cn } from "../utils";

const MAX_FILES = 3;
const ALLOWED_TYPES = [
  "application/pdf",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation"
];

function FileUpload({ subject, onSuccess }) {
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = selectedFiles.filter(f => ALLOWED_TYPES.includes(f.type));

    if (validFiles.length + files.length > MAX_FILES) {
      setError(`Maximum ${MAX_FILES} files allowed`);
      return;
    }

    if (validFiles.length === 0) {
      setError("Invalid file type. Only PDF or PPT/PPTX allowed");
      return;
    }

    setFiles(prev => [...prev, ...validFiles]);
    setError("");
  };

  const handleRemoveFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setIsUploading(true);
    setError("");

    const formData = new FormData();
    files.forEach(f => formData.append("files", f));
    formData.append("subjectName", subject);
    formData.append("userId", localStorage.getItem("userId")); // adjust if you store userId elsewhere

    try {
      const res = await fetch("http://localhost:3000/upload/notes/upload", {
        method: "POST",
        body: formData
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      setUploadedFiles(data.noteIds);
      setFiles([]);
      if (onSuccess) onSuccess(data.noteIds);

    } catch (err) {
      console.error(err);
      setError(err.message || "Upload failed");
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
          "relative group border-2 border-dashed rounded-xl p-6 transition-all duration-200 text-center cursor-pointer",
          files.length > 0
            ? "border-indigo-400 dark:border-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/10"
            : "border-gray-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500 hover:bg-gray-50/50 dark:hover:bg-slate-800/50"
        )}
      >
        <input
          type="file"
          multiple
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileChange}
        />

        <div className="flex flex-col items-center gap-3">
          {files.length > 0 ? (
            files.map((file, i) => (
              <div key={i} className="flex items-center justify-between gap-3 bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm border border-indigo-100 dark:border-indigo-900/50 w-full max-w-md">
                <div className="flex items-center gap-3">
                  <File className="text-indigo-600 dark:text-indigo-400" size={24} />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-700 dark:text-slate-200 truncate max-w-[150px]">{file.name}</p>
                    <p className="text-xs text-gray-500 dark:text-slate-500">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
                <button onClick={() => handleRemoveFile(i)}>
                  <XCircle className="text-red-500" size={20} />
                </button>
              </div>
            ))
          ) : (
            <>
              <div className="p-4 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-500 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                <Upload size={32} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 dark:text-slate-300">Click or drag and drop</p>
                <p className="text-xs text-gray-500 dark:text-slate-500 mt-1">PDF or PPT/PPTX files up to 15MB</p>
              </div>
            </>
          )}
        </div>
      </div>

      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}

      <div className="mt-4 flex justify-end">
        <button
          onClick={handleUpload}
          disabled={files.length === 0 || isUploading}
          className={cn(
            "flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all duration-200",
            files.length === 0
              ? "bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-600 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg active:scale-95 shadow-indigo-200 dark:shadow-none"
          )}
        >
          {isUploading ? <Loader2 className="animate-spin" size={20} /> : <Upload size={20} />}
          <span>{isUploading ? "Uploading..." : "Upload Notes"}</span>
        </button>
      </div>

      {uploadedFiles.length > 0 && (
        <p className="text-green-500 mt-2 text-sm">
          Successfully uploaded {uploadedFiles.length} file{uploadedFiles.length > 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}

export default FileUpload;