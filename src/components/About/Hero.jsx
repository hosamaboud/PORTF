import { useEffect, useRef } from 'react';
import AnimatedText from '../Utils/AnimatedText';
import { gsap } from '../../gsap-config';

const Hero = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      textRef.current,
      { opacity: 0, y: -100 },
      { opacity: 1, y: 0, duration: 2 }
    );
  }, []);
  return (
    <>
      <div className="w-full px-2 py-10 h-full md:h-[105vh] flex  flex-col md:flex-row  justify-around ">
        <div className="mt-10 md:mt-10  w-[70%] md:w-[50%] h-[40vh]  md:h-[60vh] lg:h-[70vh]">
          <div className="  flex items-center justify-around w-[90%]  md:w-[100%] ">
            <div className=" w-[10vw] flex items-center justify-center ">
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
            <div className=" w-[10vw] flex items-center justify-center ">
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
          <div className=" flex h-[50%] sm:h-[72%] items-center justify-start">
            <h1 className=" text-[8rem] sm:text-[13rem] lg:text-[20rem] text-red-600  font-thunder uppercase">
              mighty
            </h1>
          </div>
        </div>
        <div className="mt-0 md:mt-32 md:w-[30%] md:h-[60vh] flex flex-col items-center justify-around">
          <img
            className="bg-red-400 shadow-lg shadow-red-600 rounded-full border border-red-200 w-32 h-32"
            src="/public/logo.svg"
            alt="logo"
          />
          <p className="mt-[15vh] shadow-sm px-4 rounded-lg shadow-neon py-10 text-teal-700 font-light">
            Creativity calls it “small but mighty.” And we agree. Because we
            take our work seriously—but never ourselves. We build websites with
            a real voice—ones that make people laugh, think, or feel something.
            (And we’d never stop you from doing all three at once.)
          </p>
        </div>
      </div>
      <div className="mx-auto h-[1px] w-[90%] bg-[#393E46]"></div>
    </>
  );
};
export default Hero;
