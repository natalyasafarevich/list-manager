import {RootState} from '@/store/store';
import {FC} from 'react';
import {useSelector} from 'react-redux';
import './ColumnCreatorForm.scss';

interface CardFormProps {
  components: any[];
  addComponents: (e: React.FormEvent<HTMLFormElement>) => void;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  saveComponents: () => void;
  isClick: boolean;
  isDisabled: boolean;
  value: string;
  setIsClick: React.Dispatch<React.SetStateAction<boolean>>;
}

const ColumnCreatorForm: FC<CardFormProps> = ({
  components,
  addComponents,
  setValue,
  saveComponents,
  isClick,
  isDisabled,
  value,
  setIsClick,
}) => {
  const user_status = useSelector((state: RootState) => state.userdata);
  const isLoggedIn = !!user_status.uid && user_status.user_status !== 'guest';
  return (
    <div className='column-create-form'>
      <div className='column-create-form__container'>
        <div className='column-create-form__row flex'>
          {components.map((component, i) => (
            <div className='column-create-form__column' key={i}>
              {component}
            </div>
          ))}
          <div className='column-create-form__box'>
            {isClick ? (
              <form
                onSubmit={addComponents}
                className='column-create-form__form'
              >
                <label
                  htmlFor='column-name'
                  className='column-create-form__label'
                >
                  Title
                </label>
                <input
                  className='column-create-form__input default-input'
                  type='text'
                  id='column-name'
                  placeholder='Write a task title'
                  value={value}
                  onChange={(e) => setValue(e.currentTarget.value)}
                />
                <div className='column-create-form__flex flex'>
                  <button
                    className='button-dark'
                    type='submit'
                    disabled={isDisabled}
                  >
                    Create
                  </button>
                  <button
                    className='button-border '
                    onClick={(e) => {
                      setIsClick(false);
                      setValue('');
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              // isLoggedIn && (
              <p
                onClick={saveComponents}
                className='column-create-form__button'
              >
                Create a list
              </p>
              // )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ColumnCreatorForm;
