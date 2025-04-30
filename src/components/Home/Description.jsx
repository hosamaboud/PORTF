import { gsap } from '../../gsap-config';
import { useEffect, useRef } from 'react';
import { SiAntdesign } from 'react-icons/si';
import { MdOutlineCodeOff } from 'react-icons/md';
import { AiFillOpenAI } from 'react-icons/ai';
import { FaExpandArrowsAlt } from 'react-icons/fa';
import CustomButton from '../Utils/CustomButton';

const Description = () => {
  const designRef = useRef(null);
  const refs = {
    design1: useRef(null),
    design2: useRef(null),
    design3: useRef(null),
    design4: useRef(null),
    design5: useRef(null),
  };

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: designRef.current,
          start: 'top top',
          end: '+=1000',
          scrub: true,
          pin: true,
          pinSpacing: true,
        },
      });

      const animateBox = (ref) => {
        const heading = ref.querySelector('h3');
        tl.to(ref, {
          width: '15vw',
          duration: 1,
          border: '1px solid #981943',
          borderRadius: '10px 0 0 10px',
          ease: 'power4.out',
        }).to(
          heading,
          {
            opacity: 0,
            duration: 0.6,
            ease: 'expo.out',
          },
          '>'
        );
      };

      animateBox(refs.design1.current);
      animateBox(refs.design2.current);
      animateBox(refs.design3.current);
      animateBox(refs.design4.current);
    });

    mm.add('(max-width: 767px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: designRef.current,
          start: '10% top',
          end: '+=700',
          scrub: 1,
          pin: true,
          pinSpacing: false,
          markers: true,
        },
      });

      const animateBox = (ref) => {
        const heading = ref.querySelector('h3');
        tl.to(ref, {
          height: '12vh',
          border: '1px solid #981943',
          borderRadius: '0 0 10px 10px',
          duration: 1.2,
          ease: 'power1.out',
        }).to(
          heading,
          {
            opacity: 0,
            duration: 0.6,
            ease: 'expo.out',
          },
          '<'
        );
      };

      animateBox(refs.design1.current);
      animateBox(refs.design2.current);
      animateBox(refs.design3.current);
      animateBox(refs.design4.current);
    });

    return () => mm.revert();
  }, []);

  const renderBox = (ref, title, Icon, iconColor, shortText, fullText) => (
    <div
      ref={ref}
      className="h-[40vh] md:h-[60vh] md:w-[40vw] flex flex-col relative overflow-hidden border z-10"
    >
      <div className="flex mt-4 justify-between md:w-[40vw] px-5">
        <div className="flex flex-col gap-4">
          <p
            className={`text-3xl font-roboto uppercase border-b-2`}
            style={{ borderColor: iconColor }}
          >
            {title}
          </p>
          <Icon
            className={`text-4xl md:text-7xl`}
            style={{ color: iconColor }}
          />
        </div>
        <div className="flex items-center justify-center px-4">
          <h1 className="uppercase text-[#7ec2ea] font-extrabold text-4xl md:text-7xl">
            {shortText}
          </h1>
        </div>
      </div>
      <div className="absolute bottom-0 left-2 w-full md:bottom-10 md:w-[60%]">
        <h3 className="text-[#7ec2ea] uppercase text-lg md:text-[1.5vw] font-roboto">
          {fullText}
        </h3>
      </div>
    </div>
  );

  return (
    <div ref={designRef} className="bg-[#041218]">
      <div className="flex flex-col items-center sm:items-start gap-4 p-10">
        <h1 className="text-3xl text-[#7ec2ea] font-extrabold uppercase border-b-2 border-[#981943]">
          process
        </h1>
        <p className="text-lg font-roboto text-[#e2f3fa]">
          We are combining our love of well-designed websites with our marketing
          knowledge to help you thrive.
        </p>
      </div>

      <div className="flex h-[205vh] md:h-[100vh] md:w-[200vw] flex-col md:flex-row overflow-hidden p-2 md:p-10">
        {renderBox(
          refs.design1,
          'design',
          SiAntdesign,
          '#981943',
          'des',
          'Unique, thoughtfully designed interfaces to reinforce your business authority.'
        )}
        {renderBox(
          refs.design2,
          'develop',
          MdOutlineCodeOff,
          '#D44638',
          'dev',
          'User-friendly back offices to make content management a breeze.'
        )}
        {renderBox(
          refs.design3,
          'engage',
          AiFillOpenAI,
          '#D44638',
          'eng',
          'Engaging user experiences that turn visitors into customers.'
        )}
        {renderBox(
          refs.design4,
          'expand',
          FaExpandArrowsAlt,
          '#D44638',
          'exp',
          'Scalable websites designed to expand with your business.'
        )}

        {/* Final Box */}
        <div
          ref={refs.design5}
          className="h-[35vh]  md:h-[60vh] md:w-[35vw] flex flex-col relative mt-10 md:mt-0  z-50"
        >
          <div className="border-b-[3px] border-[#981943] p-4">
            <h1 className="uppercase font-extrabold text-[6vw]">Ready?</h1>
          </div>
          <div className="absolute bottom-0 w-full md:bottom-10 left-2 md:w-[60%]">
            <p className="text-[#7ec2ea] uppercase text-sm font-roboto">
              Code. Create. Conquer. With us, no regrets.
            </p>
            <div className="flex items-center mt-10 gap-4">
              <CustomButton text="Contact" overlyText="Contact" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
