// pages/results.tsx

import { useRouter } from 'next/router';

const Results = () => {
  const router = useRouter();
  const { grade } = router.query;

  // Ensure grade is a number
  const userGrade = typeof grade === 'string' ? parseInt(grade, 10) : 0;

  return (
    <div className='flex-column justify-center items-center'>
      <h1 className='text-3xl leading-tight md:text-4xl md:leading-1.3 mb-8 font-semibold text-center'>Results</h1>
      <div className='bg-black/50'>
        <p className='text-center md:text-3xl'>Your Grade: {userGrade}</p>
      </div>
      
    </div>
  );
};

export default Results;
