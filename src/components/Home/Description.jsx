import { gsap } from '../../gsap-config';
import { useEffect, useRef } from 'react';
import { SiAntdesign } from 'react-icons/si';
import { MdOutlineCodeOff } from 'react-icons/md';
import { AiFillOpenAI } from 'react-icons/ai';
import { FaExpandArrowsAlt } from 'react-icons/fa';
import useLenis from '../../hooks/useLenis';
import CustomButton from '../Utils/CustomButton';

const Description = () => {
  const lenis = useLenis();
  const designRef = useRef(null);
  const designRef_1 = useRef(null);
  const designRef_2 = useRef(null);
  const designRef_3 = useRef(null);
  const designRef_4 = useRef(null);
  const designRef_5 = useRef(null);

  useEffect(() => {
    lenis.current?.stop();
    const mm = gsap.matchMedia();
    if (designRef.current) {
      // Desktop animations
      mm.add('(min-width: 768px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: designRef.current,
            start: 'top top',
            end: '+=1000',
            scrub: true,
            pin: true,
            pinSpacing: true,
            markers: false,
            onEnter: () => lenis.current?.stop(),
            onLeaveBack: () => lenis.current?.start(),
            onRefresh: () => setTimeout(() => lenis.current?.start(), 300),
          },
        });

        const animateBox = (ref) => {
          const heading = ref.querySelector(' h3');
          tl.to(ref, {
            width: '15vw',
            duration: 1,

            border: '1px solid #981943',
            borderRadius: '10px 0 0 10px',
            ease: 'power4.Out',
          }).to(
            [heading],
            {
              opacity: 0,
              duration: 0.6,
              ease: 'expo.out',
            },
            '>'
          );
        };

        animateBox(designRef_1.current);
        animateBox(designRef_2.current);
        animateBox(designRef_3.current);
        animateBox(designRef_4.current);
      });

      // Mobile animations
      mm.add('(max-width: 767px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: designRef.current,
            start: '11% top',
            end: '+=1100',
            markers: false,
            scrub: 1,
            pin: true,
            pinSpacing: false,
            onEnter: () => lenis.current?.stop(),
            onLeaveBack: () => lenis.current?.start(),
            onRefresh: () => setTimeout(() => lenis.current?.start(), 300),
          },
        });

        const animateBox = (ref) => {
          const heading = ref.querySelector('h3');
          tl.to(ref, {
            height: '12vh',
            border: '1px solid #981943',
            borderRadius: '0 0 10px 10px',
            duration: 1.2,
            ease: 'power1.Out',
          }).to(
            [heading],
            {
              opacity: 0,
              duration: 0.6,
              ease: 'expo.out',
            },
            '<'
          );
        };

        animateBox(designRef_1.current);
        animateBox(designRef_2.current);
        animateBox(designRef_3.current);
        animateBox(designRef_4.current);
      });
    }

    return () => mm.revert();
  }, []);

  return (
    <div ref={designRef} className="bg-[#041218]">
      <div className="flex flex-col  items-center sm:items-start gap-4 p-10">
        <h1 className="text-3xl text-[#7ec2ea] font-extrabold uppercase border-b-2 border-[#981943]">
          process
        </h1>
        <p className="text-lg font-roboto text-[#e2f3fa]">
          We are combining our love of well-designed websites with our marketing
          knowledge to help you thrive.
        </p>
      </div>
      <div className="flex md:w-[200vw] flex-col md:flex-row overflow-hidden p-10 ">
        <div
          ref={designRef_1}
          className=" h-[60vh]   md:w-[40vw] flex z-10 overflow-hidden  flex-col relative border-[1px]"
        >
          <div className="flex mt-4 justify-between md:w-[40vw] ">
            <div className="flex flex-col px-5 gap-4">
              <p className="text-3xl font-roboto uppercase border-b-2 border-[#981943]">
                design
              </p>
              <SiAntdesign className="text-[#981943] text-4xl  md:text-7xl" />
            </div>
            <div className="px-4 flex items-center justify-center">
              <h1 className="uppercase text-[#7ec2ea] font-extrabold text-4xl  md:text-7xl">
                des
              </h1>
            </div>
          </div>
          <div className="absolute bottom-10 left-2 w-[60%]">
            <h3 className="text-[#7ec2ea] uppercase text-[1.5vw] font-roboto">
              Unique, thoughtfully designed interfaces to reinforce your
              business authority.
            </h3>
          </div>
        </div>
        <div
          ref={designRef_2}
          className="h-[60vh]  md:w-[40vw] flex z-20 overflow-hidden flex-col relative border-[1px]"
        >
          <div className="flex mt-4 justify-between md:w-[40vw]">
            <div className="flex flex-col px-5 gap-4">
              <p className="text-3xl font-roboto uppercase border-b-2 border-[#D44638]">
                develop
              </p>
              <MdOutlineCodeOff className="text-[#D44638] text-4xl  md:text-7xl" />
            </div>
            <div className="px-4 flex items-center justify-center">
              <h1 className="uppercase text-[#7ec2ea] font-extrabold text-4xl  md:text-7xl">
                dev
              </h1>
            </div>
          </div>
          <div className="absolute bottom-10 left-2 w-[60%]">
            <h3 className="text-[#7ec2ea] uppercase text-[1.5vw] font-roboto">
              User-friendly back offices to make content management a breeze.
            </h3>
          </div>
        </div>
        <div
          ref={designRef_3}
          className="h-[60vh]  md:w-[40vw] flex overflow-hidden  z-30 flex-col relative border-[1px]"
        >
          <div className="flex  mt-4 justify-between md:w-[40vw]">
            <div className="flex flex-col px-5 gap-4">
              <p className="text-3xl font-roboto uppercase border-b-2 border-[#D44638]">
                Engage
              </p>
              <AiFillOpenAI className="text-[#D44638] text-4xl  md:text-7xl" />
            </div>
            <div className="px-4 flex items-center justify-center">
              <h1 className="uppercase text-[#7ec2ea] font-extrabold text-4xl  md:text-7xl">
                ENG
              </h1>
            </div>
          </div>
          <div className="absolute bottom-10 left-2 w-[60%]">
            <h3 className="text-[#7ec2ea] uppercase text-[1.5vw] font-roboto">
              Engaging user experiences that turn visitors into customers.
            </h3>
          </div>
        </div>
        <div
          ref={designRef_4}
          className="h-[60vh]   md:w-[40vw] overflow-hidden flex z-40 flex-col relative border-[1px]"
        >
          <div className="flex mt-4 justify-between md:w-[40vw]">
            <div className="flex flex-col px-5 gap-4">
              <p className="text-3xl font-roboto uppercase border-b-2 border-[#D44638]">
                Expand
              </p>
              <FaExpandArrowsAlt className="text-[#D44638] text-4xl  md:text-7xl" />
            </div>
            <div className="px-4 flex items-center justify-center">
              <h1 className="uppercase text-[#7ec2ea] font-extrabold text-4xl  md:text-7xl">
                EXP
              </h1>
            </div>
          </div>
          <div className="absolute bottom-10 left-2 w-[60%]">
            <h3 className="text-[#7ec2ea] uppercase text-[1.5vw] font-roboto">
              Scalable websites designed to expand with your business.
            </h3>
          </div>
        </div>
        <div
          ref={designRef_5}
          className="h-[60vh]  border-[#981943] md:w-[35vw] z-50 flex flex-col relative mt-10 md:mt-0  md:border-[1px]"
        >
          <div className=" border-b-[3px]  border-[#981943] flex ">
            <h1 className="uppercase font-extrabold  text-[6vw]">Ready?</h1>
          </div>
          <div className="absolute bottom-10 right-2 w-[60%]">
            <p className="text-[#7ec2ea] uppercase text-sm font-roboto">
              Code. Create. Conquer. With us, no regrets.
            </p>
            <div className="flex items-center justify-center mt-10 gap-4">
              <CustomButton text="Contact" overlyText="Contact" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Description;
