'use client';
import {FC, useEffect, useState} from 'react';
import './ContactsInput.scss';
export interface ContactLinkItem {
  id: string;
  type: 'telegram' | 'instagram' | 'facebook' | 'codePan' | 'linkedIn'; // Указываем конкретные значения для типа
  placeholder: string;
}
interface ContactsInputProps {
  item: ContactLinkItem;
  inputValue: string;
  currentValue: (value: string) => void;
}

const ContactsInput: FC<ContactsInputProps> = ({
  item,
  currentValue,
  inputValue,
}) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    setValue(inputValue);
  }, [inputValue]);
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const {value: inputValue} = e.currentTarget;
    currentValue(inputValue);
    setValue(inputValue);

    const regex = /^[^\s,]+$/;
    const isValid = regex.test(inputValue);

    setError(isValid ? '' : 'Please avoid using spaces and commas.');
    !inputValue.length && setError('');
  };
  return (
    <div className='contact-input'>
      <div className='contact-input__box flex'>
        <label
          htmlFor={item.id}
          className={`contact-input__label icon-social icon-social__${item.type}`}
        ></label>
        <input
          id={item.id}
          className={`default-input  default-input_${error ? 'error' : ''} contact-input__input `}
          value={value}
          onChange={handleChange}
          type='text'
          placeholder={item.placeholder}
        />
      </div>
      <p className='text-error'>{error}</p>
    </div>
  );
};

export default ContactsInput;
