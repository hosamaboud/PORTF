import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../gsap-config';

const CurtainEffect = () => {
  const containerTextRef = useRef(null);
  const text_1Ref = useRef(null);
  const text_2Ref = useRef(null);
  const circleRef = useRef(null);
  const svgRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    gsap.defaults({
      ease: 'power2.inOut',
      duration: 2,
    });

    const containerText = containerTextRef.current;
    const text_1 = text_1Ref.current;
    const text_2 = text_2Ref.current;

    const waveTl = gsap.timeline({
      scrollTrigger: {
        trigger: svgRef.current,
        start: 'top 80%',
        end: '+=200',
        scrub: 1.5,
      },
    });

    waveTl.to(svgRef.current.querySelector('path'), {
      attr: { d: 'M0 2S175 1 500 1s500 1 500 1V0H0Z' },
    });

    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerText,
        start: 'top top',
        end: '+=100',
        scrub: 2,
        pin: true,
        pinSpacing: false,
      },
    });

    mainTl.fromTo(text_1, { width: '0%' }, { width: '100%' }, 0.2);
    mainTl.fromTo(text_2, { width: '0%' }, { width: '100%' }, 0.4);

    mainTl.fromTo(
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

    mainTl.fromTo(
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

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative flex flex-col w-full h-[160vh] bg-[#031a1a] overflow-hidden">
      <svg
        ref={svgRef}
        className="absolute w-full h-[40vh] bg-transparent z-10"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <path fill="#e6fcfb" d="M0 502S175 272 500 272s500 230 500 230V0H0Z" />
      </svg>

      <div
        ref={containerTextRef}
        className="relative w-full h-[140vh] flex flex-col justify-center items-center px-5 z-20"
      >
        <div className="relative w-full h-full">
          <div className="absolute left-[10%] top-40 flex items-center gap-5 text-[5vw] font-extrabold uppercase text-[#7df0e4] opacity-50 whitespace-nowrap">
            hi there i'm hossam aboud.
          </div>
          <div
            ref={text_1Ref}
            className="absolute left-[10%] top-40 flex items-center gap-5 text-[5vw] font-extrabold uppercase text-[#7df0e4] overflow-hidden whitespace-nowrap"
          >
            hi there i'm hossam aboud.
          </div>

          <div className="absolute left-[10%] top-60 text-[4vw] font-extrabold text-[#e6fcfb] opacity-50 whitespace-nowrap">
            frontend developer • web designer • service provider
          </div>
          <div
            ref={text_2Ref}
            className="absolute left-[10%] top-60 text-[4vw] font-extrabold text-[#e6fcfb] overflow-hidden whitespace-nowrap"
          >
            frontend developer • web designer • service provider
          </div>
        </div>

        <div
          ref={imageRef}
          className="z-30 flex items-center justify-center w-1/2 h-[50vh] p-2"
        >
          <img
            className="w-full h-full object-contain"
            src="/hoss.svg"
            alt="Hossam Aboud"
          />
        </div>

        <div className="absolute top-1/2 left-0 w-[20vw] h-[20vh] md:translate-y-[-10%] translate-y-[-30%]">
          <svg
            ref={circleRef}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 800 800"
            className="w-full h-full"
          >
            <defs>
              <linearGradient
                id="ggglitch-grad"
                x1="50%"
                y1="0%"
                x2="50%"
                y2="100%"
              >
                <stop
                  offset="45%"
                  stopColor="hsl(184, 74%, 44%)"
                  stopOpacity="1"
                />
                <stop
                  offset="100%"
                  stopColor="hsl(332, 87%, 70%)"
                  stopOpacity="1"
                />
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
              <circle
                r="364"
                cx="400"
                cy="400"
                opacity="0.35"
                clipPath='url("#clipPath1")'
              />
              <circle
                r="270.5"
                cx="400"
                cy="400"
                opacity="0.35"
                clipPath='url("#clipPath1")'
              />
              <circle
                r="177"
                cx="400"
                cy="400"
                opacity="0.35"
                clipPath='url("#clipPath1")'
              />
              <circle
                r="83.5"
                cx="400"
                cy="400"
                opacity="0.35"
                clipPath='url("#clipPath1")'
              />
              <circle r="366" cx="400" cy="400" clipPath='url("#clipPath2")' />
              <circle
                r="272.5"
                cx="400"
                cy="400"
                clipPath='url("#clipPath2")'
              />
              <circle r="179" cx="400" cy="400" clipPath='url("#clipPath2")' />
              <circle r="85.5" cx="400" cy="400" clipPath='url("#clipPath2")' />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CurtainEffect;
