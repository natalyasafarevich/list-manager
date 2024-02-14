import ChangePhoto from '@/components/user/settings/AccountManagement/ProfileVisibility/ChangePhoto/ChangePhoto';
import ProfileInformation from './ProfileInformation/ProfileInformation';

const ProfileVisibility = () => {
  return (
    <div>
      <p className='text-info'>Профиль и видимость</p>
      <ChangePhoto />
      <br />
      <h2 className='text-secondary'>Основная информация профиля</h2>
      <ProfileInformation></ProfileInformation>
    </div>
  );
};

export default ProfileVisibility;
