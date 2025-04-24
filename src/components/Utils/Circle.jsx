import gsap from 'gsap';
import { useEffect, useRef } from 'react';

const Circle = ({
  style,
  AnimationFrom,
  AnimationTo,
  AnimationFrom_mobile,
  AnimationTo_mobile,
}) => {
  const circleRef = useRef(null);
  useEffect(() => {
    const mm = gsap.matchMedia();
    if (circleRef.current) {
      gsap.fromTo(circleRef.current, AnimationFrom, AnimationTo);
    }

    mm.add('(max-width: 767px)', () => {
      gsap.fromTo(circleRef.current, AnimationFrom_mobile, AnimationTo_mobile);
    });

    return () => {
      mm.revert();
    };
  }, []);
  return <div ref={circleRef} className={style}></div>;
};
export default Circle;
