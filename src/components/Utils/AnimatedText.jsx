import { forwardRef, useRef, useEffect } from 'react';

const AnimatedText = forwardRef(({ text, className }, ref) => {
  const charsRef = useRef([]);

  useEffect(() => {
    if (ref) {
      ref.current = charsRef.current.filter(Boolean);
    }
  }, [ref, text]);

  return (
    <h1 className={` ${className}`}>
      {text.split('').map((char, i) => (
        <span
          key={`${text}-${i}-${char}`}
          ref={(el) => (charsRef.current[i] = el)}
          className="inline-block will-change-transform will-change-opacity"
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </h1>
  );
});

export default AnimatedText;
