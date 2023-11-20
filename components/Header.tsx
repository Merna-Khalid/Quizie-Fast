import React from 'react';
import Image from 'next/image';

import Link from 'next/link';


const Header: React.FC = () => {
  return (
    <header className='center z-50'>
      
        <h1 className="text-5xl leading-tight md:text-6xl md:leading-1.3 mb-8 font-semibold text-center">
            <Link href={'/'} className="hover:text-purple-500 transition duration-300 transform hover:scale-105">
                <span className="inline-block">
                Q<span className="animate-pulse inline-block">u</span>iz<span className="animate-pulse inline-block">i</span>e
                </span> Fast
            </Link>
        </h1>

        
    </header>
  );
};

export default Header;
