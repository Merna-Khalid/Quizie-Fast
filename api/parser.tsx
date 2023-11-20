interface Choice {
  message: {
    content: string;
  };
}

interface QuizData {
  [key: string]: string[] | string[];
}


const parseApiResponse = (content: string): QuizData | null => {
    try {

      // const contentStart = apiResponse.indexOf('"content": "') + '"content": "'.length;
      // const contentEnd = apiResponse.indexOf('",', contentStart);

      // Extract the content
      // const content = apiResponse.slice(contentStart, contentEnd);

      // Initialize an object to store questions and answers
      const quizData: QuizData = {};
      const finalAnswers: string[] = [];
  
      const questionRegex = /\d+\.\s([^?]+)\?\s([\s\S]*?)(?=\d+\.\s|$)/g;
      const answerRegex = /[a-d]\)\s(.+?)\n/g;

      // Extract and store questions and answers
      const questionsMatches = content.match(questionRegex);
      if (questionsMatches) {
        questionsMatches.forEach((questionMatch: string, index: number) => {
          const question = questionMatch.match(/\d+\.\s([^?]+)\?\s/)![1];

          // Extract answers
          const answers: string[] = [];
          let answerMatch;
          while ((answerMatch = answerRegex.exec(questionMatch)) !== null) {
            answers.push(answerMatch[1]);
          }

          // Store the question and answers in the quizData object
          quizData[question + '?'] = answers;
        });
      }

      const finalAnswersMatch = content.match(/ANSWERS:\n([\s\S]+)$/);
      if (finalAnswersMatch) {
        const finalAnswersContent = finalAnswersMatch[1];
        finalAnswers.push(...finalAnswersContent.split('\n'));
      }


      // Add the final answers array to the quizData object
      console.log(finalAnswers);
      quizData['ANSWERS'] = finalAnswers;
  
      return quizData;
    } catch (error) {
      console.error('Error parsing API response:', error);
      return null;
    }
};

export default parseApiResponse;