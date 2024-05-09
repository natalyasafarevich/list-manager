import PopupMessage from '@/components/PopupMessage/PopupMessage';
import React, {useState} from 'react';

interface TaskInputProps {
  onSubmit: (title: string) => void;
  setIsOpen: (value: boolean) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({onSubmit, setIsOpen}) => {
  const [valueInput, setInputValue] = useState('');
  const [notification, setNotification] = useState({
    isError: false,
    type: 'error',
    title: 'Please fill in the field',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (valueInput.trim() === '') {
      setNotification((prev) => ({...prev, isError: true}));
      setTimeout(() => {
        setNotification((prev) => ({...prev, isError: false}));
      }, 4000);
      return;
    }
    onSubmit(valueInput.trim());
    setInputValue('');
  };

  return (
    <>
      {' '}
      {notification.isError && (
        <PopupMessage
          title={notification.title}
          messageType={notification.type}
        />
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='new-item' className='checkbox-form__label'>
            Title
          </label>
          <input
            id='new-item'
            type='text'
            className='default-input checkbox-form__input'
            value={valueInput}
            onChange={handleInputChange}
          />
        </div>
        <div className='checkbox-form__flex flex'>
          <button type='submit' className='checkbox-form__button button-dark'>
            Add
          </button>
          <button
            type='button'
            className='button-border checkbox-form__button'
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default TaskInput;
