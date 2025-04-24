import { forwardRef, useRef, useEffect } from 'react';

const AnimatedText = forwardRef(({ text, className }, ref) => {
  const charsRef = useRef([]);

  useEffect(() => {
    if (ref) {
      ref.current = charsRef.current.filter(Boolean);
    }
  }, [ref]);

  return (
    <h1 className={`overflow-hidden ${className}`}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          ref={(el) => (charsRef.current[i] = el)}
          className="inline-block opacity-0"
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </h1>
  );
});

export default AnimatedText;
