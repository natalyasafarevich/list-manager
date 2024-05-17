import {FC} from 'react';
import './HomePage.scss';
import Preview from './Preview/Preview';
import Benefits from './Benefits/Benefits';
import Examples from './Examples/Examples';
import FAQ from './FAQ/FAQ';
import About from './About/About';
import {motion} from 'framer-motion';
import {useInView} from 'react-intersection-observer';
const items = [
  {id: 1, title: 'Item 1', subtitle: 'Subtitle 1'},
  {id: 2, title: 'Item 2', subtitle: 'Subtitle 2'},
  {id: 3, title: 'Item 3', subtitle: 'Subtitle 3'},
];

const HomePage: FC = () => {
  const {ref, inView} = useInView({
    triggerOnce: false,
    threshold: 0.01,
  });
  return (
    <div>
      <Preview />
      <Benefits />
      <Examples />
      <FAQ />
      <div className='' ref={ref}>
        <span>v</span>
        {inView && (
          // <motion.div initial={{opacity: 0, scale: 0.5}} animate={{opacity: 1, scale: 1}} transition={{duration: 0.5}}>
          <About />
          // </motion.div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
