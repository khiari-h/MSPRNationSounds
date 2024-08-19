import { useEffect } from 'react';

export const useResponsiveItemsPerPage = (setItemsPerPage, mobileCount = 3, desktopCount = 6) => {
  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth < 768 ? mobileCount : desktopCount);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Appel initial pour définir le nombre d'items par page

    return () => window.removeEventListener('resize', handleResize);
  }, [setItemsPerPage, mobileCount, desktopCount]);
};
