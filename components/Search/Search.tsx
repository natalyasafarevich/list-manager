import {FC} from 'react';
import './Search.scss';

const Search: FC = () => {
  return (
    <form className='search'>
      <div className='search__box'>
        <input type='text' id='search' className='search__input' />
        <label htmlFor='search' className='search__icon'></label>
      </div>
    </form>
  );
};

export default Search;
