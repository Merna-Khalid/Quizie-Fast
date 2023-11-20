// pages/quizpage.tsx

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import QuizPage from '../components/QuizPage';

import { useQuizContext, QuizData } from '../context/QuizContext';

const QuizPageWrapper: React.FC = () => {

  const router = useRouter();
  const { quizData, setQuiz } = useQuizContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if quizData is available in the context
    if (quizData) {
      setLoading(false);
    }
  }, [quizData]);

  const mockQuizData = {
    'Question 1': ['a) Option A', 'Option B', 'Option C', 'Option D'],
    'Question 2': ['a) Option A', 'Option B', 'Option C', 'Option D'],
    'Question 3': ['a) Option A', 'Option B', 'Option C', 'Option D'],
    'Question 4': ['a) Option A', 'Option B', 'Option C', 'Option D'],
    'Question 5': ['a) Option A', 'Option B', 'Option C', 'Option D'],
    'Question 6': ['a) Option A', 'Option B', 'Option C', 'Option D'],
    'Question 7': ['a) Option A', 'Option B', 'Option C', 'Option D'],
    'Question 8': ['a) Option A', 'Option B', 'Option C', 'Option D'],
    'Question 9': ['a) Option A', 'Option B', 'Option C', 'Option D'],
    'Question 10': ['a) Option A', 'Option B', 'Option C', 'Option D'],
    'ANSWERS': ['a', 'b', 'a', 'b', 'a', 'b', 'a', 'b', 'a', 'b']
  };

  if (!quizData) {
    return (
      <div className='h-full w-full items_center justify-center fixed'>
        <QuizPage quizData={mockQuizData} />
      </div>
    );
  }  
  
  return (
    <div className='h-full w-full items_center justify-center fixed'>
      <QuizPage quizData={quizData} />
    </div>
  );
};

export default QuizPageWrapper;
