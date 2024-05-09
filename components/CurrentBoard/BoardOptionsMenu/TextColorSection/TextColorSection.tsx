import {schemeText} from '@/variables/default';
import {FC} from 'react';
import TextColor from '../../Settings/TextColor/TextColor';
import './TextColorSection.scss';

interface TextColorSectionProps {
  setIsOpenTextColor: (a: boolean) => void;
  isOpenTextColor: boolean;
}
const TextColorSection: FC<TextColorSectionProps> = ({
  setIsOpenTextColor,
  isOpenTextColor,
}) => {
  return (
    <div className='text-color'>
      <p
        className='expandable-content__title underline'
        onClick={() => setIsOpenTextColor(!isOpenTextColor)}
      >
        Color scheme of text
      </p>
      <div className='text-color__box'>
        {isOpenTextColor &&
          schemeText.map((item, i) => (
            <TextColor key={i} title={item.title} text={item.text} />
          ))}
      </div>
    </div>
  );
};
export default TextColorSection;
