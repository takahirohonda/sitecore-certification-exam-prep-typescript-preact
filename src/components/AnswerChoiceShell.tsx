import { h } from 'preact';
import { ANSWER_CHOICE_HEADER } from '../constants/constantValues';
import { SC_QUIZ } from '../constants/constantValues';

interface IAnswerChoiceShellProps {
  children: JSX.Element;
  currentQuestionNumber: number;
  totalQuestions: number;
}

const AnswerChoiceShell = ({
  children,
  currentQuestionNumber,
  totalQuestions
}  : IAnswerChoiceShellProps) => {
  return (
    <div className={`${SC_QUIZ}choices-container`}>
       <div className={`${SC_QUIZ}quiz-counter-container`}>
          <p className={`${SC_QUIZ}choices-title`}><i>{ANSWER_CHOICE_HEADER}</i></p>
          <p className={`${SC_QUIZ}quiz-counter`}>{currentQuestionNumber + 1}/{totalQuestions}</p>
        </div>
      {children}
    </div>
  );
};

export default AnswerChoiceShell;