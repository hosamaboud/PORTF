import { useRef, useCallback, useState, useEffect } from 'react';
import gsap from 'gsap';

const CustomCursor = ({ enabled = true }) => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const hoverItems = useRef([]);
  const requestRef = useRef();
  const pos = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  // أنواع التأثيرات
  const CURSOR_TYPES = {
    DEFAULT: 'default',
    HOVER: 'hover',
    TEXT: 'text',
    SPECIAL: 'special',
  };

  // تحديث العناصر القابلة للتفاعل مع ديبونس
  const updateHoverItems = useCallback(() => {
    hoverItems.current.forEach((item) => {
      item.removeEventListener('mouseenter', handleHover);
      item.removeEventListener('mouseleave', handleHoverOut);
    });

    hoverItems.current = [
      ...document.querySelectorAll(
        'a, button, input, textarea, [data-cursor], [data-cursor-text]'
      ),
    ];

    hoverItems.current.forEach((item) => {
      item.addEventListener('mouseenter', handleHover);
      item.addEventListener('mouseleave', handleHoverOut);
    });
  }, []);

  // تأثيرات التحويم مع تحسينات الأداء
  const handleHover = useCallback(
    (e) => {
      if (!followerRef.current || !enabled) return;

      const target = e.currentTarget;
      let cursorType = CURSOR_TYPES.DEFAULT;
      let cursorProps = {};

      if (target.hasAttribute('data-cursor-text')) {
        cursorType = CURSOR_TYPES.TEXT;
        cursorProps = {
          content: target.dataset.cursorText,
          scale: 1.8,
          bgColor: '#FF3E4D',
          width: 'auto',
          height: 'auto',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          fontSize: '0.875rem',
          mixBlendMode: 'normal',
        };
      } else if (target.closest('a, button')) {
        cursorType = CURSOR_TYPES.HOVER;
        cursorProps = {
          scale: 1.6,
          bgColor: '#3B82F6',
          mixBlendMode: 'difference',
        };
      } else if (target.closest('[data-cursor]')) {
        cursorType = CURSOR_TYPES.SPECIAL;
        cursorProps = {
          scale: 2.2,
          bgColor: target.dataset.cursorColor || '#8B5CF6',
          mixBlendMode: 'normal',
        };
      }

      animateCursor(cursorType, cursorProps);
    },
    [enabled]
  );

  // إعادة المؤشر للحالة الافتراضية
  const handleHoverOut = useCallback(() => {
    if (!followerRef.current || !enabled) return;
    animateCursor(CURSOR_TYPES.DEFAULT);
  }, [enabled]);

  // تأثير النقر مع تحسينات
  const handleClick = useCallback(() => {
    if (!followerRef.current || !enabled) return;

    gsap.to(followerRef.current, {
      scale: 0.7,
      duration: 0.15,
      yoyo: true,
      repeat: 1,
      ease: 'power3.out',
    });
  }, [enabled]);

  // حركة المؤشر مع ديبونس
  const updateCursorPosition = useCallback(
    (e) => {
      mouse.current = {
        x: e.clientX,
        y: e.clientY,
      };

      if (!isActive) setIsActive(true);
    },
    [isActive]
  );

  // تحريك المؤشر مع GSAP
  const animateCursor = (type, props = {}) => {
    const defaults = {
      content: '',
      scale: 1,
      bgColor: '#D44638',
      width: '2rem',
      height: '2rem',
      padding: '0',
      borderRadius: '50%',
      fontSize: '0.8rem',
      mixBlendMode: 'difference',
    };

    const settings = { ...defaults, ...props };

    gsap.to(followerRef.current, {
      scale: settings.scale,
      backgroundColor: settings.bgColor,
      width: settings.width,
      height: settings.height,
      padding: settings.padding,
      borderRadius: settings.borderRadius,
      mixBlendMode: settings.mixBlendMode,
      duration: 0.3,
      ease: 'power3.out',
    });

    if (followerRef.current) {
      followerRef.current.textContent = settings.content;
      followerRef.current.style.fontSize = settings.fontSize;
    }
  };

  // حلقة الحركة مع تحسينات الأداء
  const animate = useCallback(() => {
    if (!enabled) return;

    // حركة المؤشر الأساسي (سريعة ودقيقة)
    gsap.set(cursorRef.current, {
      x: mouse.current.x,
      y: mouse.current.y,
    });

    // حركة المؤشر التابع (ناعمة مع قوة فيزيائية)
    pos.current.x = gsap.utils.interpolate(pos.current.x, mouse.current.x, 0.2);
    pos.current.y = gsap.utils.interpolate(pos.current.y, mouse.current.y, 0.2);

    gsap.set(followerRef.current, {
      x: pos.current.x,
      y: pos.current.y,
    });

    requestRef.current = requestAnimationFrame(animate);
  }, [enabled]);

  // تهيئة المؤشر
  useEffect(() => {
    if (!enabled) return;

    // إخفاء المؤشر الأصلي
    document.body.style.cursor = 'none';

    // تهيئة المؤشر المخصص
    gsap.set([cursorRef.current, followerRef.current], {
      xPercent: -50,
      yPercent: -50,
      opacity: 0,
    });

    gsap.to([cursorRef.current, followerRef.current], {
      opacity: 1,
      duration: 0.4,
      ease: 'power3.out',
    });

    // بدء الحركة
    requestRef.current = requestAnimationFrame(animate);

    // إضافة مستمعات الأحداث
    window.addEventListener('mousemove', updateCursorPosition);
    window.addEventListener('click', handleClick);

    // مراقبة تغيرات DOM مع تحسينات
    const observer = new MutationObserver(updateHoverItems);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-cursor', 'data-cursor-text'],
    });

    // تحديث العناصر القابلة للتفاعل
    updateHoverItems();

    return () => {
      // التنظيف
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener('mousemove', updateCursorPosition);
      window.removeEventListener('click', handleClick);
      observer.disconnect();
      document.body.style.cursor = '';

      hoverItems.current.forEach((item) => {
        item.removeEventListener('mouseenter', handleHover);
        item.removeEventListener('mouseleave', handleHoverOut);
      });
    };
  }, [animate, enabled, handleClick, updateCursorPosition, updateHoverItems]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-3 h-3 rounded-full bg-white pointer-events-none z-[9999] mix-blend-difference transform -translate-x-1/2 -translate-y-1/2 will-change-transform backdrop-filter backdrop-invert"
      />
      <div
        ref={followerRef}
        className="fixed w-8 h-8 rounded-full bg-[#D44638] pointer-events-none z-[9998] opacity-90 mix-blend-difference flex items-center justify-center text-xs text-white font-medium transform -translate-x-1/2 -translate-y-1/2 will-change-transform transition-all duration-300 ease-out"
      />
    </>
  );
};

export default CustomCursor;
