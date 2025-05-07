import { Github, Instagram, Linkedin } from 'lucide-react';
import CustomButton from '../CustomButton';
import ScrollingText from '../ScrollingText';
import AnimatedText from '../AnimatedText';
import { gsap } from '../../../gsap-config';
import { useRef, useCallback, useMemo } from 'react';

const Footer = () => {
  const textRef = useRef(null);
  const prevTextRef = useRef(null);
  const textBtnRef_1 = useRef(null);
  const dotRef_1 = useRef(null);
  const textBtnRef_2 = useRef(null);
  const dotRef_2 = useRef(null);
  const textBtnRef_3 = useRef(null);
  const dotRef_3 = useRef(null);

  // Memoize GSAP timeline creation
  const createTimeline = useCallback(
    () =>
      gsap.timeline({
        defaults: { duration: 0.8, ease: 'expo.out' },
      }),
    []
  );

  const handleMouseEnter = useCallback(
    (ref, dotRef) => {
      const tl = createTimeline();

      tl.add(
        [
          gsap.to(ref.current, {
            x: 5,
          }),
          gsap.fromTo(
            dotRef.current,
            {
              scale: 0,
              x: 25,
              opacity: 0,
            },
            {
              scale: 1,
              x: 0,
              opacity: 1,
            }
          ),
        ],
        '<'
      ).fromTo(
        dotRef.current,
        { opacity: 0 },
        {
          delay: 0.5,
          opacity: 1,
          duration: 0.5,
          yoyo: true,
          repeat: -1,
        }
      );
    },
    [createTimeline]
  );

  const handleMouseLeave = useCallback(
    (ref, dotRef) => {
      const tl = createTimeline();

      tl.add(
        [
          gsap.to(dotRef.current, {
            scale: 0,
            opacity: 0,
          }),
          gsap.to(ref.current, {
            x: 0,
          }),
        ],
        '<'
      );
    },
    [createTimeline]
  );

  const onEnter = useCallback(() => {
    const tl = createTimeline();

    tl.add(
      [
        gsap.to(textRef.current, {
          y: '-100%',
          stagger: 0.01,
        }),
        gsap.to(prevTextRef.current, {
          y: '-100%',
          stagger: 0.01,
        }),
      ],
      '<'
    );
  }, [createTimeline]);

  const onLeave = useCallback(() => {
    const tl = createTimeline();

    tl.add(
      [
        gsap.to(prevTextRef.current, {
          y: '0%',
          stagger: 0.01,
        }),
        gsap.to(textRef.current, {
          y: '0%',
          stagger: 0.01,
        }),
      ],
      '<'
    );
  }, [createTimeline]);

  const ButtonNav = useCallback(
    (text, ref, dotRef) => {
      return (
        <div
          className="flex  justify-center items-center md:gap-1 gap-0 group"
          onMouseEnter={() => handleMouseEnter(ref, dotRef)}
          onTouchStart={() => handleMouseEnter(ref, dotRef)}
          onMouseLeave={() => handleMouseLeave(ref, dotRef)}
          onTouchEnd={() => handleMouseLeave(ref, dotRef)}
        >
          <div
            ref={dotRef}
            className="w-[5px] md:w-[10px] mb-1 md:mb-2 h-[5px] md:h-[10px] bg-[#ff0000] opacity-0 transition-opacity duration-100 group-hover:opacity-100 will-change-[transform,opacity] rounded-full"
          ></div>

          <AnimatedText
            ref={ref}
            text={text}
            className="uppercase font-thunderLight text-[1rem] md:text-[2rem] text-gray-400 group-hover:text-white transition-colors will-change-transform"
          />
        </div>
      );
    },
    [handleMouseEnter, handleMouseLeave]
  );

  const socialButtons = useMemo(
    () => (
      <div className="col-span-2 flex items-center justify-around">
        <CustomButton
          text={<Instagram className="w-8 md:w-10 h-8 md:h-10" />}
          link="https://www.instagram.com/aboud.hossam/"
        />
        <CustomButton
          text={<Linkedin className="w-8 md:w-10 h-8 md:h-10" />}
          link="https://www.linkedin.com/in/hosam-aboud-904049174"
        />
        <CustomButton
          text={<Github className="w-8 md:w-10 h-8 md:h-10" />}
          link="https://github.com/hosamaboud"
        />
      </div>
    ),
    []
  );

  return (
    <div className="h-[60vh] bg-black mx-auto w-[95%] overflow-hidden flex flex-col">
      <div className="h-full w-full grid grid-cols-1 md:grid-cols-5">
        {socialButtons}
        <div className="col-span-3 w-[100%] flex flex-col items-center justify-around">
          <div className="grid place-items-center grid-cols-3 gap-x-5 md:gap-x-10 lg:gap-x-14">
            {ButtonNav('about', textBtnRef_1, dotRef_1)}
            {ButtonNav('projects', textBtnRef_2, dotRef_2)}
            {ButtonNav('contact', textBtnRef_3, dotRef_3)}
          </div>
          <div
            className="relative overflow-hidden md:h-[20vh] h-[5vh] w-[100%]"
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            onTouchStart={onEnter}
            onTouchEnd={onLeave}
            aria-label="Animated name and job title"
          >
            <AnimatedText
              ref={textRef}
              text="Hossam Aboud"
              className="absolute flex top-1/2 translate-y-[-50%] left-1/2 translate-x-[-50%] uppercase text-[#2A2929] text-[10vw] font-thunder will-change-transform"
            />
            <AnimatedText
              ref={prevTextRef}
              text="hossam aboud"
              className="absolute flex top-1/2 translate-y-[50%] left-1/2 translate-x-[-50%] uppercase text-red-500 text-[10vw] font-thunder will-change-transform"
            />
          </div>
        </div>
      </div>
      <ScrollingText
        text="Free Palestine - #EndOccupation - Justice For All"
        bgColor="#000"
        textColor="#A80038"
        iconColor="#FB9935"
        repeatCount={20}
        speed={10}
      />
    </div>
  );
};

export default Footer;
