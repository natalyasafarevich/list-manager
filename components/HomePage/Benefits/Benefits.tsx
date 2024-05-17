import {FC} from 'react';
import './Benefits.scss';
import Image from 'next/image';
import {title} from 'process';

const benefits = [
  {title: 'Task Management', desc: 'Easily create, edit, and delete tasks.', src: '/ph_ruler-fill.svg'},
  {
    title: 'Real-Time Collaboration',
    desc: 'Invite colleagues and friends to collaborate on projects in real-time.',
    src: '/fluent_chess-20-filled.svg',
  },
  {
    title: 'Creating To-Do Lists',
    desc: 'Organize tasks into lists for different projects or goals.',
    src: '/fluent_target-arrow-16-filled.svg',
  },
  {
    title: 'Personalized Interface',
    desc: 'Customize the appearance of your task board to match your preferences.',
    src: '/heroicons-solid_lightning-bolt.svg',
  },
];

const Benefits: FC = () => {
  return (
    <div className='benefits'>
      <div className='benefits__container container'>
        <div className='benefits__row flex'>
          <div className='benefits__info'>
            <p className='benefits__title'>
              Benefits of Registration
              <span>
                Sign up to gain access to powerful tools for task management, creating to-do lists, and personalized
                recommendations. Enjoy enhanced productivity and ease in organizing your projects.
              </span>
            </p>
          </div>{' '}
          <div className='benefits__box'>
            {benefits.map((item, i) => (
              <div className='benefits__item' key={i}>
                <div className='benefits__icon'>
                  <Image src={item.src} width={40} height={40} alt='' />
                </div>
                <p className='benefits__name'>
                  {item.title}
                  <span>{item.desc}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Benefits;
