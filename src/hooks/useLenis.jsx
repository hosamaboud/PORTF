import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';

const useLenis = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.07, // قيمة أقل لسلاسة أكثر دقة
      wheelMultiplier: 0.8, // تقليل حساسية العجلة
      smoothWheel: true,
      syncTouch: true, // تحسين الأداء على الأجهزة اللوحية
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
