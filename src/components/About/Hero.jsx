import { useEffect, useRef, useCallback } from 'react';
import AnimatedText from '../Utils/AnimatedText';
import { gsap } from '../../gsap-config';

const Hero = () => {
  const textRef = useRef(null);
  const nameRef = useRef(null);
  const svgRef = useRef([]);
  const subTextRef = useRef(null);
  const imageRef = useRef(null);

  // Throttle function
  const throttle = (func, limit) => {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  };

  const handleMouseMove = useCallback((e) => {
    const { clientX, clientY } = e;
    const xPos = (clientX / window.innerWidth - 0.5) * 20;
    const yPos = (clientY / window.innerHeight - 0.5) * 20;

    gsap.to(nameRef.current, {
      x: xPos,
      y: yPos,
      duration: 1,
      ease: 'power2.out',
    });

    gsap.to(svgRef.current, {
      x: xPos * 0.5,
      y: yPos * 0.5,
      duration: 1,
      ease: 'power2.out',
    });
  }, []);

  useEffect(() => {
    const throttledMouseMove = throttle(handleMouseMove, 50);
    window.addEventListener('mousemove', throttledMouseMove);
    return () => window.removeEventListener('mousemove', throttledMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      textRef.current,
      { opacity: 0, y: -100, rotate: -20 },
      { opacity: 1, y: 0, duration: 0.5, rotate: 0 }
    )
      .fromTo(
        nameRef.current,
        { opacity: 0, y: -100, rotate: -20 },
        { opacity: 1, y: 0, duration: 0.5, rotate: 0 },
        '<'
      )
      .fromTo(
        svgRef.current,
        { opacity: 0, height: 0, y: -100 },
        { opacity: 1, height: '10vw', duration: 0.5, y: 0 }
      )
      .fromTo(
        subTextRef.current,
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 0.5 }
      )
      .fromTo(
        imageRef.current,
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 0.5 }
      );
  }, []);
  return (
    <>
      <div className="w-full px-2 py-10 h-full md:h-[105vh] flex  flex-col md:flex-row  justify-around ">
        <div className="mt-10 md:mt-10  w-[70%] md:w-[50%] h-[40vh]  md:h-[60vh] lg:h-[70vh]">
          <div className="  flex items-center justify-around w-[90%]  md:w-[100%] ">
            <div
              ref={(el) => (svgRef.current[0] = el)}
              className=" w-[10vw] flex items-center justify-center "
            >
              <svg
                className="w-[40%] h-full"
                viewBox="0 0 49 111"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.75 30.1869V0.75H47.5221V30.1868L43.8425 110.25H4.42956L0.75 30.1869Z"
                  stroke="white"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                  data-svg-origin="0.75 0.75"
                  transform="matrix(1,0,0,1,0,0)"
                ></path>
              </svg>
              <svg
                className="w-[40%] h-full"
                viewBox="0 0 49 111"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.75 30.1869V0.75H47.5221V30.1868L43.8425 110.25H4.42956L0.75 30.1869Z"
                  stroke="white"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                  data-svg-origin="0.75 0.75"
                  transform="matrix(1,0,0,1,0,0)"
                ></path>
              </svg>
            </div>
            <AnimatedText
              ref={textRef}
              text="small but"
              className="text-[2rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[6rem] font-thunder uppercase"
            />
            <div
              ref={(el) => (svgRef.current[1] = el)}
              className=" w-[10vw] flex items-center justify-center "
            >
              <svg
                className="w-[40%] h-full"
                viewBox="0 0 49 111"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.75 30.1869V0.75H47.5221V30.1868L43.8425 110.25H4.42956L0.75 30.1869Z"
                  stroke="white"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                  data-svg-origin="0.75 0.75"
                  transform="matrix(1,0,0,1,0,0)"
                ></path>
              </svg>
              <svg
                className="w-[40%] h-full"
                viewBox="0 0 49 111"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.75 30.1869V0.75H47.5221V30.1868L43.8425 110.25H4.42956L0.75 30.1869Z"
                  stroke="white"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                  data-svg-origin="0.75 0.75"
                  transform="matrix(1,0,0,1,0,0)"
                ></path>
              </svg>
            </div>
          </div>
          <div
            ref={nameRef}
            className=" flex h-[50%] sm:h-[72%] items-center justify-start"
          >
            <h1 className=" text-[8rem] sm:text-[13rem] lg:text-[20rem] text-red-600  font-thunder uppercase">
              mighty
            </h1>
          </div>
        </div>
        <div className="mt-0 md:mt-32 md:w-[30%] md:h-[60vh] flex flex-col items-center justify-around">
          <img
            ref={imageRef}
            className="bg-red-400 shadow-lg shadow-red-600 rounded-full border border-red-200 w-32 h-32"
            src="/public/logo.svg"
            alt="logo"
            loading="lazy"
            width="128"
            height="128"
          />
          <p
            ref={subTextRef}
            className="mt-[15vh] shadow-sm px-4 rounded-lg shadow-neon py-10 text-teal-700 font-light"
          >
            Creativity calls it "small but mighty." And we agree. Because we
            take our work seriously—but never ourselves. We build websites with
            a real voice—ones that make people laugh, think, or feel something.
            (And we'd never stop you from doing all three at once.)
          </p>
        </div>
      </div>
      <div className="mx-auto h-[1px] w-[90%] bg-[#393E46]"></div>
    </>
  );
};
export default Hero;
