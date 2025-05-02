import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// تسجيل Plugin مرة واحدة فقط
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  gsap.config({ nullTargetWarn: false });
}

export { gsap, ScrollTrigger };
