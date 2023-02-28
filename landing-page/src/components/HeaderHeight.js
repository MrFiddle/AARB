import { useState, useRef, useEffect } from 'react';

export function useHeaderHeight() {
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef(null);

  useEffect(() => {
    setHeaderHeight(getHeaderHeight());
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    setHeaderHeight(getHeaderHeight());
  };

  const getHeaderHeight = () => {
    if (headerRef.current) {
      const height = headerRef.current.offsetHeight;
      return height;
    }
    return 0;
  };

  return [headerHeight, headerRef];
}