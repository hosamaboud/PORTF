import { useEffect, useRef } from 'react';
import { gsap } from '../../gsap-config';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    const text = textRef.current;

    document.body.style.cursor = 'none';

    const moveElements = (e) => {
      const { clientX, clientY } = e;

      gsap.to(cursor, {
        x: clientX,
        y: clientY,
        duration: 0.1,
        ease: 'power2.out',
      });

      gsap.to(follower, {
        x: clientX,
        y: clientY,
        duration: 0.3,
        ease: 'power2.out',
      });

      gsap.to(text, {
        x: clientX,
        y: clientY + 30,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseOver = (e) => {
      const target = e.target;

      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        gsap.to([cursor, follower], {
          scale: 1.2,
          duration: 0.3,
        });
        gsap.to(text, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
        });
      }
    };

    const handleMouseOut = () => {
      gsap.to([cursor, follower], {
        scale: 1,
        duration: 0.3,
      });
      gsap.to(text, {
        opacity: 0,
        scale: 0,
        duration: 0.3,
      });
    };

    window.addEventListener('mousemove', moveElements);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    if (isMobile) {
      [cursor, follower, text].forEach((el) => {
        if (el) el.style.display = 'none';
      });
      document.body.style.cursor = 'auto';
    }

    return () => {
      window.removeEventListener('mousemove', moveElements);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      {/* الدائرة الصغيرة (النقطة الحمراء) */}
      <div
        ref={cursorRef}
        className="hidden md:block fixed pointer-events-none z-[9999] w-[10px] h-[10px] rounded-full"
        style={{
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(255, 0, 0, 0.3)',
        }}
      />

      {/* الدائرة الكبيرة (تأثير mix-blend-difference) */}
      <div
        ref={followerRef}
        className="hidden md:block fixed pointer-events-none z-[9998] w-7 h-7 rounded-full bg-black  opacity-30 border-[1px] border-[#FF0000] "
        style={{
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 10px rgba(255, 0, 0, 0.3)',
        }}
      />

      {/* نص "Visit" (يظهر عند Hover على روابط) */}
      <div
        ref={textRef}
        className="hidden md:block fixed pointer-events-none z-[9997] px-3 py-1 text-sm font-thunder uppercase bg-[#FF0000] text-black rounded-full opacity-0 scale-0"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        Visit
      </div>
    </>
  );
};

export default CustomCursor;
