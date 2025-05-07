import { Outlet } from 'react-router-dom';
import Navbar from '../components/Utils/Navigation/Navbar';
import Footer from '../components/Utils/Footer/Footer';
import CustomCursor from '../components/Utils/CustomCursor';
import SmoothScroll from '../components/Utils/SmoothScroll';
import { useState, useEffect } from 'react';

const MainLayout = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {windowWidth > 768 && <CustomCursor />}
      <SmoothScroll />
      <Navbar />
      <main className="">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};
export default MainLayout;
