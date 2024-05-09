'use client';
import {FC, useEffect, useState} from 'react';
import './CountryList.scss';

interface CountriesProps {
  name: string;
  flags: string;
}

interface CountryListProps {
  getCountry: (value: string) => void;
  currentCountry?: string;
}
const CountryList: FC<CountryListProps> = ({getCountry, currentCountry}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [countries, setCountries] = useState<Array<CountriesProps>>([]);
  useEffect(() => {
    getCountry(title);
  }, [title]);
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all', {cache: 'force-cache'})
      .then((res) => res.json())
      .then((data) => {
        const sortedCountries = data
          .map((country: any) => ({
            name: country.name.common,
            flags: country.flags.svg,
          }))
          .sort((a: any, b: any) => {
            return a.name.localeCompare(b.name);
          });
        setCountries(sortedCountries);
      });
  }, []);
  return (
    <div className='country-list'>
      <div className='country-list__container'>
        <div
          className={`country-list__title ${isOpen ? 'active' : ''}`}
          onClick={(e) => setIsOpen(!isOpen)}
        >
          {title || currentCountry || 'Select your country'}
        </div>
        {isOpen && (
          <div className='country-list__box'>
            {countries.map((country, i) => (
              <div
                key={i}
                className='country-list__item'
                onClick={(_e) => {
                  setIsOpen(!isOpen);
                  setTitle(country.name);
                }}
              >
                <span
                  className='country-list__flag'
                  style={{
                    background: `center/cover no-repeat url(${country.flags})`,
                  }}
                ></span>
                {country.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CountryList;
