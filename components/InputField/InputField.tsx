import {ChangeEvent, FC} from 'react';

interface InputFieldProps {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  errorText?: string;
  className?: string; // Добавляем опциональный пропс className
}

const InputField: FC<InputFieldProps> = ({
  label,
  id,
  type,
  placeholder,
  value,
  onChange,
  className,
  errorText,
}) => {
  return (
    <div>
      <label htmlFor={id} className='register__label'>
        {label}
      </label>
      <input
        className={className}
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {errorText && <p className='text-error'>{errorText}</p>}
    </div>
  );
};
export default InputField;
