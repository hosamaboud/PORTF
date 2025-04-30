import CurtainEffect from '../components/Home/CurtainEffect';
import Description from '../components/Home/Description';
import Hero from '../components/Home/Hero';
import Skills from '../components/Home/Skills';

const Home = () => {
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
