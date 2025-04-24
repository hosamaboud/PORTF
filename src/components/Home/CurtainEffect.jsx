import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useLenis from '../../hooks/useLenis';

gsap.registerPlugin(ScrollTrigger);

const CurtainEffect = () => {
  const lenis = useLenis();
  const text_1Ref = useRef(null);
  const text_2Ref = useRef(null);
  const circleRf = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    const text_1 = text_1Ref.current;
    const text_2 = text_2Ref.current;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: svgRef.current,
        start: '10% 90%',
        end: '+=900',
        markers: false,
        scrub: 2,
        onEnter: () => lenis?.stop?.(),
        onLeaveBack: () => lenis?.start?.(),
        onRefresh: () => setTimeout(() => lenis?.start?.(), 300),
      },
    });

    tl.to(svgRef.current.querySelector('path'), {
      attr: {
        d: 'M0 2S175 1 500 1s500 1 500 1V0H0Z',
      },
      duration: 10,
      ease: 'power3.out',
    })
      .fromTo(
        text_1,
        { width: '0%' },
        {
          width: '100%',
          duration: 3,
          ease: 'sine.inOut',
        },
        '+=1'
      )
      .fromTo(
        text_2,
        { width: '0%' },
        {
          width: '100%',
          duration: 3,
          ease: 'sine.inOut',
        },
        '+=.5'
      )
      .fromTo(
        circleRf.current,
        { x: '0%', rotate: 0 },
        {
          x: '-300%',
          rotate: -360,
          duration: 20,
          ease: 'power4.inOut',
        },
        '+=.1'
      );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [lenis]);

  return (
    <div className="relative h-[110vh] w-full bg-[#031a1a] ">
      <svg
        className="absolute w-full h-full bg-transparent"
        ref={svgRef}
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <path
          fill="#e6fcfb"
          d="M0 502S175 272 500 272s500 230 500 230V0H0Z"
        ></path>
      </svg>

      <div className="w-full relative  h-[100vh] flex justify-center items-center overflow-hidden">
        <div className="w-full h-full relative">
          {/* النص الأول */}
          <div className="flex items-center gap-5 text-[#7df0e4] text-[3vw] w-full font-extrabold text-nowrap opacity-10 absolute left-[10%] top-40 uppercase">
            hi there i'm hossam aboud.
          </div>
          <div
            ref={text_1Ref}
            className="flex items-center gap-5 text-[#7df0e4] text-[3vw] font-extrabold overflow-hidden text-nowrap absolute left-[10%] top-40 uppercase"
          >
            hi there i'm hossam aboud.
          </div>
          {/* النص الثاني */}
          <div className="text-[#e6fcfb] text-[3vw] w-full font-extrabold text-nowrap opacity-10 absolute left-[10%] top-60">
            frontend developer • web designer • service provider
          </div>
          <div
            ref={text_2Ref}
            className="text-[#e6fcfb] text-[3vw] font-extrabold  overflow-hidden text-nowrap absolute left-[10%] top-60"
          >
            frontend developer • web designer • service provider
          </div>
        </div>

        {/* SVG Circle */}
        <div className="absolute  right-0 bottom-[20%]  md:bottom-[-1%] h-[30vh]  w-[30vw] pointer-events-none">
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
