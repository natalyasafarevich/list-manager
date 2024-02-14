import {updateProfile} from 'firebase/auth';

export function profileUpdate(auth: any, params?: any) {
  if (auth?.currentUser) {
    updateProfile(auth.currentUser, params)
      .then(() => {
        console.log('Профиль успешно обновлен', auth?.currentUser?.displayName);
      })
      .catch((error: any) => {
        console.error('Ошибка при обновлении профиля:', error);
      });
  }
}
