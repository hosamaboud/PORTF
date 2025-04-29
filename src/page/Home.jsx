import CurtainEffect from '../components/Home/CurtainEffect';
import Description from '../components/Home/Description';
import Hero from '../components/Home/Hero';
import Skills from '../components/Home/Skills';
import useLenis from '../hooks/useLenis';

const Home = () => {
  useLenis();
  return (
    <div className=" overflow-hidden touch-pan-y">
      <Hero />
      <CurtainEffect />
      <Skills />
      <Description />
    </div>
  );
};
export default Home;
