import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLoading } from './Context/ContextApp';
import MainLayout from './layout/MainLayout';
import CustomCursor from './components/Utils/CustomCursor';
import Preloader from './page/Preloader';

// Lazy load components
const Home = lazy(() => import('./page/Home'));
const About = lazy(() => import('./page/About'));
const Contact = lazy(() => import('./page/Contact'));
const Projects = lazy(() => import('./page/Projects'));
const Cv = lazy(() => import('./page/Cv'));

// Loading component
const Loading = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
  </div>
);

const App = () => {
  const { isLoading, setIsLoading } = useLoading();

  return (
    <Router>
      <CustomCursor />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/cv" element={<Cv />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
        </Routes>
      </Suspense>

      {isLoading && <Preloader setIsLoading={setIsLoading} />}
    </Router>
  );
};

export default App;
