import { useEffect, useRef } from 'react';
import { gsap } from '../../gsap-config';
import AnimatedText from '../Utils/AnimatedText';

const CurtainEffect = () => {
  // Refs
  const containerRef = useRef(null);
  const textContainerRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const textRef = useRef(null);
  const prevTextRef = useRef(null);
  const waveSvgRef = useRef(null);
  const imageRef = useRef(null);
  const liveRef = useRef(null);

  const onEnter = () => {
    const tl = gsap.timeline();
    tl.to(textRef.current, {
      y: '-100%',
      stagger: 0.01,
      duration: 0.8,
      ease: 'expo.out',
    }).to(
      prevTextRef.current,
      {
        y: '-100%',
        stagger: 0.01,
        duration: 0.8,
        ease: 'expo.out',
      },
      '<'
    );
  };

  const onLeave = () => {
    const tl = gsap.timeline();
    tl.to(prevTextRef.current, {
      y: '0%',
      stagger: 0.01,
      duration: 0.8,
      ease: 'expo.out',
    }).to(
      textRef.current,
      {
        y: '0%',
        stagger: 0.01,
        duration: 0.8,
        ease: 'expo.out',
      },
      '<'
    );
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set GSAP defaults for all animations
      gsap.defaults({
        ease: 'power2.inOut',
        duration: 2,
      });
      // Animate the live dot with scale and opacity for a pulsing effect
      gsap.fromTo(
        liveRef.current,
        {
          opacity: 0,
          scale: 0.5,
          delay: 0.5,
        },
        {
          opacity: 1,
          scale: 1.1,
          delay: 0.5,
          ease: 'expo.out',
          yoyo: true,
          repeat: -1,
        }
      );

      // Wave animation on scroll
      const setupWaveAnimation = () => {
        gsap.to(waveSvgRef.current.querySelector('path'), {
          attr: { d: 'M0 2S175 1 500 1s500 1 500 1V0H0Z' },
          scrollTrigger: {
            trigger: waveSvgRef.current,
            start: 'top 30%',
            end: '+=200',
            scrub: 1.5,
          },
        });
      };

      // Main animations for desktop screens
      const setupDesktopAnimations = () => {
        // Timeline for text and image reveal, pinned while scrolling
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: textContainerRef.current,
            start: '10% top',
            end: '+=150',
            pin: true,
            scrub: 2,
          },
        });

        // Animate first text line width from 0% to 100%
        tl.fromTo(
          text1Ref.current,
          { width: '0%' },
          { width: '100%', ease: 'none' },
          0.2
        );
        // Animate second text line width from 0% to 100%
        tl.fromTo(
          text2Ref.current,
          { width: '0%' },
          { width: '100%', ease: 'none' },
          0.4
        );

        // Animate image entrance from left to center
        gsap.fromTo(
          imageRef.current,
          {
            x: '100%',
            opacity: 0,
            scale: 0.5,
          },
          {
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top 55%',
              end: '+=40',
              scrub: 1.5,
            },
            opacity: 1,
            x: '-20%',
            scale: 1,
            duration: 2.6,
          },
          0.9
        );
      };

      // Main animations for mobile screens
      const setupMobileAnimations = () => {
        // Timeline for text and image reveal, triggered lower on the screen
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: textContainerRef.current,
            start: 'top top',
            end: '+=200',
            pin: true,
            scrub: 2,
            markers: true,
          },
        });

        // Animate first text line width from 0% to 100%
        tl.fromTo(
          text1Ref.current,
          { width: '0%' },
          { width: '100%', ease: 'none' },
          0.2
        );
        // Animate second text line width from 0% to 100%
        tl.fromTo(
          text2Ref.current,
          { width: '0%' },
          { width: '100%', ease: 'none' },
          0.4
        );
        // Animate image entrance from right to center
        tl.fromTo(
          imageRef.current,
          {
            x: '100%',
            scale: 0.95,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 2.6,
          },
          0.9
        );
      };

      // Initialize animations
      setupWaveAnimation();

      // Set up media queries
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', setupDesktopAnimations);
      mm.add('(max-width: 767px)', setupMobileAnimations);
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative  flex flex-col w-full  h-[150vh] md:min-h-[190vh] bg-black overflow-hidden"
    >
      {/* Wave SVG */}
      <svg
        ref={waveSvgRef}
        className="absolute w-full h-[30vh] md:h-[40vh] bg-transparent z-10 will-change-transform"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          fill="#B43F3F"
          d="M0 502S175 272 500 272s500 230 500 230V0H0Z"
          className="will-change-d"
        />
      </svg>

      {/* Main content */}
      <div
        ref={textContainerRef}
        className="relative  w-ful md:h-[160vh] h-[100vh] flex flex-col justify-around items-center px-10 z-20"
      >
        {/* Text elements */}
        <div className="relative w-full h-[30vh] md:h-[70vh] ">
          {/* Background text */}
          <div
            aria-hidden="true"
            className="absolute uppercase left-1  md:left-[5%] md:top-[30%] top-[40%] flex items-center gap-5 text-[10vw] font-thunder text-[#D62E49] opacity-50 whitespace-nowrap will-change-transform"
          >
            i'm hossam aboud
          </div>

          {/* Animated text 1 */}
          <div
            ref={text1Ref}
            className="absolute uppercase left-1 md:left-[5%] md:top-[30%] top-[40%] flex items-center gap-5 text-[10vw] font-thunder  text-[#D62E49] overflow-hidden whitespace-nowrap will-change-transform"
          >
            i'm hossam aboud
          </div>

          {/* Background text 2 */}
          <div
            aria-hidden="true"
            className="absolute left-1 md:left-[5%] top-[70%] text-[4vw] md:text-[5vw] font-thunder uppercase text-[#e6fcfb] opacity-50 whitespace-nowrap will-change-transform"
          >
            frontend developer • web designer • service provider
          </div>

          {/* Animated text 2 */}
          <div
            ref={text2Ref}
            className="absolute left-1 md:left-[5%] top-[70%] text-[4vw] md:text-[5vw] font-thunder uppercase text-[#e6fcfb] overflow-hidden whitespace-nowrap will-change-transform"
          >
            frontend developer • web designer • service provider
          </div>
        </div>

        {/* part 2 */}
        <div className="relative rounded-[10%] shadow-[0_0_20px_0_rgba(214,46,73,0.5)]  z-30 flex items-center justify-center md:h-[80vh] h-[70vh]  w-full  gap-4 will-change-transform">
          <img
            ref={imageRef}
            loading="lazy"
            className=" md:w-[300px] w-[200px] shadow-[0_0_20px_0_rgba(214,46,73,0.5)] rounded-full md:h-[300px] h-[200px] object-cover object-center will-change-transform"
            src="/23.webp"
            alt="Hossam Aboud - Frontend Developer, Web Designer, Service Provider"
            aria-label="Hossam Aboud profile illustration"
          />
          <div className="absolute right-[5%] bottom-2 md:w-[30%] w-[150px] sm:w-[250px] flex items-center justify-center">
            <div
              className="h-[15px] w-[15px] sm:h-[18px] sm:w-[18px] md:h-[20px] md:w-[20px] border-[1px] border-[#ff0000] rounded-[50%] flex items-center justify-center"
              aria-label="Live status indicator"
            >
              <div
                ref={liveRef}
                className="bg-[#ff0000] h-[6px] w-[6px] sm:h-[7px] sm:w-[7px] md:h-[8px] md:w-[8px] rounded-full transition-scale duration-300"
                aria-label="Live dot animation"
              ></div>
            </div>
            <div
              className="flex relative overflow-hidden flex-col h-[5vh] sm:h-[6vh] md:h-[10vh] w-full"
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
              onTouchStart={onEnter}
              onTouchEnd={onLeave}
              aria-label="Animated name and job title"
            >
              <AnimatedText
                ref={textRef}
                text="Hossam Aboud"
                className="absolute flex top-1/2 translate-y-[-50%] left-1/2 translate-x-[-50%] uppercase text-[#2A2929] text-[5vw] font-thunder will-change-transform"
              />
              <AnimatedText
                ref={prevTextRef}
                text="hossam aboud"
                className="absolute flex top-1/2 translate-y-[50%] left-1/2 translate-x-[-50%] uppercase text-red-500 text-[5vw] font-thunder will-change-transform"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurtainEffect;
