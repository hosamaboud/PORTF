import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorInnerRef = useRef(null);
  const cursorOuterRef = useRef(null);
  const cursorLabelRef = useRef(null);

  const [isHovering, setIsHovering] = useState(false);
  const [hoverType, setHoverType] = useState(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Set initial position to center
    gsap.set(cursorRef.current, {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });

    const moveCursor = (e) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.7,
        ease: 'power3.out',
      });
    };

    const handleMouseDown = () => {
      setIsActive(true);
      gsap.to(cursorOuterRef.current, {
        scale: 0.7,
        duration: 0.2,
      });
    };

    const handleMouseUp = () => {
      setIsActive(false);
      gsap.to(cursorOuterRef.current, {
        scale: 1,
        duration: 0.3,
      });
    };

    // Add hover detection
    const addHoverEffects = () => {
      const hoverElements = document.querySelectorAll(
        'a, button, input, textarea, img, [data-cursor-hover]'
      );

      hoverElements.forEach((el) => {
        el.addEventListener('mouseenter', (e) => {
          setIsHovering(true);
          if (el.tagName === 'A') setHoverType('link');
          else if (el.tagName === 'BUTTON') setHoverType('button');
          else if (el.tagName === 'IMG') setHoverType('image');
          else if (['INPUT', 'TEXTAREA'].includes(el.tagName))
            setHoverType('input');
          else if (el.hasAttribute('data-cursor-hover'))
            setHoverType(el.getAttribute('data-cursor-hover'));

          // Animate on hover
          gsap.to(cursorInnerRef.current, {
            scale: 0,
            duration: 0.3,
          });

          gsap.to(cursorOuterRef.current, {
            scale: getHoverScale(),
            backgroundColor: getHoverColor(),
            duration: 0.3,
          });
        });

        el.addEventListener('mouseleave', () => {
          setIsHovering(false);
          setHoverType(null);

          // Animate back to normal
          gsap.to(cursorInnerRef.current, {
            scale: 1,
            duration: 0.3,
          });

          gsap.to(cursorOuterRef.current, {
            scale: 1,
            backgroundColor: 'transparent',
            duration: 0.3,
          });

          gsap.to(cursorLabelRef.current, {
            opacity: 0,
            y: 10,
            duration: 0.2,
          });
        });
      });
    };

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    addHoverEffects();

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Update label when hover type changes
  useEffect(() => {
    if (isHovering && hoverType) {
      gsap.fromTo(
        cursorLabelRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3 }
      );
    }
  }, [hoverType, isHovering]);

  const getHoverScale = () => {
    switch (hoverType) {
      case 'link':
        return 1.5;
      case 'button':
        return 1.8;
      case 'image':
        return 2;
      case 'input':
        return 0.5;
      default:
        return 1.5;
    }
  };

  const getHoverColor = () => {
    switch (hoverType) {
      case 'link':
        return 'rgba(100, 200, 255, 0.3)';
      case 'button':
        return 'rgba(255, 150, 50, 0.3)';
      case 'image':
        return 'rgba(150, 255, 100, 0.3)';
      case 'input':
        return 'rgba(255, 255, 255, 0.5)';
      default:
        return 'rgba(200, 200, 200, 0.3)';
    }
  };

  const getLabelText = () => {
    switch (hoverType) {
      case 'link':
        return 'Visit';
      case 'button':
        return 'Click';
      case 'image':
        return 'View';
      case 'input':
        return 'Type';
      default:
        return hoverType || '';
    }
  };

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-50 mix-blend-difference transform -translate-x-1/2 -translate-y-1/2"
    >
      {/* Inner dot */}
      <div
        ref={cursorInnerRef}
        className={`absolute w-2 h-2 rounded-full bg-white transform -translate-x-1/2 -translate-y-1/2 ${
          isActive ? 'scale-75' : 'scale-100'
        } transition-transform duration-200`}
      />

      {/* Outer circle */}
      <div
        ref={cursorOuterRef}
        className={`absolute w-6 h-6 border-2 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2 ${
          isActive ? 'scale-75 border-red-500' : 'scale-100'
        } transition-all duration-300`}
      />

      {/* Label */}
      {isHovering && (
        <div
          ref={cursorLabelRef}
          className="absolute top-8 left-8 bg-white text-black px-2 py-1 rounded text-xs font-medium whitespace-nowrap opacity-0"
        >
          {getLabelText()}
        </div>
      )}
    </div>
  );
};

export default CustomCursor;
