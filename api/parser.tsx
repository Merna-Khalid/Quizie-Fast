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

      
      const quizData: QuizData = {};
      const finalAnswers: string[] = [];
  
      const questionRegex = /\d+\.\s([^?]+)\?\s([\s\S]*?)(?=\d+\.|$)/g;
      const answerRegex = /[a-d]\)\s(.+?)\n/g;

      // Extract and store questions and answers

      // Split content by 'ANSWERS' and take only the part before 'ANSWERS'
      const contentWithoutAnswers = content.split('ANSWERS')[0];
      const questionsMatches = contentWithoutAnswers.match(questionRegex);
      // console.log(questionsMatches);

      if (questionsMatches) {
        questionsMatches.forEach((questionMatch: string, index: number) => {
          const question = questionMatch.match(/\d+\.\s([^?]+)\?\s/)![1].trim();

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

      
      const finalAnswersContent = content.split('ANSWERS:\n')[1];
      finalAnswers.push(...finalAnswersContent.split('\n'));

      // Add the final answers array to the quizData object
      quizData['ANSWERS'] = finalAnswers;

      // console.log(quizData);
      return quizData;
    } catch (error) {
      console.error('Error parsing API response:', error);
      return null;
    }
};

export default parseApiResponse;