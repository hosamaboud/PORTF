import gsap from 'gsap';
import { useEffect, useRef } from 'react';

const Circle = ({
  style,
  AnimationFrom,
  AnimationTo,
}) => {
  const circleRef = useRef(null);
  useEffect(() => {

      gsap.fromTo(circleRef.current, AnimationFrom, AnimationTo)

  }, []);
  return <div ref={circleRef} className={style}></div>;
};
export default Circle;
