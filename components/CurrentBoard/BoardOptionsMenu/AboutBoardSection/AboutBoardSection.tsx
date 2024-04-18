'use client';
import ExpandableContent from '@/components/ExpandableContent/ExpandableContent';
import {FC} from 'react';
import ProfileCard from '../../Settings/ProfileCard/ProfileCard';
import TextEditor from '@/components/TextEditor/TextEditor';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';

interface AboutBoardSectionProps {
  setTitle: (a: string) => void;
  setIsAboutBoardOpen: (a: boolean) => void;
  isAboutBoardOpen: boolean;
  descriptionBack: string;
  setDescription: (a: string) => void;
}

const AboutBoardSection: FC<AboutBoardSectionProps> = ({
  setTitle,
  setIsAboutBoardOpen,
  isAboutBoardOpen,
  descriptionBack,
  setDescription,
}) => {
  const members = useSelector((state: RootState) => state.members.members);
  return (
    <ExpandableContent
      setTitle={(e) => setTitle(e)}
      setIsOpen={(e) => setIsAboutBoardOpen(e)}
      isOpen={isAboutBoardOpen}
      title={'About the board'}
    >
      <p className='additional-menu__subtitle'>Board members:</p>
      <div className='flex additional-menu__row'>
        {members.map((member: any, i: number) => (
          <div className='additional-menu__member' key={i}>
            <ProfileCard userData={member} />
          </div>
        ))}
      </div>

      <p className='additional-menu__subtitle'>Description:</p>
      <TextEditor
        title={'write some words about the board'}
        hasComments={false}
        firebaseDescription={descriptionBack}
        getHTML={(e) => setDescription(e)}
      />
    </ExpandableContent>
  );
};

export default AboutBoardSection;
