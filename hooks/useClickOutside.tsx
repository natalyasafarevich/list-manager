import {useEffect, useRef, useState} from 'react';

const useClickOutside = <T extends HTMLElement>(
  initialState: boolean,
  closeOnOutsideClick: boolean = true,
) => {
  const [isClose, setIsClose] = useState<boolean>(initialState);
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        closeOnOutsideClick &&
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        setIsClose(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeOnOutsideClick, ref]);

  return {ref, isClose, setIsClose};
};

export default useClickOutside;
