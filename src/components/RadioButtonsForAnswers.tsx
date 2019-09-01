import { h, Fragment } from 'preact';
import { SC_QUIZ } from '../constants/constantValues';
import {
  IAnswerOptions,
  IAnswerOption,
  IQuestion,
  IAnsweredQuestion
} from '../types/interfaces';
import AnswerResultMessage from '../components/AnswerResultMessage';

interface IRadioButtonForAnswersProps {
  currentQuestionData: IQuestion | IAnsweredQuestion;
  currentAnswer: string;
  feedback: string;
  onChangeHandler: (value: string) => void;
  currentAnswerSubmitted: boolean;
}

const RadioButtonForAnswers = ({
  currentQuestionData,
  currentAnswer,
  feedback,
  onChangeHandler,
  currentAnswerSubmitted
}: IRadioButtonForAnswersProps) => {
  return (
    <Fragment>
      {currentAnswerSubmitted &&
        <AnswerResultMessage
          correct={(currentQuestionData as IAnsweredQuestion).correct}
          feedback={feedback}
        />
      }
      <div className={`${SC_QUIZ}choices-radio-container`}>
      {currentQuestionData.answerOptions.map((answerOption: IAnswerOption): JSX.Element => {
          return (
            <div className={`${SC_QUIZ}radio-button`}>
              <input
                type="radio"
                className={`${SC_QUIZ}radio-input`}
                id={answerOption.id}
                name="answer"
                value={answerOption.id}
                checked={currentAnswer === answerOption.id}
                onChange={e => onChangeHandler((e.target as HTMLInputElement).value)}
              />
              <label className={`${SC_QUIZ}radio-label`} htmlFor={answerOption.id}>
                <div className={`${SC_QUIZ}radio-square-button`}><span style="opacity:0">Ans</span></div>
                <div className={`${SC_QUIZ}radio-label-text`}>
                {answerOption.option}
                </div>
              </label>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default RadioButtonForAnswers;