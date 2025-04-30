// import { useEffect, useRef } from 'react';
// import Lenis from '@studio-freight/lenis';
// import { gsap } from 'gsap';

// const useLenis = () => {
//   const lenisRef = useRef(null);
//   const rafIdRef = useRef(null);

//   useEffect(() => {
//     // تهيئة Lenis
//     const lenis = new Lenis({
//       lerp: 0.1, // قيمة افتراضية لتنعيم الحركة
//       smoothWheel: true, // تمكين تنعيم حركة العجلة
//     });

//     // دمج مع GSAP
//     const gsapRaf = (time) => {
//       lenis.raf(time * 1000);
//     };

//     gsap.ticker.add(gsapRaf);
//     gsap.ticker.lagSmoothing(0);

//     // حفظ المرجع
//     lenisRef.current = lenis;

//     // حلقة التحديث
//     const raf = (time) => {
//       lenis.raf(time);
//       rafIdRef.current = requestAnimationFrame(raf);
//     };

//     rafIdRef.current = requestAnimationFrame(raf);

//     // تنظيف الموارد
//     return () => {
//       if (rafIdRef.current) {
//         cancelAnimationFrame(rafIdRef.current);
//       }

//       lenis.destroy();
//       gsap.ticker.remove(gsapRaf);
//     };
//   }, []);

//   return lenisRef;
// };

// export default useLenis;
