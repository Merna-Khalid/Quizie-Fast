// context/QuizContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect} from 'react';

interface QuizContextProps {
  quizData: QuizData | null;
  setQuiz: (data: QuizData) => void;
}

interface QuizProviderProps {
  children: ReactNode;
}

export interface QuizData {
  [key: string]: string[] | string[];
}

const LOCAL_STORAGE_KEY = 'quizData';

const QuizContext = createContext<QuizContextProps | undefined>(undefined);

export const QuizProvider: React.FC<QuizProviderProps> = ({ children }) => {
  const [quizData, setQuizData] = useState<QuizData | null>(() => {
    // Load quizData from localStorage on component mount
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      return storedData ? JSON.parse(storedData) : null;
    }
    return null;
  });

  const setQuiz = (data: QuizData) => {
    setQuizData(data);
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    }
  };

  useEffect(() => {
    // Clear localStorage on component unmount (optional)
    if (typeof window !== 'undefined') {
      return () => localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }, []);

  return (
    <QuizContext.Provider value={{ quizData, setQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};


export const useQuizContext = (): QuizContextProps => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuizContext must be used within a QuizProvider');
  }
  return context;
};
