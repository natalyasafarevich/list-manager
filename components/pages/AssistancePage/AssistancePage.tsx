import {FC} from 'react';
import './AssistancePage.scss';
import AccordionItem from '@/components/HomePage/FAQ/AccordionItem/AccordionItem';
import {assistanceQuestions} from '@/variables/assistance-questions';

const AssistancePage: FC = () => {
  return (
    <div className='assistance-page'>
      <div className='assistance-page__container'>
        <p className='assistance-page__title title-large-72'>Assistance</p>
        <p className='assistance-page__desc'>
          Welcome to the support page for our project management service! We are here to help you make the most of our
          tool's features. Below you will find answers to frequently asked questions and instructions on how to use the
          main features.
        </p>
        <div className='assistance-page__accordion'>
          {assistanceQuestions.map((question, i) => (
            <div key={i} className='assistance-page__box'>
              <p className='assistance-page__name text-green-large text-underline'>{question.name}</p>

              {question.info.map((item, i) => (
                <div key={i} className='assistance-page__item'>
                  <AccordionItem title={item.title}>
                    <p>{item.desc}</p>
                  </AccordionItem>
                </div>
              ))}
            </div>
          ))}
        </div>
        <p>
          We hope this information proves helpful and assists you in effectively utilizing our service. If you have any
          further questions, feel free to reach out to us for assistance!
        </p>
      </div>
    </div>
  );
};
export default AssistancePage;
