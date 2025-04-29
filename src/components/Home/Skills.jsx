import { useEffect, useRef } from 'react';
import AnimatedText from '../Utils/AnimatedText';
import Circle from '../Utils/Circle';
import { gsap } from '../../gsap-config';

const Skills = () => {
  const containerRef = useRef(null);
  const rightRef = useRef(null);
  const textContainerRef = useRef(null);
  const textRef = useRef(null);
  const subtitleRefs = useRef([]);
  const divRef = useRef([]);
  const svgRef = useRef([]);

  // Initialize subtitle refs array
  subtitleRefs.current = [];

  const addToRefs = (el) => {
    if (el && !subtitleRefs.current.includes(el)) {
      subtitleRefs.current.push(el);
    }
  };

  const AnimationFrom = {
    x: 0,
    width: '40px',
    height: '40px',
    backgroundColor: '#397adc ',
  };

  const AnimationTo = {
    x: 115,
    duration: 2,
    ease: 'sine.inOut',
    backgroundColor: '#99b5e0',
    yoyo: true,
    repeat: -1,
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main pinning timeline
      const tl_pin = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom 70%',
          scrub: 1,
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
          markers: false,
        },
      });

      // Rotation animation
      tl_pin.fromTo(
        textContainerRef.current,
        { rotation: 0 },
        {
          rotation: 360,
          duration: 2,
          ease: 'power2.inOut',
        }
      );

      // Text animation
      const tl_text = gsap.timeline({
        scrollTrigger: {
          trigger: rightRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
        },
      });
      const elements = gsap.utils.toArray(divRef.current);

      elements.forEach((el, i) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1,
            markers: false,
          },
        });

        // Entrance animation
        tl.fromTo(
          el,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 }
        );

        // Exit animation
        tl.to(el, { y: -50, opacity: 0, duration: 0.6 }, '+=0.3');
      });
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1,
          },
        }
      );

      // Subtitles animations
      subtitleRefs.current.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: i * 0.3,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              end: 'bottom 10%',
              scrub: 1,
            },
          }
        );
      });

      // SVG hover effects
      svgRef.current.forEach((el) => {
        gsap.to(el, {
          scale: 1.1,
          duration: 0.3,
          ease: 'power2.out',
          paused: true,
          overwrite: 'auto',
          onMouseEnter: () => gsap.to(el, { scale: 1.1 }),
          onMouseLeave: () => gsap.to(el, { scale: 1 }),
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);
  return (
    <div className="relative  h-[200vh] w-full bg-[#090f18] flex p-10  items-center">
      <div
        ref={containerRef}
        className="w-1/2 h-screen sticky top-20 flex flex-col "
      >
        <div className="flex items-center relative text-[#ebeff6] text-[2rem] md:text-[3rem]">
          <AnimatedText
            ref={textRef}
            text="Skills"
            className="z-20 tracking-[0.8rem] whitespace-nowrap"
          />
          <Circle
            style={'z-10 absolute  bg-[#214d8e] rounded-[50%] h-[7vh] w-[7vh]'}
            AnimationFrom={AnimationFrom}
            AnimationTo={AnimationTo}
          />
        </div>
        <svg
          ref={textContainerRef}
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 "
          fill="#ebeff6"
        >
          <title>MediaMarkt</title>
          <path d="M19.829 22.075c-.064.192 2.63-2.76 2.63-2.76-.256-2.759-1.54-5.775-1.54-5.775-2.117-4.428-6.801-5.904-9.56-3.53-.129.065-.322.129-.45.193 2.118-2.952 6.93-2.695 10.075.963 0 0 1.412 1.732 2.438 4.363.257-.898.45-1.86.514-2.823-1.669-2.31-3.594-3.658-3.594-3.658-3.978-2.695-8.663-1.732-9.946 1.604-.129.193-.257.385-.321.578.385-3.594 4.684-5.84 9.176-4.3 0 0 2.182.835 4.428 2.631 0-.128-.064-.256-.128-.449-.257-.962-.578-1.86-1.027-2.695-2.567-1.155-4.877-1.347-4.877-1.347-4.877-.321-8.535 3.08-7.765 6.802v.513c-1.668-3.337.963-7.636 5.776-8.535 0 0 2.246-.385 5.005 0a11.844 11.844 0 0 0-2.374-1.989c-2.76.32-4.813 1.283-4.813 1.283-4.428 2.182-5.84 7.06-3.401 9.819.064.192.192.32.32.449-3.08-2.054-2.887-7.123.77-10.396 0 0 1.733-1.476 4.3-2.503C14.375.193 13.283 0 12.193 0 10.01 1.668 8.79 3.465 8.79 3.465c-2.759 4.171-1.604 9.113 1.99 10.268h.064c.128.064.192.128.32.192-3.657-.192-6.031-4.684-4.427-9.369 0 0 .77-2.053 2.374-4.171-.962.257-1.796.578-2.63 1.09-1.027 2.568-1.284 4.75-1.284 4.75-.321 4.94 3.016 8.599 6.61 7.893H12c.128 0 .257 0 .385-.065-3.273 1.669-7.444-1.026-8.406-5.903 0 0-.385-2.182 0-4.941-.77.77-1.476 1.604-2.054 2.63.321 2.696 1.284 4.685 1.284 4.685 2.181 4.492 6.994 5.968 9.754 3.401l.064-.064c.128-.064.256-.128.32-.257-1.989 3.145-6.994 3.016-10.203-.77 0 0-1.604-2.117-2.438-4.556 0-.064-.642 3.209-.642 3.209 1.604 1.925 3.658 3.529 3.658 3.529 3.979 2.695 8.663 1.668 9.946-1.668a1.39 1.39 0 0 0 .321-.514c-.385 3.594-4.684 5.84-9.176 4.236 0 0-1.99-.77-4.107-2.439 0 .064.064.193.064.257a15.14 15.14 0 0 0 1.091 2.823c2.438 1.027 4.62 1.22 4.62 1.22 4.877.32 8.47-3.08 7.765-6.674v-.514c1.54 3.337-1.09 7.508-5.84 8.47 0 0-2.117.386-4.748 0a11.229 11.229 0 0 0 2.117 1.798c2.76-.321 4.813-1.284 4.813-1.284 4.3-2.117 5.776-6.802 3.53-9.625-.065-.193-.193-.385-.321-.578 2.952 2.118 2.76 7.059-.899 10.267 0 0-1.796 1.476-4.427 2.567 1.026.321 2.117.578 3.208.642 2.246-1.733 3.594-3.658 3.594-3.658 2.76-4.17 1.604-9.112-1.925-10.267a1.04 1.04 0 0 0-.45-.257c3.722.193 6.032 4.685 4.428 9.37 0 0-.77 2.245-2.567 4.491.129 0 .257-.064.45-.128a17.58 17.58 0 0 0 2.566-.963c1.091-2.63 1.284-4.94 1.284-4.94.32-4.878-2.888-8.472-6.417-7.958-.129 0-.321-.064-.45-.064h-.128c3.273-1.412 7.316 1.219 8.214 5.968 0 0 .578 2.246.128 4.94-.064.386-.256.963-.577 1.54z" />
        </svg>
      </div>
      <div
        ref={rightRef}
        className="flex flex-col items-center justify-center w-1/2 h-auto"
      >
        <div
          ref={(e) => divRef.current.push(e)}
          className="flex flex-col items-center justify-center gap-7 w-full h-[40%] md:h-[20%]"
        >
          <div className="flex md:flex-row flex-col gap-4 justify-around w-full items-center">
            <h1 className="text-3xl text-[#b1c4ab] ">html </h1>
            <svg
              ref={(el) => svgRef.current.push(el)}
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="w-24 h-24"
              fill="#e34f26"
            >
              <title>HTML5</title>
              <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" />
            </svg>
          </div>
          <AnimatedText
            ref={addToRefs}
            text="Building flexible web page structures using HTML5."
            className="text-xl md:whitespace-nowrap "
          />
        </div>
        <div
          ref={(e) => divRef.current.push(e)}
          className="flex flex-col items-center justify-center gap-7 w-full h-[40%] md:h-[20%]"
        >
          <div className="flex md:flex-row flex-col gap-4 justify-around w-full items-center">
            <h1 className="text-3xl text-[#b1c4ab] ">css </h1>
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="w-24 h-24"
              fill="#2965f1"
              ref={(el) => svgRef.current.push(el)}
            >
              <title>CSS3</title>
              <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z" />
            </svg>
          </div>
          <AnimatedText
            ref={addToRefs}
            text="Designing responsive and elegant interfaces with CSS3."
            className="text-xl md:whitespace-nowrap "
          />
        </div>
        <div
          ref={(e) => divRef.current.push(e)}
          className="flex flex-col items-center justify-center gap-7 w-full h-[40%] md:h-[20%]"
        >
          <div className="flex md:flex-row flex-col gap-4 justify-around w-full items-center">
            <h1 className="text-3xl text-[#b1c4ab] ">css </h1>
            <svg
              ref={(el) => svgRef.current.push(el)}
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="w-24 h-24"
              fill="#2965f1"
            >
              <title>Bootstrap</title>
              <path d="M11.77 11.24H9.956V8.202h2.152c1.17 0 1.834.522 1.834 1.466 0 1.008-.773 1.572-2.174 1.572zm.324 1.206H9.957v3.348h2.231c1.459 0 2.232-.585 2.232-1.685s-.795-1.663-2.326-1.663zM24 11.39v1.218c-1.128.108-1.817.944-2.226 2.268-.407 1.319-.463 2.937-.42 4.186.045 1.3-.968 2.5-2.337 2.5H4.985c-1.37 0-2.383-1.2-2.337-2.5.043-1.249-.013-2.867-.42-4.186-.41-1.324-1.1-2.16-2.228-2.268V11.39c1.128-.108 1.819-.944 2.227-2.268.408-1.319.464-2.937.42-4.186-.045-1.3.968-2.5 2.338-2.5h14.032c1.37 0 2.382 1.2 2.337 2.5-.043 1.249.013 2.867.42 4.186.409 1.324 1.098 2.16 2.226 2.268zm-7.927 2.817c0-1.354-.953-2.333-2.368-2.488v-.057c1.04-.169 1.856-1.135 1.856-2.213 0-1.537-1.213-2.538-3.062-2.538h-4.16v10.172h4.181c2.218 0 3.553-1.086 3.553-2.876z" />
            </svg>
          </div>
          <AnimatedText
            ref={addToRefs}
            text="Quickly creating responsive websites with Bootstrap."
            className="text-xl md:whitespace-nowrap "
          />
        </div>
        <div
          ref={(e) => divRef.current.push(e)}
          className="flex flex-col items-center justify-center gap-7 w-full h-[40%] md:h-[20%]"
        >
          <div className="flex md:flex-row flex-col gap-4 justify-around w-full items-center">
            <h1 className="text-3xl text-[#b1c4ab] ">css </h1>
            <svg
              ref={(el) => svgRef.current.push(el)}
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="w-24 h-24"
              fill="#f0db4f"
            >
              <title>JavaScript</title>
              <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
            </svg>
          </div>
          <AnimatedText
            ref={addToRefs}
            text="Designing responsive and elegant interfaces with CSS3."
            className="text-xl md:whitespace-nowrap "
          />
        </div>
      </div>
    </div>
  );
};
export default Skills;
