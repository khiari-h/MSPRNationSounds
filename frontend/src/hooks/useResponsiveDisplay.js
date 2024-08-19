import { useEffect, useState } from 'react';

export const useResponsiveDisplay = (defaultCount = 3) => {
  const [displayCount, setDisplayCount] = useState(defaultCount);

  useEffect(() => {
    const updateDisplayCount = () => {
      if (window.innerWidth < 768) {
        setDisplayCount(1); // Mobile
      } else if (window.innerWidth < 1024) {
        setDisplayCount(2); // Tablet
      } else {
        setDisplayCount(3); // Desktop
      }
    };

    window.addEventListener('resize', updateDisplayCount);
    updateDisplayCount(); // Run once to set initial value

    return () => window.removeEventListener('resize', updateDisplayCount);
  }, []);

  return displayCount;
};
