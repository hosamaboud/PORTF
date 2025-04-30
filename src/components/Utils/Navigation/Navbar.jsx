import { useRef, useEffect } from 'react';
import { gsap } from '../../../gsap-config';
import Logo from './Logo';
import Menu from './Menu';

const Navbar = () => {
  const navRef = useRef(null);
  const lastScrollY = useRef(0);
  const isScrolling = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling.current) return;

      isScrolling.current = true;

      const currentScrollY = window.scrollY;
      const scrollDirection =
        currentScrollY > lastScrollY.current ? 'down' : 'up';
      lastScrollY.current = currentScrollY;

      if (navRef.current) {
        if (scrollDirection === 'down' && currentScrollY > 100) {
          gsap.to(navRef.current, {
            y: '-100%',
            duration: 0.3,
            ease: 'power1.in',
          });
        } else if (scrollDirection === 'up') {
          gsap.to(navRef.current, {
            y: '0%',
            duration: 0.3,
            ease: 'power1.out',
          });
        }
      }

      requestAnimationFrame(() => {
        isScrolling.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className="w-full fixed top-0 z-50 flex items-center justify-between h-[60px] px-4"
    >
      <Logo />
      <Menu />
    </nav>
  );
};

export default Navbar;
