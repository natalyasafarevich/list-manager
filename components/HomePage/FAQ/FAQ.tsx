import {FC} from 'react';
import './FAQ.scss';
import AccordionItem from './AccordionItem/AccordionItem';
import Link from 'next/link';

const faq = [
  {
    title: 'Can I attach files to tasks?',
    desc: 'Yes, you can attach files to tasks to store documents, images or other necessary materials.',
  },
  {
    title: 'How do I add users to the list of tasks to work with?',
    desc: 'To add users, select a list of tasks, go to the list settings and select the «Invite participants» option, then enter the users e-mail addresses.',
  },
  {
    title: 'Can I assign different access levels to participants?',
    desc: 'Yes, you can assign member roles such as administrator, member, and guest, with different levels of access and rights.',
  },
];

const FAQ: FC = () => {
  return (
    <div className='faq'>
      <div className='faq__container container  '>
        <div className='faq__row flex'>
          <div className='faq__accordion'>
            {faq.map((item, i) => (
              <div key={i} className='faq__item'>
                <AccordionItem title={item.title}>
                  <p>{item.desc}</p>
                </AccordionItem>
              </div>
            ))}
          </div>
          <div className='faq__box'>
            <p className='faq__title'>How we can help you?</p>

            <Link href={'/assistance'} className='faq__link'>
              more FAQ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
