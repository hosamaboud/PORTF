import { useEffect, useRef } from 'react';
import { gsap } from '../../gsap-config';
import { FaArrowDown } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

const Hero = () => {
  const containerRef = useRef(null);
  const part_1Ref = useRef(null);
  const rotateDiv = useRef(null);
  const textRef = useRef(null);
  const scrollDownRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: part_1Ref.current,
            start: 'top top',
            end: '+=1100',
            scrub: 1.5,
            pin: true,
            markers: false,
            anticipatePin: 1,
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
          tl.to(`.row-${i}`, { y: `${i * 5}%`, ease: 'none' }, 0);
        });
        [2, 4].forEach((i) => {
          tl.to(`.row-${i}`, { y: `-${i * 5}%`, ease: 'none' }, 0);
        });
      });

      mm.add('(max-width: 767px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: part_1Ref.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
            pin: true,
            anticipatePin: 1,
          },
        });

        tl.fromTo(
          rotateDiv.current,
          { rotation: 0, y: 0, scale: 1, opacity: 0.4 },
          {
            width: '60%',
            height: '60%',
            rotation: -20,
            x: '-30%',
            y: 50,
            scale: 0.85,
            opacity: 1,
            ease: 'none',
            duration: 2,
          }
        ).fromTo(
          textRef.current,
          { opacity: 0, zIndex: '-1' },
          { opacity: 1, x: '50%', zIndex: '10', ease: 'none' },
          '<-=0.5'
        );
        [1, 3, 5].forEach((i) => {
          tl.to(`.row-${i}`, { y: `${i * 5}%`, ease: 'none' }, 0);
        });
        [2, 4].forEach((i) => {
          tl.to(`.row-${i}`, { y: `-${i * 5}%`, ease: 'none' }, 0);
        });
      });

      gsap.to(scrollDownRef.current, {
        y: 10,
        opacity: [1, 0.5],
        color: '#D62E49',
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative  overflow-hidden w-screen h-[100vh] md:h-[200vh] bg-black"
    >
      <div
        ref={part_1Ref}
        className="relative overflow-hidden w-screen h-[100vh]"
      >
        <div className="flex flex-col  items-center fixed bottom-10 md:bottom-20 right-5  md:right-10 z-10">
          <p className=" text-sm ">scroll down</p>
          <div ref={scrollDownRef}>
            <FaArrowDown className="text-sm" />
          </div>
        </div>

        <div
          ref={textRef}
          className="absolute top-1/2 left-1/2 translate-x-[-50%] will-change-transform"
        >
          <h1 className="text-4xl uppercase md:text-6xl font-bold text-center">
            Hello my friend.
          </h1>
        </div>

        <div className="flex items-start justify-center h-[130vh] md:h-[200vh] w-full">
          <div
            ref={rotateDiv}
            className="w-[200%] h-full flex items-center justify-center gap-[3vw]"
          >
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`row-${i} w-[calc(200vw/5)] h-[120vh] md:h-[200vh] flex flex-col gap-[3vh]`}
                style={{ marginTop: `-${i * 2}%` }}
              >
                {Array.from({ length: 4 }).map((_, j) => (
                  <div
                    key={j}
                    className="w-full h-full overflow-hidden rounded-lg"
                  >
                    <LazyImage
                      src={`/${(i - 1) * 4 + j + 1}.webp`}
                      alt={`Gallery ${i}-${j}`}
                      className="h-[200px] w-[200px] md:h-[400px] md:w-[500px] object-cover object-center"
                      loading="lazy"
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

const LazyImage = ({ src, alt, ...props }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '200px',
  });

  return (
    <div ref={ref} className="h-full w-full">
      {inView ? (
        <img src={src} alt={alt} {...props} />
      ) : (
        <div className="animate-pulse bg-gray-800 h-full w-full rounded-lg" />
      )}
    </div>
  );
};

export default Hero;
