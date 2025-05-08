import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const OptimizedImage = ({ src, alt, className, width, height }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    if (inView && !imageSrc) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
      };
    }
  }, [inView, src, imageSrc]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={alt}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          width={width}
          height={height}
          loading="lazy"
        />
      ) : (
        <div className="animate-pulse bg-gray-200 w-full h-full" />
      )}
    </div>
  );
};

export default OptimizedImage;
