import {RootState} from '@/store/store';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';

const useScrollControl = () => {
  const isOpen = useSelector((state: RootState) => state.menu.isOpen);

  useEffect(() => {
    if (isOpen) {
      document.documentElement.classList.add('no-scroll');
    } else {
      document.documentElement.classList.remove('no-scroll');
    }

    return () => {
      document.documentElement.classList.remove('no-scroll');
    };
  }, [isOpen]);
};

export default useScrollControl;
