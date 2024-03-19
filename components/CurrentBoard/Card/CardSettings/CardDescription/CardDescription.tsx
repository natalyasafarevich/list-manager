// CardDescription.tsx
import React, {FC} from 'react';
import TextEditor from '@/components/TextEditor/TextEditor';

interface CardDescriptionProps {
  description: string;
  setDescription: (value: string) => void;
}

const CardDescription: FC<CardDescriptionProps> = ({
  description,
  setDescription,
}) => {
  return (
    <div className='card-description'>
      <p>Описание</p>
      <TextEditor
        isArray={false}
        backDescription={description}
        getHTML={setDescription}
        title='Описание'
      />
    </div>
  );
};

export default CardDescription;
