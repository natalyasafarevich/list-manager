import {FC} from 'react';
import ExpandableContent from '@/components/ExpandableContent/ExpandableContent';
import ArchivedСolumns from '../../Column/ArchivedСolumns/ArchivedСolumns';
import CardArchived from '../../Card/CardArchived/CardArchived';
import {MenuSectionProps} from '@/types/component-props';

const ArchivesSection: FC<MenuSectionProps> = ({
  setTitle,
  setIsOpen,
  isOpen,
}) => {
  return (
    <ExpandableContent
      setTitle={(e) => setTitle(e)}
      setIsOpen={(e) => setIsOpen(e)}
      isOpen={isOpen as boolean}
      title={'Archives'}
    >
      <div>
        <ArchivedСolumns />
        <CardArchived />
      </div>
    </ExpandableContent>
  );
};
export default ArchivesSection;
