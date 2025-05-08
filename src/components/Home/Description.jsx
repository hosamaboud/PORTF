import { gsap } from '../../gsap-config';
import { useEffect, useRef } from 'react';
import CustomButton from '../Utils/CustomButton';
import { BrainCircuit, CodeXml, Expand, LayoutDashboard } from 'lucide-react';

const BOX_DATA = [
  {
    id: 'design1',
    title: 'design',
    Icon: LayoutDashboard,
    iconColor: '#BE3144',
    shortText: 'des',
    fullText:
      'Unique, thoughtfully designed interfaces to reinforce your business authority.',
  },
  {
    id: 'design2',
    title: 'develop',
    Icon: CodeXml,
    iconColor: '#BE3144',
    shortText: 'dev',
    fullText: 'User-friendly back offices to make content management a breeze.',
  },
  {
    id: 'design3',
    title: 'engage',
    Icon: BrainCircuit,
    iconColor: '#BE3144',
    shortText: 'eng',
    fullText: 'Engaging user experiences that turn visitors into customers.',
  },
  {
    id: 'design4',
    title: 'expand',
    Icon: Expand,
    iconColor: '#BE3144',
    shortText: 'exp',
    fullText: 'Scalable websites designed to expand with your business.',
  },
];

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

    const setupDesktopAnimation = () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: designRef.current,
          start: '2% top',
          end: '+=1100',
          scrub: 2,
          pin: true,
          pinSpacing: true,
        },
      });

      BOX_DATA.forEach(({ id }) => {
        const ref = refs[id].current;
        if (!ref) return;

        const description = ref.querySelector('.description-text');
        tl.to(ref, {
          delay: 0.1,
          width: '15vw',
          duration: 1,
          ease: 'power4.out',
        }).to(
          description,
          {
            opacity: 0,
            duration: 0.6,
            ease: 'expo.out',
          },
          '-=1'
        );
      });
    };

    const setupMobileAnimation = () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: designRef.current,
          start: '10% top',
          end: '+=800',
          scrub: 1,
          pin: true,
          pinSpacing: false,
        },
      });

      BOX_DATA.forEach(({ id }) => {
        const ref = refs[id].current;
        if (!ref) return;

        const description = ref.querySelector('.description-text');
        tl.to(ref, {
          height: '12vh',
          border: '1px solid #981943',
          duration: 1.2,
          ease: 'power1.out',
        }).to(
          description,
          {
            opacity: 0,
            duration: 0.6,
            ease: 'expo.out',
          },
          '<'
        );
      });
    };

    mm.add('(min-width: 768px)', setupDesktopAnimation);
    mm.add('(max-width: 767px)', setupMobileAnimation);

    return () => mm.revert();
  }, [refs]);

  const renderBox = ({ id, title, Icon, iconColor, shortText, fullText }) => (
    <div
      ref={refs[id]}
      key={id}
      className="h-[40vh] md:h-[55vh] justify-between  flex flex-col relative overflow-hidden border border-[#FF0000] z-10"
    >
      <div className="flex mt-4 justify-between md:w-[40vw] px-5">
        <div className="flex flex-col gap-4">
          <h2
            className="text-[6vw] md:text-[4vw] font-thunder uppercase border-b-2"
            style={{ borderColor: iconColor }}
          >
            {title}
          </h2>
          <Icon className="w-20 h-20" style={{ color: iconColor }} />
        </div>
        <div className="flex items-center justify-center px-4">
          <span className="text-[#FF0000] uppercase font-thunder text-4xl md:text-7xl">
            {shortText}
          </span>
        </div>
      </div>
      <div className="py-5 px-5 w-full">
        <p className="uppercase text-lg md:text-[1.5vw] description-text">
          {fullText}
        </p>
      </div>
    </div>
  );

  return (
    <section ref={designRef} className="bg-black">
      <div className="flex flex-col items-center sm:items-start gap-4 p-10">
        <h1 className="text-[6vw] text-[#e0dafb] font-thunder border-b-2 border-[#981943]">
          process
        </h1>
        <p className="text-xl font-bebas ">
          We are combining our love of well-designed websites with our marketing
          knowledge to help you thrive.
        </p>
      </div>

      <div className="flex h-[200vh] md:h-[100vh] md:w-[220vw] flex-col md:flex-row overflow-hidden p-2 md:p-10">
        {BOX_DATA.map((boxData) => renderBox(boxData))}

        {/* Final Box */}
        <div
          ref={refs.design5}
          className="h-[35vh] md:h-[50vh] md:w-[35vw] flex flex-col relative mt-10 md:mt-0 z-50"
        >
          <div className="border-b-[3px] border-[#981943] p-4  md:w-[90%]">
            <h2 className="uppercase font-extrabold text-[6vw]">Ready?</h2>
          </div>
          <div className=" w-full h-full flex flex-col items-center justify-around md:justify-between  ">
            <p className="uppercase text-[4vw] md:text-[2vw] font-bebas">
              Code. Create. Conquer. With us, no regrets.
            </p>
            <CustomButton text="Contact" link="/contact" ariaLabel="Contact" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Description;
