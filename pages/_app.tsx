import '../styles/globals.css';
import type { AppProps } from 'next/app';

import Layout from '../components/Layout'
import Transition from '../components/Transition'

import { QuizProvider } from '../context/QuizContext';

import {useRouter} from 'next/router'

import {AnimatePresence, motion} from 'framer-motion'


function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
  <Layout>
    <AnimatePresence mode='wait'>
      <motion.div key={router.route} >
        <Transition />
        <QuizProvider>
          <Component {...pageProps} />
        </QuizProvider>
      </motion.div>
    </AnimatePresence>
  </Layout>
  );
}

export default MyApp;