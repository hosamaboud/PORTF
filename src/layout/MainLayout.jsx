import { Outlet } from 'react-router-dom';
import Navbar from '../components/Utils/Navigation/Navbar';
import Footer from '../components/Utils/Footer/Footer';
import CustomCursor from '../components/Utils/CustomCursor';

const MainLayout = () => {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};
export default MainLayout;
