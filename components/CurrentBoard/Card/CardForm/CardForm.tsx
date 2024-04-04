import {RootState} from '@/store/store';
import {FC} from 'react';
import {useSelector} from 'react-redux';

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

const CardForm: FC<CardFormProps> = ({
  components,
  addComponents,
  setValue,
  saveComponents,
  isClick,
  isDisabled,
  value,
  setIsClick,
}) => {
  const user_status = useSelector(
    (state: RootState) => state.userdata.user_status,
  );
  return (
    <div className='d-flex align-items-start'>
      {components.map((component, i) => (
        <div
          // style={{
          //   minWidth: '280px',
          //   maxWidth: '280px',
          //   width: '100%',
          // }}
          key={i}
        >
          {component}
        </div>
      ))}
      <div className='d-block btn-outline-primary__'>
        {isClick ? (
          <form
            onSubmit={addComponents}
            className='border p-3 border-dark rounded'
          >
            <input
              type='text'
              placeholder='name of task'
              value={value}
              onChange={(e) => setValue(e.currentTarget.value)}
            />
            <button
              className='btn btn-outline-secondary d-block mt-2'
              type='submit'
              disabled={isDisabled}
            >
              save
            </button>
            <button
              onClick={(e) => {
                setIsClick(false);
                setValue('');
              }}
            >
              close
            </button>
          </form>
        ) : (
          user_status !== 'guest' && (
            <button
              onClick={saveComponents}
              className='btn btn-outline-primary'
            >
              создать список
            </button>
          )
        )}
      </div>
    </div>
  );
};
export default CardForm;
