import Head from 'next/head';
import Image from "next/image";

import QuizPromptInput from '../components/QuizPromptInput';


const Home: React.FC = () => {

  return (
    <div className='bg-primary/30 h-full w-full'>
        <QuizPromptInput />
    </div>
  );
};

export default Home;