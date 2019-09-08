import { h, Fragment, Component } from 'preact';
import {
  IQuizOptions,
  IStoreState
} from '../types/interfaces';
import {
  SC_QUIZ,
  OPTION_HEADER,
  QUIZ_START_BUTTON,
  QUIZ_OPTIONS,
  SHORT_NUMBER,
  MEDIUM_NUMBER,
  FULL_NUMBER
} from '../constants/constantValues';
import QuizButton from './QuizButton';
import RadioButtonsForAnswers from './RadioButtonsForAnswers';

interface IQuizStartPageProps {
  state: IStoreState;
  onUpdateTotalQuestions: (value: number) => void;
  onUpdateQuestionOrder: (questionOrder: Array<number>) => void;
  onUpdateQuizStarted: (quizStarted: boolean) => void;
  onUpdateQuizOption: (quizOption: string) => void;
}

class QuizStartPage extends Component<IQuizStartPageProps> {

  private addTotalQuestionNumber() {
    const totalQuestions = this.props.state.questionList.length;
    QUIZ_OPTIONS.answerOptions[3].option = `Do all questions (${totalQuestions} questions)`;
  }

  private getQuizOption(quizOption: string, totalQuizNumber: number) {
    switch(quizOption) {
      case QUIZ_OPTIONS.answerOptions[0].id:
        return SHORT_NUMBER;
      case QUIZ_OPTIONS.answerOptions[1].id:
        return MEDIUM_NUMBER;
      case QUIZ_OPTIONS.answerOptions[2].id:
        return FULL_NUMBER;
      case QUIZ_OPTIONS.answerOptions[3].id:
        return totalQuizNumber;
      default:
        return MEDIUM_NUMBER;
    }
  }

  private generateOrder(totalQuizListCount: number, totalQuestionCount: number) {
    const baseArray = Array.from(Array(totalQuizListCount).keys());
    return baseArray.sort(() => 0.5 - Math.random()).slice(0, totalQuestionCount);
  }

  private quizStart() {
    const {
      onUpdateTotalQuestions,
      onUpdateQuestionOrder,
      onUpdateQuizStarted,
    } = this.props;
    const {
      quizOption,
      questionList
    } = this.props.state;
    // Set total question number for the quiz
    const totalQuizListCount = questionList.length;
    const totalQuestionCount = this.getQuizOption(quizOption, totalQuizListCount);
    const questionOrderArray = this.generateOrder(totalQuizListCount, totalQuestionCount);

    // Dispatching Actions
    onUpdateTotalQuestions(totalQuestionCount);
    onUpdateQuestionOrder(questionOrderArray);
    onUpdateQuizStarted(true);
  }

  render() {
    const {
      onUpdateQuizOption
    } = this.props;
    const {
      quizStarted,
      quizOption
    } = this.props.state;
    // set the total questions
    this.addTotalQuestionNumber();
    return (
      <Fragment>
        <form className={`${SC_QUIZ}quiz-form`}>
          <div className={`${SC_QUIZ}question-container`}>
            <p className={`${SC_QUIZ}quiz-option-text`}>{OPTION_HEADER}</p>
          </div>
          <div className={`${SC_QUIZ}choices-container`}>
          <RadioButtonsForAnswers
            currentQuestionData={QUIZ_OPTIONS}
            currentAnswer={quizOption}
            feedback={''}
            onChangeHandler={onUpdateQuizOption}
            currentAnswerSubmitted={false}
            correctAnswer={''}
            extraClassNameForChoiceLabelText={`${SC_QUIZ}start-page-label-text`}
          />
          </div>
        </form>
        <div className={`${SC_QUIZ}btn-container`}>
          <div className={`${SC_QUIZ}btn-container-left`}>
          <QuizButton
            className={`${SC_QUIZ}btn-control ${SC_QUIZ}btn-confirm`}
            disabled={quizOption === '' ? true : false}
            buttonText={QUIZ_START_BUTTON}
            onClickHandler={() => this.quizStart()}
          />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default QuizStartPage;