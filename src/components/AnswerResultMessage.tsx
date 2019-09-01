import { h, Fragment } from 'preact';
import {
  SC_QUIZ,
  ANSWER_CORRECT_MESSAGE,
  ANSWER_WRONG_MESSAGE,
  ANSWER_CORRECT_MESSAGE_CLASSNAME,
  ANSWER_INCORRECT_MESSAGE_CLASSNAME
} from '../constants/constantValues';

interface IAnswerResultMessageProps {
  correct: boolean;
  feedback: string;
}

const AnswerResultMessage = ({correct, feedback}: IAnswerResultMessageProps) => {
  return (
    <Fragment>
      <p class={correct ? ANSWER_CORRECT_MESSAGE_CLASSNAME : ANSWER_INCORRECT_MESSAGE_CLASSNAME}>
        {correct ? ANSWER_CORRECT_MESSAGE : ANSWER_WRONG_MESSAGE}
      </p>
      <p class={`${SC_QUIZ}feedback-message`}>
        {feedback}
      </p>
    </Fragment>
  );
};

export default AnswerResultMessage;
