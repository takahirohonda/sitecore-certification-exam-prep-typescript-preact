import { h } from 'preact';
import { ANSWER_CHOICE_HEADER } from '../constants/constantValues';
import { SC_QUIZ } from '../constants/constantValues';

interface IAnswerChoiceShellProps {
  children: JSX.Element;
}

const AnswerChoiceShell = ({children} : IAnswerChoiceShellProps) => {
  return (
    <div className={`${SC_QUIZ}choices-container`}>
      <p className={`${SC_QUIZ}choices-title`}><i>{ANSWER_CHOICE_HEADER}</i></p>
      {children}
    </div>
  );
};

export default AnswerChoiceShell;