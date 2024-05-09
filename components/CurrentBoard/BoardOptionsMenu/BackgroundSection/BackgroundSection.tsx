import ExpandableContent from '@/components/ExpandableContent/ExpandableContent';
import {FC} from 'react';
import ChangeBackground from '../../ChangeBackground/ChangeBackground';
import {MenuSectionProps} from '@/types/component-props';

const BackgroundSection: FC<MenuSectionProps> = ({
  setTitle,
  setIsOpen,
  isOpen,
}) => {
  return (
    <ExpandableContent
      setTitle={(e) => setTitle(e)}
      setIsOpen={(e) => setIsOpen(e)}
      isOpen={isOpen as boolean}
      title={'Change the background'}
    >
      <ChangeBackground />
    </ExpandableContent>
  );
};
export default BackgroundSection;
