import { gsap } from '../../../gsap-config';
import { useEffect, useRef } from 'react';
import Circle from '../Circle';

const Logo = () => {
  const logoRef = useRef(null);
  useEffect(() => {
    const logo = logoRef.current;
    const tl = gsap.timeline();
    tl.fromTo(
      logo,
      { y: -100, duration: 2, ease: 'power1.in' },
      {
        y: 0,
      }
    );
  }, []);
  const AnimationFrom = {
    x: 0,
    width: '30px',
    height: '30px',
    backgroundColor: 'rgba(22,196,127,0.4)',
  };
  const AnimationTo = {
    duration: 2,
    width: '35px',
    height: '35px',
    x: 105,
    ease: 'power1.in',
    backgroundColor: 'rgba(212,26,17,0.4)',
    yoyo: true,
    repeat: 10,
  };

  return (
    <div
      ref={logoRef}
      className="relative z-50 flex items-center justify-between md:justify-center"
    >
      <div className=" w-[50px] h-[50px] rotate-[10deg]">
        <div className="w-[20px] h-[20px] logo-clip-path-2 absolute bg-[#16C47F] bottom-2 left-3 z-10 -rotate-[190deg]"></div>
        <div className="top-2 w-[20px] h-[20px] left-2 logo-clip-path-2 bg-[#e85c0d] absolute z-10 rotate-[-10deg]"></div>
      </div>
      {/* Header text */}
      <div className="flex z-10 font-bebas items-center  justify-center">
        <h1 className="text-3xl  text-[#e85c0d] uppercase">hossam</h1>
        <span className="text-xl text-[#16C47F] uppercase ">aboud.</span>
      </div>
      <Circle
        style="absolute left-10 rounded-full"
        AnimationFrom={AnimationFrom}
        AnimationTo={AnimationTo}
      />
    </div>
  );
};
export default Logo;
