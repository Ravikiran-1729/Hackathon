import React, { createContext, useContext, useState, useEffect } from "react";
import { Calculator, Beaker, ScrollText, Book, Globe, Languages, Music, Palette, BookOpen } from "lucide-react";

const SubjectContext = createContext();

const initialSubjects = [
  { name: "Math", icon: Calculator, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
  { name: "Science", icon: Beaker, color: "text-green-500", bg: "bg-green-50 dark:bg-green-900/20" },
  { name: "History", icon: ScrollText, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-900/20" },
  { name: "Literature", icon: Book, color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-900/20" },
  { name: "Geography", icon: Globe, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
  { name: "Languages", icon: Languages, color: "text-indigo-500", bg: "bg-indigo-50 dark:bg-indigo-900/20" },
  { name: "Music", icon: Music, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20" },
  { name: "Arts", icon: Palette, color: "text-pink-500", bg: "bg-pink-50 dark:bg-pink-900/20" },
];

export function SubjectProvider({ children }) {
  const [subjects, setSubjects] = useState(() => {
    const saved = localStorage.getItem("subjects");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Map icon names back to components if needed, but for now we'll just use a default icon for new ones
        return parsed.map(s => ({
          ...s,
          icon: getIconByName(s.iconName) || initialSubjects.find(is => is.name === s.name)?.icon || BookOpen
        }));
      } catch (e) {
        return initialSubjects;
      }
    }
    return initialSubjects;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const subjectsToSave = subjects.map(s => ({
      ...s,
      iconName: s.icon.name || s.name // Simple way to store reference
    }));
    localStorage.setItem("subjects", JSON.stringify(subjectsToSave));
  }, [subjects]);

  const addSubject = (name) => {
    const newSubject = {
      name,
      icon: BookOpen,
      color: "text-indigo-500",
      bg: "bg-indigo-50 dark:bg-indigo-900/20"
    };
    setSubjects([...subjects, newSubject]);
  };

  return (
    <SubjectContext.Provider value={{ subjects, addSubject, isModalOpen, setIsModalOpen }}>
      {children}
    </SubjectContext.Provider>
  );
}

function getIconByName(name) {
  const icons = { Calculator, Beaker, ScrollText, Book, Globe, Languages, Music, Palette, BookOpen };
  return icons[name];
}

export const useSubjects = () => useContext(SubjectContext);
