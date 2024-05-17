import {FC} from 'react';
import './HomePage.scss';
import Preview from './Preview/Preview';
import Benefits from './Benefits/Benefits';
import Examples from './Examples/Examples';
const items = [
  {id: 1, title: 'Item 1', subtitle: 'Subtitle 1'},
  {id: 2, title: 'Item 2', subtitle: 'Subtitle 2'},
  {id: 3, title: 'Item 3', subtitle: 'Subtitle 3'},
];

const HomePage: FC = () => {
  return (
    <div>
      <Preview />
      <Benefits />
      <Examples />
    </div>
  );
};

export default HomePage;
