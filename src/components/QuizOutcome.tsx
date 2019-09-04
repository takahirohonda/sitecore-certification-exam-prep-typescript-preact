import { h } from 'preact';
import {
  SC_QUIZ,
  PASSED_TEXT,
  NOT_PASSED_TEXT,
  YOUR_SCORE_TEXT,
  START_AGAIN_BUTTON_TEXT,
  PASS_SCORE
} from '../constants/constantValues';
import { IAnsweredQuestion } from '../types/interfaces';
import QuizButton from '../components/QuizButton';

interface IQuizOutcome {
  answeredQuestionList: Array<IAnsweredQuestion>;
  onClickHandler: () => void;
}

const calculatePassRate = (answeredQuestionList: Array<IAnsweredQuestion>): number => {
  const correctAnswers = answeredQuestionList.filter(list => list.correct);
  return Math.floor((100*correctAnswers.length)/answeredQuestionList.length);
};

const getOutcomeMessage = (score: number): string => {
  return score >= PASS_SCORE ? PASSED_TEXT : NOT_PASSED_TEXT;
};

const QuizOutcome = ({answeredQuestionList, onClickHandler}: IQuizOutcome) => {
  const score = calculatePassRate(answeredQuestionList);
  const outcomeMessage = getOutcomeMessage(score);
  return (
    <div>
      <div>
        <h3>{outcomeMessage}</h3>
        <h4>{YOUR_SCORE_TEXT} {score}%</h4>
      </div>
      <div>
        <QuizButton
          className={`${SC_QUIZ}btn-control ${SC_QUIZ}btn-confirm`}
          disabled={false}
          buttonText={START_AGAIN_BUTTON_TEXT}
          onClickHandler={onClickHandler}
        />
      </div>
    </div>
  );
};

export default QuizOutcome;
