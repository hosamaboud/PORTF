import {gsap} from '../../gsap-config';
import { useRef } from 'react';

const CustomButton = ({ text, overlyText }) => {
  const buttonRef = useRef(null);
  const overlayRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.set(buttonRef.current, {
      zIndex: 0,
    });

    gsap.fromTo(
      overlayRef.current,
      { y: 50 },
      {
        y: 0,
        width: '210px',
        height: '210px',
        zIndex: 1,
        ease: 'power3',
        duration: 0.8,
      }
    );
  };
  const handleMouseLeave = () => {
    gsap.to(overlayRef.current, {
      width: '10px',
      height: '10px',
      y: 50,
      zIndex: 0,
      duration: 0.5,
      ease: 'power3',
    });

    gsap.to(buttonRef.current, {
      zIndex: 1,
      duration: 1,
    });
  };
  return (
    <button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden  w-[100px] h-[100px] rounded-full "
    >
      <p
        ref={buttonRef}
        className="absolute z-10 inset-0 flex items-center justify-center font-dancing text-2xl bg-[#e2f3fa] text-[#041218]  "
      >
        {text}
      </p>
      <p
        ref={overlayRef}
        className="absolute flex items-center justify-center top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2   w-[10px] overflow-hidden h-[10px] rounded-full  font-dancing text-2xl bg-[#D44638] text-[#000 ] "
      >
        {overlyText}
      </p>
    </button>
  );
};
export default CustomButton;
