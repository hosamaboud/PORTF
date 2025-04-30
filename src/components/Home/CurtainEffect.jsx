import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../gsap-config';

const CurtainEffect = () => {
  const containerTextRef = useRef(null);
  const text_1Ref = useRef(null);
  const text_2Ref = useRef(null);
  const circleRf = useRef(null);
  const svgRef = useRef(null);
  const imageRef = useRef(null);
  useEffect(() => {
    const xValue = window.innerWidth > 600 ? 600 : '300%';
    const containerText = containerTextRef.current;
    const text_1 = text_1Ref.current;
    const text_2 = text_2Ref.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: svgRef.current,
        start: 'top 80%',
        end: '+=100',
        scrub: 1.5,
        markers: false,
      },
    });

    tl.to(svgRef.current.querySelector('path'), {
      attr: {
        d: 'M0 2S175 1 500 1s500 1 500 1V0H0Z',
      },
      duration: 3,
      ease: 'power2.out',
    });

    const tl_2 = gsap.timeline({
      scrollTrigger: {
        trigger: containerText,
        start: 'top top',
        end: '+=300',
        scrub: 2,
        pin: true,
        pinSpacing: false,
        markers: false,
      },
    });

    tl_2
      .fromTo(
        text_1,
        { width: '0%' },
        {
          width: '100%',
          ease: 'power2.inOut',
          duration: 1.5,
        },
        0
      )
      .fromTo(
        text_2,
        { width: '0%' },
        {
          width: '100%',
          ease: 'power2.inOut',
          duration: 1.5,
        },
        '-=1'
      )
      .fromTo(
        circleRf.current,
        {
          opacity: 0,
          scale: 0.8,
          x: -100,
        },
        {
          opacity: 1,
          scale: 1,
          x: xValue,
          rotate: 360,
          ease: 'expo.out',
          duration: 2,
        },
        '-=1.2'
      )
      .fromTo(
        imageRef.current,
        {
          x: 150,
          opacity: 0,
          scale: 0.95,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          ease: 'power2.out',
          duration: 1.5,
        },
        '-=1.5'
      );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className=" flex flex-col  overflow-hidden relative h-[160vh] w-full bg-[#031a1a] ">
      <svg
        className="absolute w-full h-[40vh] bg-transparent"
        ref={svgRef}
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <path
          fill="#e6fcfb"
          d="M0 502S175 272 500 272s500 230 500 230V0H0Z"
        ></path>
      </svg>

      <div
        ref={containerTextRef}
        className="w-full  px-5 h-[100vh] flex-col md:flex-row flex justify-center items-center "
      >
        <div className="w-full md:w-[70%] h-full relative">
          {/* النص الأول */}
          <div className="flex items-center gap-5 text-[#7df0e4] text-[3vw] w-full font-extrabold text-nowrap opacity-[0.5] absolute left-[10%] top-40 uppercase">
            hi there i'm hossam aboud.
          </div>
          <div
            ref={text_1Ref}
            className="flex items-center gap-5 text-[#7df0e4] text-[3vw] font-extrabold overflow-hidden text-nowrap absolute left-[10%] top-40 uppercase"
          >
            hi there i'm hossam aboud.
          </div>
          {/* النص الثاني */}
          <div className="text-[#e6fcfb] text-[3vw] w-full font-extrabold text-nowrap opacity-[0.5] absolute left-[10%] top-60">
            frontend developer • web designer • service provider
          </div>
          <div
            ref={text_2Ref}
            className="text-[#e6fcfb] text-[3vw] font-extrabold  overflow-hidden text-nowrap absolute left-[10%] top-60"
          >
            frontend developer • web designer • service provider
          </div>
        </div>

        <div
          ref={imageRef}
          className="z-20 p-2 flex items-center justify-center w-full md:w-[30%]  h-[40vh] md:h-[80vh]"
        >
          <img className="w-full h-full" src="/hoss.svg" alt=" logo" />
        </div>

        {/* SVG Circle */}
        <div className="absolute top-1/2 md:translate-y-[-10%] translate-y-[-30%] left-0 h-[20vh] w-[20vw]">
          <svg
            ref={circleRf}
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 800 800"
            opacity="1"
            className="w-full h-full"
          >
            <defs>
              <linearGradient
                x1="50%"
                y1="0%"
                x2="50%"
                y2="100%"
                id="ggglitch-grad"
              >
                <stop
                  stopColor="hsl(184, 74%, 44%)"
                  stopOpacity="1"
                  offset="45%"
                ></stop>
                <stop
                  stopColor="hsl(332, 87%, 70%)"
                  stopOpacity="1"
                  offset="100%"
                ></stop>
              </linearGradient>
              <clipPath id="SvgjsClipPath4220">
                <rect
                  width="133.33333333333334"
                  height="800"
                  x="0"
                  y="0"
                ></rect>
                <rect
                  width="133.33333333333334"
                  height="800"
                  x="266.6666666666667"
                  y="0"
                ></rect>
                <rect
                  width="133.33333333333334"
                  height="800"
                  x="533.3333333333334"
                  y="0"
                ></rect>
                <rect
                  width="133.33333333333334"
                  height="800"
                  x="800"
                  y="0"
                ></rect>
                <rect
                  width="133.33333333333334"
                  height="800"
                  x="1066.6666666666667"
                  y="0"
                ></rect>
                <rect
                  width="133.33333333333334"
                  height="800"
                  x="1333.3333333333335"
                  y="0"
                ></rect>
                <rect
                  width="133.33333333333334"
                  height="800"
                  x="1600"
                  y="0"
                ></rect>
              </clipPath>
              <clipPath id="SvgjsClipPath4221">
                <rect
                  width="133.33333333333334"
                  height="800"
                  x="133.33333333333334"
                  y="0"
                ></rect>
                <rect
                  width="133.33333333333334"
                  height="800"
                  x="400"
                  y="0"
                ></rect>
                <rect
                  width="133.33333333333334"
                  height="800"
                  x="666.6666666666666"
                  y="0"
                ></rect>
                <rect
                  width="133.33333333333334"
                  height="800"
                  x="933.3333333333334"
                  y="0"
                ></rect>
                <rect
                  width="133.33333333333334"
                  height="800"
                  x="1200.0000000000002"
                  y="0"
                ></rect>
                <rect
                  width="133.33333333333334"
                  height="800"
                  x="1466.6666666666667"
                  y="0"
                ></rect>
              </clipPath>
            </defs>
            <g strokeWidth="68" stroke="url(#ggglitch-grad)" fill="none">
              <circle
                r="364"
                cx="400"
                cy="400"
                fill="none"
                opacity="0.35"
                clipPath='url("#SvgjsClipPath4220")'
              ></circle>
              <circle
                r="270.5"
                cx="400"
                cy="400"
                fill="none"
                opacity="0.35"
                clipPath='url("#SvgjsClipPath4220")'
              ></circle>
              <circle
                r="177"
                cx="400"
                cy="400"
                fill="none"
                opacity="0.35"
                clipPath='url("#SvgjsClipPath4220")'
              ></circle>
              <circle
                r="83.5"
                cx="400"
                cy="400"
                fill="none"
                opacity="0.35"
                clipPath='url("#SvgjsClipPath4220")'
              ></circle>
              <circle
                r="366"
                cx="400"
                cy="400"
                fill="none"
                clipPath='url("#SvgjsClipPath4221")'
              ></circle>
              <circle
                r="272.5"
                cx="400"
                cy="400"
                fill="none"
                clipPath='url("#SvgjsClipPath4221")'
              ></circle>
              <circle
                r="179"
                cx="400"
                cy="400"
                fill="none"
                clipPath='url("#SvgjsClipPath4221")'
              ></circle>
              <circle
                r="85.5"
                cx="400"
                cy="400"
                fill="none"
                clipPath='url("#SvgjsClipPath4221")'
              ></circle>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CurtainEffect;
