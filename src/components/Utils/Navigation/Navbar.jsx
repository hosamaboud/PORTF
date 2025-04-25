import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

import Logo from './Logo';
import Menu from './Menu';
import useLenis from '../../../hooks/useLenis';

const Navbar = () => {
  const navRef = useRef(null);
  const lastScrollY = useRef(0);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis.current) return;

    const handleScroll = () => {
      const currentScrollY = lenis.current.scroll;
      const scrollDirection =
        currentScrollY > lastScrollY.current ? 'down' : 'up';
      lastScrollY.current = currentScrollY;
      if (navRef.current) {
        if (scrollDirection === 'down' && currentScrollY > 100) {
          gsap.to(navRef.current, {
            y: '-100px',
            duration: 0.1,
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
    };

    lenis.current.on('scroll', handleScroll);

    return () => {
      lenis.current.off('scroll', handleScroll);
    };
  }, [lenis]);

  return (
    <nav
      ref={navRef}
      className=" w-[100%] fixed top-0  z-50 flex items-center justify-between h-[60px] px-4 "
    >
      <Logo />
      <Menu />
    </nav>
  );
};

export default Navbar;
