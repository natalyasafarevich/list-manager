import {motion, SVGMotionProps} from 'framer-motion';
import './HeaderIconPath.scss';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
interface PathProps extends SVGMotionProps<SVGPathElement> {}

const Path = (props: PathProps) => {
  const {uid} = useSelector((state: RootState) => state.userdata);
  return (
    <motion.path
      fill='transparent'
      strokeWidth='3'
      stroke={uid ? '#9A9A9A' : '#fff'}
      strokeLinecap='round'
      {...props}
    />
  );
};

interface MenuToggleProps {
  toggle: () => void;
}

export const HeaderIconPath = ({toggle}: MenuToggleProps) => {
  const {uid} = useSelector((state: RootState) => state.userdata);
  return (
    <button className={`header-icon-path ${uid ? 'dashboard' : ''}`} onClick={toggle}>
      <svg width='23' height='23' viewBox='0 0 23 23'>
        <Path
          variants={{
            closed: {d: 'M 2 2.5 L 20 2.5'},
            open: {d: 'M 3 16.5 L 17 2.5'},
          }}
        />
        <Path
          d='M 2 9.423 L 20 9.423'
          variants={{
            closed: {opacity: 1},
            open: {opacity: 0},
          }}
          transition={{duration: 0.1}}
        />
        <Path
          variants={{
            closed: {d: 'M 2 16.346 L 20 16.346'},
            open: {d: 'M 3 2.5 L 17 16.346'},
          }}
        />
      </svg>
    </button>
  );
};
