'use client';

import { useEffect, useRef } from 'react';

const GlitchCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const glitchColorB = '#e9d5ff';
    const glitchColorR = '#ff4f71';
    let moving = false;
    let pointerX = 0, pointerY = 0;
    let previousPointerX = 0, previousPointerY = 0;
    let distanceX = 0, distanceY = 0;

    const updateCursorStyle = (styles) => {
      Object.assign(cursor.style, styles);
    };

    updateCursorStyle({
      top: '-10px',
      left: '-10px',
      position: 'fixed',
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      backgroundColor: CSS.supports('backdrop-filter', 'invert(1)') ? 'transparent' : '#222',
      backdropFilter: CSS.supports('backdrop-filter', 'invert(1)') ? 'invert(1)' : 'none',
      boxShadow: `0 0 0 ${glitchColorB}, 0 0 0 ${glitchColorR}`,
      pointerEvents: 'none',
      transform: 'translate(-50%, -50%)',
    });

    const move = (event) => {
      previousPointerX = pointerX;
      previousPointerY = pointerY;
      pointerX = event.clientX;
      pointerY = event.clientY;
      distanceX = Math.min(Math.max(previousPointerX - pointerX, -10), 10);
      distanceY = Math.min(Math.max(previousPointerY - pointerY, -10), 10);

      updateCursorStyle({
        transform: `translate(${pointerX}px, ${pointerY}px)`,
        // enable glitch
        boxShadow: `${distanceX}px ${distanceY}px 0 ${glitchColorB}, ${-distanceX}px ${-distanceY}px 0 ${glitchColorR}`,
      });

      if (!moving) {
        moving = true;
        setTimeout(() => {
          updateCursorStyle({ boxShadow: '' });
          moving = false;
        }, 50);
      }
    };

    const click = () => {
      updateCursorStyle({ transform: `translate(${pointerX}px, ${pointerY}px) scale(0.75)` });
      setTimeout(() => {
        updateCursorStyle({ transform: `translate(${pointerX}px, ${pointerY}px)` });
      }, 35);
    };

    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      document.addEventListener('mousemove', move);
      document.addEventListener('click', click);
    }

    return () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('click', click);
    };
  }, []);

  return <div ref={cursorRef} className="curzr z-[9999999999]" />;
};

export default GlitchCursor;
