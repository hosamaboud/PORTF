import { useEffect, useRef } from 'react';
import { gsap } from '../../gsap-config';
import { FaArrowDown } from 'react-icons/fa';
import useLenis from '../../hooks/useLenis';

const Hero = () => {
  const lenis = useLenis();
  const containerRef = useRef(null);
  const part_1Ref = useRef(null);
  const rotateDiv = useRef(null);
  const textRef = useRef(null);
  const scrollDownRef = useRef(null);

  useEffect(() => {
    lenis.current?.stop();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: part_1Ref.current,
          start: 'top top',
          end: '+=1300',
          scrub: 1.5,
          pin: true,
          markers: false,
          anticipatePin: 1,
          onEnter: () => lenis.current?.stop(),
          onLeaveBack: () => lenis.current?.start(),
          onRefresh: () => setTimeout(() => lenis.current?.start(), 300),
        },
      });

      tl.fromTo(
        rotateDiv.current,
        { rotation: 0, y: 0, scale: 1, opacity: 0.4 },
        {
          width: '50%',
          height: '50%',
          rotation: -20,
          x: '-30%',
          y: 100,
          scale: 0.85,
          opacity: 1,
          ease: 'none',
          duration: 2,
        },
        0
      ).fromTo(
        textRef.current,
        { opacity: 0, zIndex: '-1' },
        { opacity: 1, x: '50%', zIndex: '10', ease: 'none' },
        0
      );
      [1, 3, 5].forEach((i) => {
        tl.to(`.row-${i}`, { y: `-${i * 5}%`, ease: 'none' }, 0);
      });
      [2, 4].forEach((i) => {
        tl.to(`.row-${i}`, { y: `${i * 5}%`, ease: 'none' }, 0);
      });
      gsap.to(scrollDownRef.current, {
        opacity: 0.5,
        color: '#D44638',
        y: 10,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        duration: 1,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative  overflow-hidden w-full h-[200vh] bg-black"
    >
      <div
        ref={part_1Ref}
        className="relative overflow-hidden w-full h-[100vh]"
      >
        <div className="flex flex-col  items-center fixed bottom-20 right-5  md:right-10 z-10">
          <p className=" text-sm ">scroll down</p>
          <FaArrowDown ref={scrollDownRef} className="  text-sm" />
        </div>

        <div
          ref={textRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2"
        >
          <h1 className="text-4xl uppercase md:text-6xl font-bold text-center">
            Hello my friend.
          </h1>
        </div>

        <div className="flex items-start justify-center h-[200vh] w-full">
          <div
            ref={rotateDiv}
            className="w-[200%] h-full flex items-center justify-center gap-[3vw]"
          >
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`row-${i} w-[calc(200vw/5)] h-[200vh] flex flex-col gap-[3vh]`}
                style={{ marginTop: `-${i * 5}%` }}
              >
                {Array.from({ length: 4 }).map((_, j) => (
                  <div
                    key={j}
                    className="w-full h-full overflow-hidden rounded-lg"
                  >
                    <img
                      className="w-full h-full object-cover object-center"
                      src={`/${(i - 1) * 4 + j + 1}.jpg`}
                      alt={`Gallery ${i}-${j}`}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
