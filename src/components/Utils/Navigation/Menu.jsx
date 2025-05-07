import { gsap } from '../../../gsap-config';
import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import nameSvg from '../../../assets/name.png';
import hossam from '../../../assets/hossam.jpg';
import { ArrowUpRight } from 'lucide-react';

const MENU_ITEMS = [
  { id: 1, name: 'Cv', link: 'cv' },
  { id: 2, name: 'Home', link: '/' },
  { id: 3, name: 'Projects', link: '/projects' },
  { id: 4, name: 'About', link: '/about' },
  { id: 5, name: 'Contact', link: '/contact' },
];

const ANIMATION_CONFIG = {
  duration: 0.2,
  ease: 'power2.out',
};

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const iconRefs = useRef([]);
  const linkRefs = useRef([]);
  const imageRef = useRef(null);
  const nameRef = useRef(null);
  const isAnimating = useRef(false);
  const navigate = useNavigate();

  const handleIconAnimation = useCallback((index, isEntering) => {
    if (!iconRefs.current[index]) return;

    if (isEntering) {
      gsap.fromTo(
        iconRefs.current[index],
        {
          y: 20,
          x: -20,
          opacity: 0,
        },
        {
          y: 0,
          x: 0,
          opacity: 1,
          duration: ANIMATION_CONFIG.duration,
          ease: ANIMATION_CONFIG.ease,
        }
      );
    } else {
      gsap.to(iconRefs.current[index], {
        opacity: 0,
        y: -20,
        x: 20,
        duration: ANIMATION_CONFIG.duration,
        ease: ANIMATION_CONFIG.ease,
      });
    }
  }, []);

  const handleNavigation = useCallback(
    (e, link) => {
      e.preventDefault();

      gsap
        .timeline({
          onComplete: () => {
            navigate(link);
          },
        })
        .to(menuRef.current, {
          x: '100%',
          duration: 0.2,
          ease: 'power2.in',
          onStart: () => {
            setIsOpen(false);
          },
        });
    },
    [navigate]
  );

  const handleMenuAnimation = useCallback((shouldOpen) => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const tl = gsap.timeline({
      defaults: ANIMATION_CONFIG,
      onComplete: () => {
        isAnimating.current = false;
      },
    });

    const elements = [
      linkRefs.current,
      nameRef.current,
      imageRef.current,
    ].flat();

    if (shouldOpen) {
      tl.set(menuRef.current, { x: '100%', display: 'flex' })
        .to(menuRef.current, {
          x: 0,
          duration: 0.3,
          ease: 'power2.out',
        })
        .fromTo(
          elements,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.2,
            stagger: 0.05,
            ease: 'power2.out',
          }
        );
    } else {
      tl.to(elements, {
        opacity: 0,
        y: -20,
        duration: 0.2,
        stagger: 0.02,
      }).to(menuRef.current, {
        x: '100%',
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(menuRef.current, { display: 'none' });
        },
      });
    }
  }, []);

  useEffect(() => {
    handleMenuAnimation(isOpen);
  }, [isOpen, handleMenuAnimation]);

  useEffect(() => {
    return () => {
      const elements = [
        menuRef.current,
        ...linkRefs.current,
        nameRef.current,
        imageRef.current,
      ];
      gsap.killTweensOf(elements);
    };
  }, []);

  const menuButtonClasses = useMemo(
    () => ({
      container: `z-50 flex items-center justify-between px-2 relative h-[40px] transition-all ${
        isOpen
          ? 'w-[50px] h-[50px] bg-[#e85c0d] rounded-full'
          : 'w-[80px] bg-gray-800 rounded-xl group-hover:w-[100px] duration-300 ease-in-out'
      }`,
      icon: `relative flex flex-col items-center justify-center transition-all duration-300 ease-in-out overflow-hidden ${
        isOpen
          ? 'w-[35px] h-[35px]'
          : 'w-[10px] h-[10px] rounded-full bg-[#e85c0d] group-hover:w-[30px] group-hover:h-[30px]'
      }`,
      line1: `line_1 absolute transition-all duration-300 ease-in-out ${
        isOpen ? 'rotate-45 top-[14px]' : 'top-[10px]'
      }`,
      line2: `line_2 absolute transition-all duration-300 ease-in-out ${
        isOpen ? '-rotate-45 top-[14px]' : 'top-[16px]'
      }`,
    }),
    [isOpen]
  );

  return (
    <>
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="group cursor-pointer"
      >
        <div className={menuButtonClasses.container}>
          <p
            className={isOpen ? 'hidden' : 'block text-[#16C47F] font-semibold'}
          >
            Menu
          </p>
          <div className={menuButtonClasses.icon}>
            <div className={menuButtonClasses.line1}></div>
            <div className={menuButtonClasses.line2}></div>
          </div>
        </div>
      </div>

      <div
        ref={menuRef}
        className="fixed preserve-3d top-0 left-0 right-0 mx-auto w-full h-screen bg-slate-900 flex z-40"
        style={{ display: 'none', x: '100%' }}
      >
        <nav className="relative my-32 w-[60%] flex flex-col items-center gap-8">
          {MENU_ITEMS.map((item, index) => (
            <Link
              ref={(el) => (linkRefs.current[index] = el)}
              onClick={(e) => handleNavigation(e, item.link)}
              to={item.link}
              key={item.id}
              className="group uppercase flex items-center gap-2"
              onMouseEnter={() => handleIconAnimation(index, true)}
              onMouseLeave={() => handleIconAnimation(index, false)}
            >
              <ArrowUpRight
                ref={(el) => (iconRefs.current[index] = el)}
                className="text-3xl text-[#e85c0d] opacity-0"
              />
              <p className="transition-all duration-300 ease text-violet-200 font-thunder text-[3vw] group-hover:text-[#e85c0d]">
                {item.name}
              </p>
            </Link>
          ))}
        </nav>

        <aside className="ml-auto w-[40%] flex flex-col items-center justify-center bg-gray-400">
          <div className="flex items-center mx-auto w-[90%]">
            <img
              ref={imageRef}
              className="rounded-full w-full h-auto"
              loading="lazy"
              src={hossam}
              alt="hossam aboud"
            />
          </div>
          <div className="w-full h-1/2 flex justify-center items-center">
            <img
              ref={nameRef}
              loading="lazy"
              className="px-4 w-full h-auto"
              src={nameSvg}
              alt="hossam aboud"
            />
          </div>
        </aside>
      </div>
    </>
  );
};

export default Menu;
