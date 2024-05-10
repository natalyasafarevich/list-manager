'use client';
import ExpandableContent from '@/components/ExpandableContent/ExpandableContent';
import {FC} from 'react';
import ChangeBackground from '../../ChangeBackground/ChangeBackground';
import {MenuSectionProps} from '@/types/component-props';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';

const BackgroundSection: FC<MenuSectionProps> = ({setTitle, setIsOpen, isOpen}) => {
  const user = useSelector((state: RootState) => state.userdata);

  const isLoggedIn = !!user.uid && user.user_status !== 'guest';

  return (
    <ExpandableContent
      setTitle={(e) => setTitle(e)}
      setIsOpen={(e) => setIsOpen(e)}
      isOpen={isOpen as boolean}
      title={'Change the background'}
    >
      {isLoggedIn && <ChangeBackground />}
    </ExpandableContent>
  );
};
export default BackgroundSection;
