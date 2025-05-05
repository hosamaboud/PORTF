import { useEffect, useRef, useState } from 'react';
import AnimatedText from '../Utils/AnimatedText';
import { gsap } from '../../gsap-config';

const Us = () => {
  const textRef = useRef([]);
  const [currentText, setCurrentText] = useState('About Us');
  const containerImgRef = useRef(null);
  const usRef = useRef(null);
  const images = useRef([]);
  const [textColor, setTextColor] = useState('text-white');

  const imageTexts = [
    'Our Team',
    'Our Vision',
    'Our Mission',
    'Our Values',
    'Our Work',
    'Contact Us',
  ];

  useEffect(() => {
    if (textRef.current.length > 0) {
      const tl = gsap.timeline();

      tl.fromTo(
        textRef.current,
        {
          scale: 0.5,
          opacity: 0,
          y: '200px',
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          y: 0,
          ease: 'power2.out',
          stagger: {
            each: 0.015,
            from: 'center',
          },
        }
      );
    }
  }, [currentText]);

  const handleContainerEnter = () => {
    setTextColor('text-red-500');
  };

  const handleContainerLeave = () => {
    setTextColor('text-white');
    setCurrentText('About Us');
  };

  const hoverImage = (index) => {
    // تحريك الصورة بشكل جمالي عند المرور
    gsap.to(images.current[index], {
      height: window.innerWidth > 500 ? '100px' : '80px',
      width: window.innerWidth > 500 ? '100px' : '80px',
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    });

    setCurrentText(imageTexts[index]);
  };

  const leaveImage = (index) => {
    gsap.to(images.current[index], {
      height: window.innerWidth > 500 ? '80px' : '60px',
      width: window.innerWidth > 500 ? '80px' : '60px',
      opacity: 0.5,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <>
      <div
        ref={usRef}
        className="h-[100vh] py-10 w-full flex flex-col items-center justify-center"
      >
        <div
          ref={containerImgRef}
          className="flex items-center gap-4 justify-center h-[100px] w-[90%] md:w-[60%] lg:w-[40%]"
          onMouseEnter={handleContainerEnter}
          onMouseLeave={handleContainerLeave}
        >
          {[1, 2, 3, 4, 5, 6].map((imgNum, index) => (
            <img
              key={imgNum}
              ref={(el) => (images.current[index] = el)}
              className="object-cover object-center h-[60px] w-[60px] md:h-[80px] md:w-[80px] rounded-lg opacity-[0.5] shadow-neon "
              src={`/${imgNum}.webp`}
              alt=""
              onMouseEnter={() => hoverImage(index)}
              onMouseLeave={() => leaveImage(index)}
            />
          ))}
        </div>
        <div className="h-[50vh] w-full flex items-center justify-center relative">
          <AnimatedText
            ref={textRef}
            text={currentText}
            className={`h-[40vh] flex items-center justify-center uppercase text-[5rem] md:text-[10rem] lg:text-[15rem] font-thunder ${textColor}`}
          />
        </div>
      </div>
      <div className="mx-auto h-[1px] w-[90%] bg-[#393E46]"></div>
    </>
  );
};

export default Us;
