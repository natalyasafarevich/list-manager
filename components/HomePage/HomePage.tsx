import {FC} from 'react';
import './HomePage.scss';
import Preview from './Preview/Preview';
import Benefits from './Benefits/Benefits';
import Examples from './Examples/Examples';
import FAQ from './FAQ/FAQ';
import About from './About/About';
import Footer from '../Footer/Footer';

const HomePage: FC = () => {
  return (
    <div>
      <Preview />
      <Benefits />
      {/* <Examples /> */}
      <About />
      <FAQ />
      <Footer />
    </div>
  );
};

export default HomePage;
