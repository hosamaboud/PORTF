import CurtainEffect from '../components/Home/CurtainEffect';
import Description from '../components/Home/Description';
import Hero from '../components/Home/Hero';
import useLenis from '../hooks/useLenis';

const Home = () => {
  useLenis();
  return (
    <div className=" overflow-hidden touch-pan-y">
      <Hero />

      <CurtainEffect />

      <Description />
    </div>
  );
};
export default Home;
