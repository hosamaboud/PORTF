import CurtainEffect from '../components/Home/CurtainEffect';
import Description from '../components/Home/Description';
import Hero from '../components/Home/Hero';

const Home = () => {
  return (
    <div className=" overflow-hidden ">
      <Hero />

      <CurtainEffect />

      <Description />
    </div>
  );
};
export default Home;
