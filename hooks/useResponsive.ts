import {useState, useEffect} from 'react';
import {useMediaQuery} from 'react-responsive';

const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(useMediaQuery({maxWidth: 991}));
  const [isDesktop, setIsDesktop] = useState(useMediaQuery({minWidth: 1024}));

  useEffect(() => {
    const updateMedia = () => {
      setIsMobile(useMediaQuery({maxWidth: 991}));
      setIsDesktop(useMediaQuery({minWidth: 1024}));
    };
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, []);

  return {isMobile, isDesktop};
};

export default useResponsive;
