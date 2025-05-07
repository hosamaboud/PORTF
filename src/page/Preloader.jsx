import { useEffect, useRef } from 'react';
import { gsap } from '../gsap-config';
import AnimatedText from '../components/Utils/AnimatedText';

const Preloader = ({ setIsLoading }) => {
  const containerRef = useRef(null);
  const textRef_2 = useRef(null);
  const imgRef = useRef(null);
  const textRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      textRef_2.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'back.out(1.7)',
      }
    )
      .fromTo(
        imgRef.current,
        { opacity: 0, x: '200%', rotate: 360 },
        {
          opacity: 1,
          rotate: 0,
          x: 0,
          duration: 0.6,
          ease: 'power1',
        }
      )
      .fromTo(
        textRef.current,
        { y: -50 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.5,
          ease: 'back.out(1.7)',
        }
      )
      .to(lineRef.current, {
        width: '100%',
        duration: 1,
        ease: 'power4.out',
      });
    const timer = setTimeout(() => {
      const exitTl = gsap.timeline();

      // تصغير النص واختفاؤه
      exitTl
        .to(textRef.current, {
          y: -50,
          duration: 0.5,
          ease: 'power2.in',
        })
        .to(
          containerRef.current,
          {
            height: 0,
            duration: 0.7,
            ease: 'power4.inOut',
            onComplete: () => setIsLoading(false),
          },
          '-=0.5'
        );
    }, 2900);

    return () => clearTimeout(timer);
  }, [setIsLoading]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-[#9CEE69]"
    >
      <div className="absolute top-1/2 -translate-y-1/2 left-1 flex items-center gap-3 ">
        <AnimatedText
          text="hossam"
          ref={textRef_2}
          className="overflow-hidden text-[20vw] opacity-100 font-thunder uppercase text-black"
        />
        <img
          loading="lazy"
          ref={imgRef}
          className="w-[10vw] h-[10vw]"
          src="/logo.svg"
          alt="logo"
        />
      </div>
      <div className=" absolute left-[40%] bottom-20">
        <AnimatedText
          text="Loading..."
          ref={textRef}
          className="overflow-hidden text-black font-thunderLight uppercase text-4xl md:text-5xl"
        />

        <div className="relative ">
          <div className="absolute left-[40%] h-[3px] opacity-10 w-[100%] bg-[#2A2929] " />
          <div
            ref={lineRef}
            className="absolute left-[40%] h-[3px] w-0 bg-black "
          />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
