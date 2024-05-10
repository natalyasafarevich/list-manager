'use client';
import {schemeText} from '@/variables/default';
import {FC} from 'react';
import TextColor from '../../Settings/TextColor/TextColor';
import './TextColorSection.scss';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';

interface TextColorSectionProps {
  setIsOpenTextColor: (a: boolean) => void;
  isOpenTextColor: boolean;
}
const TextColorSection: FC<TextColorSectionProps> = ({setIsOpenTextColor, isOpenTextColor}) => {
  const user = useSelector((state: RootState) => state.userdata);

  const isLoggedIn = !!user.uid && user.user_status !== 'guest';
  return (
    <div className='text-color'>
      <p className='expandable-content__title underline' onClick={() => setIsOpenTextColor(!isOpenTextColor)}>
        Color scheme of text
      </p>
      <div className='text-color__box'>
        {isLoggedIn &&
          isOpenTextColor &&
          schemeText.map((item, i) => <TextColor key={i} title={item.title} text={item.text} />)}
      </div>
    </div>
  );
};
export default TextColorSection;
