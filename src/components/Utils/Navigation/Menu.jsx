import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import nameSvg from '../../../assets/name.png';
import hossam from '../../../assets/hossam.jpg';
import { MdArrowOutward } from 'react-icons/md';
import { useLoading } from '../../../Context/ContextApp';

const Menu = () => {
  const { setIsLoading } = useLoading();
  const [menu, setMenu] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const menuRef = useRef(null);
  const iconRef = useRef([]);
  const linkRef = useRef([]);
  const imageRef = useRef(null);
  const nameRef = useRef(null);
  const isAnimating = useRef(false);
  const navigate = useNavigate();

  const menuList = [
    { id: 1, name: 'Cv', link: 'cv' },
    { id: 2, name: 'Home', link: '/' },
    { id: 3, name: 'Projects', link: '/projects' },
    { id: 4, name: 'About', link: '/about' },
    { id: 5, name: 'Contact', link: '/contact' },
  ];

  const handleClick = () => {
    setMenu(!menu);
  };

  const handleLinkEnter = (index) => {
    gsap.fromTo(
      iconRef.current[index],
      {
        y: 20,
        x: -20,
        opacity: 0,
      },
      {
        y: 0,
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power4.out',
      }
    );
  };

  const handleLinkLeave = (index) => {
    gsap.to(iconRef.current[index], {
      opacity: 0,
      y: -20,
      x: 20,
      duration: 0.5,
      ease: 'power4.out',
    });
  };

  const handleLinkClick = (e, link) => {
    e.preventDefault();
    if (isAnimating.current || isNavigating) return;

    setIsLoading(true);
    setIsNavigating(true);
    setMenu(false);

    setTimeout(() => {
      navigate(link);
      setIsNavigating(false);
    }, 200);
  };

  const openMenu = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    gsap.killTweensOf(menuRef.current);
    gsap.killTweensOf([linkRef.current, nameRef.current, imageRef.current]);

    gsap.set(menuRef.current, { x: '100%', display: 'flex' });
    gsap.set(linkRef.current, { y: 50, opacity: 0 });
    gsap.set(nameRef.current, { opacity: 0, y: 250 });
    gsap.set(imageRef.current, { opacity: 0, scale: 0.5, y: -250 });

    gsap.to(menuRef.current, {
      x: 0,
      duration: 0.5,
      ease: 'power2.out',
    });

    gsap.to(linkRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.2,
      ease: 'power4.out',
      delay: 0.4,
    });

    gsap.to(nameRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power2.out',
      delay: 1.5,
    });

    gsap.to(imageRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: 'power2.out',
      delay: 1,
      onComplete: () => {
        isAnimating.current = false;
      },
    });
  };

  const closeMenu = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    gsap.killTweensOf(menuRef.current);

    gsap.to(menuRef.current, {
      x: '-100%',
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => {
        gsap.set(menuRef.current, { display: 'none' });
        isAnimating.current = false;
      },
    });

    gsap.to([linkRef.current, nameRef.current, imageRef.current], {
      opacity: 0,
      duration: 0.2,
      ease: 'power1.out',
    });
  };

  useEffect(() => {
    if (menu) {
      openMenu();
    } else {
      closeMenu();
    }
  }, [menu]);

  useEffect(() => {
    return () => {
      gsap.killTweensOf([
        menuRef.current,
        ...linkRef.current,
        nameRef.current,
        imageRef.current,
      ]);
    };
  }, []);

  return (
    <>
      <div onClick={handleClick} className="group cursor-pointer">
        <div
          className={`z-50 flex items-center justify-between px-2 relative h-[40px] transition-all ${
            menu
              ? 'w-[50px] h-[50px] bg-[#e85c0d] rounded-full'
              : 'w-[80px] bg-gray-800 rounded-xl group-hover:w-[100px] duration-300 ease-in-out'
          }`}
        >
          <p
            className={`${menu ? 'hidden' : 'block text-[#16C47F] font-semibold'}`}
          >
            Menu
          </p>

          <div
            className={`relative flex flex-col items-center justify-center transition-all duration-300 ease-in-out overflow-hidden ${
              menu
                ? 'w-[35px] h-[35px]'
                : 'w-[10px] h-[10px] rounded-full bg-[#e85c0d] group-hover:w-[30px] group-hover:h-[30px]'
            }`}
          >
            <div
              className={`line_1 absolute transition-all duration-300 ease-in-out ${
                menu ? 'rotate-45 top-[14px]' : 'top-[10px]'
              }`}
            ></div>
            <div
              className={`line_2 absolute transition-all duration-300 ease-in-out ${
                menu ? '-rotate-45 top-[14px]' : 'top-[16px]'
              }`}
            ></div>
          </div>
        </div>
      </div>

      <div
        ref={menuRef}
        className="fixed preserve-3d top-0 left-0 right-0 mx-auto w-full h-screen bg-slate-900 flex z-40"
        style={{ display: 'none', x: '100%' }}
      >
        <div className="relative my-32 w-[60%] flex flex-col items-center gap-8">
          {menuList.map((item, index) => (
            <Link
              ref={(el) => (linkRef.current[index] = el)}
              onClick={(e) => handleLinkClick(e, item.link)}
              to={item.link}
              key={item.id}
              className="group uppercase flex items-center gap-2"
              onMouseEnter={() => handleLinkEnter(index)}
              onMouseLeave={() => handleLinkLeave(index)}
            >
              <MdArrowOutward
                ref={(el) => (iconRef.current[index] = el)}
                className="text-3xl text-[#e85c0d] opacity-0"
              />
              <p className="transition-all duration-300 ease text-[#16C47F] font-light font-dancing text-3xl group-hover:text-[#e85c0d]">
                {item.name}
              </p>
            </Link>
          ))}
        </div>
        <div className="ml-auto w-[40%] flex flex-col items-center justify-center bg-gray-400">
          <div className="flex items-center mx-auto w-[90%]">
            <img
              ref={imageRef}
              className="rounded-full"
              loading="lazy"
              src={hossam}
              alt="hossam aboud image"
            />
          </div>
          <div className="w-full h-1/2 flex justify-center items-center">
            <img
              ref={nameRef}
              loading="lazy"
              className="px-4"
              src={nameSvg}
              alt="text of hossam aboud"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
