import { useState, useEffect } from 'react';
import { IWINDOW_SIZE } from 'types';

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState<IWINDOW_SIZE>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowSize;
}
