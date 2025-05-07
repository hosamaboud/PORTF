import React, { Suspense, lazy } from 'react';
import CurtainEffect from '../components/Home/CurtainEffect';
import Hero from '../components/Home/Hero';

const Skills = lazy(() => import('../components/Home/Skills'));
const Features = lazy(() => import('../components/Home/Features'));
const Description = lazy(() => import('../components/Home/Description'));

const Home = () => {
  return (
    <div className=" overflow-hidden touch-pan-y">
      <Hero />
      <CurtainEffect />
      <Suspense fallback={<div>Loading...</div>}>
        <Skills />
        <Features />
        <Description />
      </Suspense>
    </div>
  );
};
export default Home;
