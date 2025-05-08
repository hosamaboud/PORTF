import { useRef, useEffect } from 'react';
import { gsap } from '../../gsap-config';
import { ArrowBigRightDash } from 'lucide-react';

const ScrollingText = ({
  text,
  bgColor,
  textColor,
  iconColor,
  repeatCount,
  speed,
}) => {
  const moveText = useRef([]);
  const iconRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollingTextElements = moveText.current.filter(Boolean);

      const animation = gsap.to(scrollingTextElements, {
        x: '100%',
        duration: speed,
        ease: 'none',
        repeat: -1,
        yoyo: true,
      });
      return () => {
        animation.kill();
      };
    });

    return () => ctx.revert();
  }, [speed]);

  return (
    <div
      className="flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      {Array(repeatCount)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            ref={(el) => (moveText.current[i] = el)}
            className="moveText flex items-center shrink-0 gap-[3vw]"
          >
            <h1
              className="uppercase flex shrink-0 items-center justify-center px-[1.5vw] font-thunder text-[5.5vw] md:text-[2.5vw] font-semibold"
              style={{
                color: textColor,
              }}
            >
              {text.split(' • ').map((char, index) => (
                <span key={index} className="flex items-center justify-center">
                  {char}
                </span>
              ))}
            </h1>
          </div>
        ))}
    </div>
  );
};

export default ScrollingText;
