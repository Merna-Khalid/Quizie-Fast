// components/Layout.tsx

import React, { ReactNode } from 'react';
import Head from 'next/head';

import Header from './Header';
import Footer from './Footer';


interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Quizie Fast</title>
        <meta name="description" content="Quizie Fast - A fast way to create quizzes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div 
      className={'flex-column min-h-screen bg-site text-white bg-cover bg-no-repeat font-sora relative'}>      

        <div className={'flex items-center justify-center py-16'}>
          <Header />
        </div>

        <div className='pb-0'>
          <div>
            {children}
          </div>

          <div className='bg-black fixed items-center justify-center gap-y-4 bottom-0 w-full pb-0'>
            <Footer />
          </div>
        </div>

      </div>

    </div>
  );
};

export default Layout;


