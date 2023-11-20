// components/QuizPage.tsx

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface QuizData {
  [key: string]: string[] | string[];
}

interface QuizPageProps {
  quizData: QuizData; // quizData is already parsed and passed as a prop
}

const QuizPage: React.FC<QuizPageProps> = ({ quizData }) => {
  const router = useRouter();

  const [userAnswers, setUserAnswers] = useState<string[]>(new Array(Object.keys(quizData).length - 1).fill(''));
  const [currentIndex, setCurrentIndex] = useState(0);


  const handleAnswerChange = (answer: string, questionIndex: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = event.target.value;
    setUserAnswers(newAnswers);
  };  

  const handleSubmission = () => {
    // Compare user answers with final answers in quizData
    const correctAnswers = quizData['ANSWERS'] as string[];
    const userGrade = calculateGrade(userAnswers, correctAnswers);

    // Redirect to result page with the grade
    router.push(`/results?grade=${userGrade}`);
  };

  const calculateGrade = (userAnswers: string[], correctAnswers: string[]): number => {
        const score = userAnswers.reduce((totalScore, userAnswer, index) => {
        
        if (userAnswer === correctAnswers[index].split(')')[1].trim()) {
          return totalScore + 1;
        }
        return totalScore;
      }, 0);
    
      // Calculate the percentage or any grading scale based on the total number of questions
      const percentage = (score / correctAnswers.length) * 100;
      return percentage;
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Quiz Page</h1>
      {/* Carousel Container */}
      <Carousel
        showArrows={true}
        showStatus={false}
        showThumbs={false}
        dynamicHeight={true}
        width="50%"
        selectedItem={0}
        onChange={(index) => console.log(`Slide changed to ${index}`)}
        className="flex justify-center"
      >
        {/* Map through questions and display slides */}
        {Object.keys(quizData)
          .filter((key) => key !== 'ANSWERS') // Exclude final answers
          .map((questionKey, index) => (
            <div key={questionKey} className="w-full">
              {/* Slide for each question */}
              <div className="bg-black p-6 rounded-md shadow-md bg-opacity-50">
                <h2 className="text-xl font-bold mb-4">{questionKey}</h2>
                {/* Map through answers and display radio buttons */}
                {quizData[questionKey].map((answer, answerIndex) => (
                  <div key={answerIndex} className="mb-2">
                    <input
                      type="radio"
                      id={`${questionKey}-${answerIndex}`}
                      name={`question-${index}`}
                      value={answer}
                      checked={userAnswers[index] === answer}
                      onChange={(event) => handleAnswerChange(answer, index, event)}
                    />
                    <label htmlFor={`${questionKey}-${answerIndex}`} className="ml-2">
                      {answer}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </Carousel>
      {/* Submit button */}
      <button
        onClick={handleSubmission}
        disabled={userAnswers.some(answer => answer === '')}
        className="mt-4 bg-green-500 text-white p-2 rounded-md hover:bg-green-600 z-50" 
      >
        Submit
      </button>
      <div><p>To submit, you have to answer all questions.</p></div>
    </div>
  );
};

export default QuizPage;
