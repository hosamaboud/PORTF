import { Link } from 'react-router-dom';
import { gsap } from '../../gsap-config';
import { useRef } from 'react';

const CustomButton = ({ text, link }) => {
  const buttonRef = useRef(null);
  const overlayRef = useRef(null);
  const textRef = useRef(null);

  const handleMouseEnter = () => {
    const tl = gsap.timeline();
    tl.fromTo(
      overlayRef.current,
      {
        y: 100,
        scale: 0.1,
      },
      {
        y: 0,
        scale: 1,
        opacity: 1,
        ease: 'expoScale',
        duration: 1,
        width: '210px',
        height: '210px',
      },
      '<'
    ).to(
      textRef.current,
      {
        scale: 0.85,
        color: 'black',
        ease: 'expoScale',
      },
      '<'
    );
  };

  const handleMouseLeave = () => {
    const tl = gsap.timeline();
    tl.to(
      overlayRef.current,
      {
        width: '10px',
        height: '10px',
        y: 100,
        scale: 0.1,
        opacity: 0,
        duration: 1,
        ease: 'expoScale',
      },
      0
    ).to(
      textRef.current,
      {
        scale: 1,
        color: 'white',
        duration: 1,
        ease: 'expoScale',
      },
      0
    );
  };

  return (
    <Link
      to={link}
      type="button"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-[100px] h-[100px] rounded-full overflow-hidden"
    >
      <div
        ref={buttonRef}
        className="absolute inset-0 flex items-center justify-center bg-[#2A2929]"
      >
        <p
          ref={textRef}
          className="z-10 text-2xl text-[#FFEEEE] transition-scale duration-100"
        >
          {text}
        </p>
      </div>
      <div
        ref={overlayRef}
        className="absolute opacity-0 z-[5] flex items-center justify-center bottom-0 left-1/2 -translate-x-1/2 w-[10px] h-[10px] rounded-full bg-[#F93434]"
      ></div>
    </Link>
  );
};

export default CustomButton;
