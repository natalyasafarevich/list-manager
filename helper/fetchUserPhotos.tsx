import {getStorage, ref, listAll, getDownloadURL} from 'firebase/storage';

const fetchUserPhotos = async (typeOfPhoto: string, path: string) => {
  const storage = getStorage();
  const userPhotosRef = ref(storage, `${path}${typeOfPhoto}`);

  try {
    const photoList = await listAll(userPhotosRef);

    const photoUrls = await Promise.all(
      photoList.items.map(async (item) => {
        const url = await getDownloadURL(item);
        return {name: item.name, url};
      }),
    );

    return photoUrls;
  } catch (error) {
    console.error('Ошибка при получении фотографий пользователя:', error);
    return [];
  }
};

export default fetchUserPhotos;
