import { gsap } from '../../gsap-config';
import { useEffect, useRef } from 'react';
import CustomButton from '../Utils/CustomButton';
import { BrainCircuit, CodeXml, Expand, LayoutDashboard } from 'lucide-react';

// كائن يحتوي على بيانات كل صندوق لتجنب التكرار
const BOX_DATA = [
  {
    id: 'design1',
    title: 'design',
    Icon: LayoutDashboard ,
    iconColor: '#981943',
    shortText: 'des',
    fullText:
      'Unique, thoughtfully designed interfaces to reinforce your business authority.',
  },
  {
    id: 'design2',
    title: 'develop',
    Icon: CodeXml,
    iconColor: '#D44638',
    shortText: 'dev',
    fullText: 'User-friendly back offices to make content management a breeze.',
  },
  {
    id: 'design3',
    title: 'engage',
    Icon: BrainCircuit ,
    iconColor: '#D44638',
    shortText: 'eng',
    fullText: 'Engaging user experiences that turn visitors into customers.',
  },
  {
    id: 'design4',
    title: 'expand',
    Icon: Expand,
    iconColor: '#D44638',
    shortText: 'exp',
    fullText: 'Scalable websites designed to expand with your business.',
  },
];

const Description = () => {
  const designRef = useRef(null);

  // إنشاء refs يدويًا بدلاً من استخدام useMemo
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
          start: 'top top',
          end: '+=1000',
          scrub: 2,
          pin: true,
          pinSpacing: true,
        },
      });

      BOX_DATA.forEach(({ id }) => {
        const ref = refs[id].current;
        if (!ref) return;

        const heading = ref.querySelector('h3');
        tl.to(ref, {
          width: '15vw',
          duration: 1,
          border: '1px solid #981943',
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
      });
    };

    const setupMobileAnimation = () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: designRef.current,
          start: '10% top',
          end: '+=700',
          scrub: 1,
          pin: true,
          pinSpacing: false,
        },
      });

      BOX_DATA.forEach(({ id }) => {
        const ref = refs[id].current;
        if (!ref) return;

        const heading = ref.querySelector('h3');
        tl.to(ref, {
          height: '12vh',
          border: '1px solid #981943',
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
      className="h-[40vh] md:h-[60vh] md:w-[40vw] flex flex-col relative overflow-hidden border z-10"
    >
      <div className="flex mt-4 justify-between md:w-[40vw] px-5">
        <div className="flex flex-col gap-4">
          <p
            className="text-3xl font-roboto uppercase border-b-2"
            style={{ borderColor: iconColor }}
          >
            {title}
          </p>
          <Icon className="w-20 h-20" style={{ color: iconColor }} />
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
    <section ref={designRef} className="bg-[#041218]">
      <div className="flex flex-col items-center sm:items-start gap-4 p-10">
        <h1 className="text-3xl text-[#7ec2ea] font-extrabold uppercase border-b-2 border-[#981943]">
          process
        </h1>
        <p className="text-lg font-roboto text-[#e2f3fa]">
          We are combining our love of well-designed websites with our marketing
          knowledge to help you thrive.
        </p>
      </div>

      <div className="flex h-[200vh] md:h-[100vh] md:w-[200vw] flex-col md:flex-row overflow-hidden p-2 md:p-10">
        {BOX_DATA.map((boxData) => renderBox(boxData))}

        {/* Final Box */}
        <div
          ref={refs.design5}
          className="h-[35vh] md:h-[60vh] md:w-[35vw] flex flex-col relative mt-10 md:mt-0 z-50"
        >
          <div className="border-b-[3px] border-[#981943] p-4  md:w-[90%]">
            <h1 className="uppercase font-extrabold text-[6vw]">Ready?</h1>
          </div>
          <div className="absolute bottom-0 w-full md:bottom-10 left-2 md:w-[60%]">
            <p className="text-[#7ec2ea] uppercase text-sm font-roboto">
              Code. Create. Conquer. With us, no regrets.
            </p>
            <div className="flex ml-auto w-[40%] items-center mt-10 ">
              <CustomButton text="Contact" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Description;
