import fetchUserPhotos from '@/helper/fetchUserPhotos';
import {useEffect, useState} from 'react';

const useUserPhotos = (userId: string, upload: any) => {
  const [photos, setPhotos] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPhotos = await fetchUserPhotos('avatar', userId);
        setPhotos(fetchedPhotos);
        setLoading(false);
      } catch (error: any) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, upload]);

  return {photos, loading, error};
};

export default useUserPhotos;
