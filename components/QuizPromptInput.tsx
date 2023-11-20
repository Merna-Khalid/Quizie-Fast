// components/QuizPromptInput.tsx

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuizContext, QuizData } from '../context/QuizContext';

import jsonData from './test.json';


import parseApiResponse  from '../api/parser';

const QuizPromptInput: React.FC = () => {

    const { quizData, setQuiz } = useQuizContext();

    const router = useRouter();

    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    };

    const handleSubmit = async () => {

        const combinedMessage = `Create quiz of 10 questions and four choices each in the format of [question number] question ? \n [answer number alphabetically a), b), c), d)] answer and provide the answers at the end in the following format ANSWERS: [question number]. [full answer], ...\n\n${inputValue}`;


        try {

            setIsLoading(true);
            // Send the combined message to the OpenAI API
            const response = await sendToOpenAI(combinedMessage);


            // const response = jsonData.choices[0].message.content;
            
            const quizDataOut = parseApiResponse(response.choices[0].message.content);
            if (quizDataOut) {
                const handleSetQuizData = async (quizData: QuizData) => {
                  await setQuiz(quizData);
                  router.push('/quizpage');
                };
              
                setTimeout(() => {
                  handleSetQuizData(quizDataOut);
                }, 2000);
              } else {
                console.error('quizDataOut is null');
              }

        } catch (error) {
            console.error('Error sending message to OpenAI API:', error);
        } finally {
            // Set loading state to false after API request is completed
            setIsLoading(false);
        }

    };

    const sendToOpenAI = async (message: string) => {

        if (message.length === 0) {
            message = "about life";
        }
        // Replace 'YOUR_OPENAI_API_KEY' with your actual OpenAI API key
        const apiKey = 'YOUR_OPENAI_API_KEY';


        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
            model: "gpt-3.5-turbo-1106",
            stream: false,
            messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: message }],
            }),
        });

        if (!response.ok) {
            throw new Error(`OpenAI API request failed with status: ${response.status}`);
        }

        return response.json();
    };

    return (
    <div className="max-w-md mx-auto my-8">
        <label className="block text-white text-lg mb-2">What do you wish to be quizzed about?</label>
        <div className="flex">
        <input
            type="text"
            className="flex-1 p-2 mr-2 bg-white text-black rounded-l z-50"
            placeholder="Enter your topic"
            value={inputValue}
            onChange={handleInputChange}
        />
        <button
            className="bg-blue-500 text-white p-2 rounded-r transform hover:scale-105 transition-transform duration-300 ease-in-out hover:bg-blue-600 focus:outline-none"
            onClick={handleSubmit}
            disabled={isLoading}
        >
            {isLoading ? 'Submitting...' : 'Submit'}
        </button>

        </div>


    </div>
    );
};

export default QuizPromptInput;
