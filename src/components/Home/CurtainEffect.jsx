import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../gsap-config';

const CurtainEffect = () => {
  // Refs
  const containerRef = useRef(null);
  const textContainerRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const circleRef = useRef(null);
  const waveSvgRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set GSAP defaults
      gsap.defaults({
        ease: 'power2.inOut',
        duration: 2,
      });

      // Wave animation
      const setupWaveAnimation = () => {
        gsap.to(waveSvgRef.current.querySelector('path'), {
          attr: { d: 'M0 2S175 1 500 1s500 1 500 1V0H0Z' },
          scrollTrigger: {
            trigger: waveSvgRef.current,
            start: 'top 80%',
            end: '+=200',
            scrub: 1.5,
          },
        });
      };

      // Main animations for desktop
      const setupDesktopAnimations = () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: textContainerRef.current,
            start: 'top top',
            end: '+=200',
            scrub: 2,
          },
        });

        // Text reveal animations
        tl.fromTo(
          text1Ref.current,
          { width: '0%' },
          { width: '100%', ease: 'none' },
          0.2
        );
        tl.fromTo(
          text2Ref.current,
          { width: '0%' },
          { width: '100%', ease: 'none' },
          0.4
        );

        // Circle animation
        tl.fromTo(
          circleRef.current,
          {
            opacity: 0,
            scale: 0.7,
            x: -100,
            rotation: 0,
          },
          {
            opacity: 1,
            scale: 1,
            x: window.innerWidth > 600 ? 900 : '300%',
            rotation: 360,
            duration: 3.2,
          },
          0.6
        );

        // Image animation
        tl.fromTo(
          imageRef.current,
          {
            x: 120,
            opacity: 0,
            scale: 0.95,
          },
          {
            opacity: 1,
            x: -60,
            scale: 1,
            duration: 2.6,
          },
          0.9
        );
      };

      // Main animations for mobile
      const setupMobileAnimations = () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: textContainerRef.current,
            start: 'top 60%',
            end: '+=500',
            scrub: 2,
            pinSpacing: false,
          },
        });

        // Reuse same animations but with different timing/positioning
        tl.fromTo(
          text1Ref.current,
          { width: '0%' },
          { width: '100%', ease: 'none' },
          0.2
        );
        tl.fromTo(
          text2Ref.current,
          { width: '0%' },
          { width: '100%', ease: 'none' },
          0.4
        );

        tl.fromTo(
          circleRef.current,
          {
            opacity: 0,
            scale: 0.7,
            x: -100,
            rotation: 0,
          },
          {
            opacity: 1,
            scale: 1,
            x: '300%',
            rotation: 360,
            duration: 3.2,
          },
          0.6
        );

        tl.fromTo(
          imageRef.current,
          {
            x: 120,
            opacity: 0,
            scale: 0.95,
          },
          {
            opacity: 1,
            x: -60,
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

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col w-full h-[110vh] md:h-[160vh] bg-[#031a1a] overflow-hidden"
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
          fill="#6A9C89"
          d="M0 502S175 272 500 272s500 230 500 230V0H0Z"
          className="will-change-d"
        />
      </svg>

      {/* Main content */}
      <div
        ref={textContainerRef}
        className="relative w-full h-[100vh] md:h-[140vh] flex flex-col justify-center items-center px-5 z-20"
      >
        {/* Text elements */}
        <div className="relative w-full h-[70vh] md:h-full">
          {/* Background text */}
          <div
            aria-hidden="true"
            className="absolute left-[10%] top-40 flex items-center gap-5 text-[5vw] font-extrabold uppercase text-[#7df0e4] opacity-50 whitespace-nowrap will-change-transform"
          >
            hi there i'm hossam aboud.
          </div>

          {/* Animated text 1 */}
          <div
            ref={text1Ref}
            className="absolute left-[10%] top-40 flex items-center gap-5 text-[5vw] font-extrabold uppercase text-[#7df0e4] overflow-hidden whitespace-nowrap will-change-transform"
          >
            hi there i'm hossam aboud.
          </div>

          {/* Background text 2 */}
          <div
            aria-hidden="true"
            className="absolute left-[10%] top-60 text-[4vw] font-extrabold text-[#e6fcfb] opacity-50 whitespace-nowrap will-change-transform"
          >
            frontend developer • web designer • service provider
          </div>

          {/* Animated text 2 */}
          <div
            ref={text2Ref}
            className="absolute left-[10%] top-60 text-[4vw] font-extrabold text-[#e6fcfb] overflow-hidden whitespace-nowrap will-change-transform"
          >
            frontend developer • web designer • service provider
          </div>
        </div>

        {/* Profile image */}
        <div
          ref={imageRef}
          className="z-30 flex items-center justify-center w-1/2 h-[50vh] p-2 will-change-transform"
        >
          <img
            loading="lazy"
            className="w-full h-full object-contain will-change-transform"
            src="/hoss.svg"
            alt="Hossam Aboud - Frontend Developer"
          />
        </div>

        {/* Animated circles */}
        <div className="absolute top-1/2 left-0 w-[20vw] h-[20vh] md:translate-y-[-10%] translate-y-[-30%] will-change-transform">
          <svg
            ref={circleRef}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 800 800"
            className="w-full h-full"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="ggglitch-grad"
                x1="50%"
                y1="0%"
                x2="50%"
                y2="100%"
              >
                <stop offset="45%" stopColor="hsl(184, 74%, 44%)" />
                <stop offset="100%" stopColor="hsl(332, 87%, 70%)" />
              </linearGradient>
              <clipPath id="clipPath1">
                <rect width="133.33" height="800" x="0" y="0" />
                <rect width="133.33" height="800" x="266.67" y="0" />
                <rect width="133.33" height="800" x="533.33" y="0" />
                <rect width="133.33" height="800" x="800" y="0" />
              </clipPath>
              <clipPath id="clipPath2">
                <rect width="133.33" height="800" x="133.33" y="0" />
                <rect width="133.33" height="800" x="400" y="0" />
                <rect width="133.33" height="800" x="666.67" y="0" />
                <rect width="133.33" height="800" x="933.33" y="0" />
              </clipPath>
            </defs>
            <g strokeWidth="68" stroke="url(#ggglitch-grad)" fill="none">
              {[364, 270.5, 177, 83.5].map((radius, i) => (
                <circle
                  key={`circle-1-${i}`}
                  r={radius}
                  cx="400"
                  cy="400"
                  opacity="0.35"
                  clipPath='url("#clipPath1")'
                />
              ))}
              {[366, 272.5, 179, 85.5].map((radius, i) => (
                <circle
                  key={`circle-2-${i}`}
                  r={radius}
                  cx="400"
                  cy="400"
                  clipPath='url("#clipPath2")'
                />
              ))}
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CurtainEffect;
