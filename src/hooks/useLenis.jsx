import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from '../gsap-config';

const useLenis = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1, // زيادة السلاسة
      wheelMultiplier: 0.7,
      touchMultiplier: 1.2, // تحسين حساسية اللمس
      smoothWheel: true,
      syncTouch: true,
      syncTouchLerp: 0.1, // سلاسة أكبر لللمس
      touchInertiaMultiplier: 20, // تقليل القصور الذاتي
    });

    // التكامل مع GSAP
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    lenisRef.current = lenis;

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  return lenisRef;
};

export default useLenis;
