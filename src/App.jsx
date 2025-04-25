import useLenis from './hooks/useLenis';
import { Route, Routes } from 'react-router-dom';

import { useLoading } from './Context/ContextApp';
import MainLayout from './layout/MainLayout';
import Cv from './page/Cv';
import About from './page/About';
import Home from './page/Home';
import Projects from './page/Projects';
import Contact from './page/contact';

const App = () => {
  useLenis();
  const { isLoading, setIsLoading } = useLoading();

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cv" element={<Cv />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>

      {isLoading && <Preloader setIsLoading={setIsLoading} />}
    </>
  );
};

export default App;
