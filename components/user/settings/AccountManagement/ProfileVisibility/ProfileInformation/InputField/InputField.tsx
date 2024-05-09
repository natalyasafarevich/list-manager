import {FC} from 'react';
import './InputField.scss';

interface InputFieldProps {
  value: string;
  changedValue: (value: string) => void;
  label: string;
  readOnly: boolean;
}
const InputField: FC<InputFieldProps> = ({
  value,
  changedValue,
  label,
  readOnly,
}) => {
  return (
    <div className='input-field'>
      <label className='input-field__label' htmlFor={label}>
        {label}
      </label>
      <input
        className='input-field__input'
        type='text'
        id={label}
        value={value}
        onChange={(e) => changedValue(e.target.value)}
        readOnly={readOnly}
      />
    </div>
  );
};

export default InputField;
