import { h, Component, Fragment } from 'preact';
import { IStoreState, IAnsweredQuestion, IQuestion } from '../types/interfaces';
import {
  SC_QUIZ,
  SUBMIT_BUTTON_TEXT,
  CLEAR_BUTTON_TEXT,
  PREVIOUS_BUTTON_TEXT,
  NEXT_BUTTON_TEXT,
  COMPLETE_QUIZ_BUTTON_TEXT
} from '../constants/constantValues';
import AnswerChoiceShell from '../components/AnswerChoiceShell';
import RadioButtonForAnswers from '../components/RadioButtonsForAnswers';
import QuizButton from '../components/QuizButton';
import QuizOutcome from '../components/QuizOutcome';
import QuizStartPageContainer from './containers/QuizStartPageContainer';

interface IQuestionFormProps {
  state: IStoreState;
  onfetchInitialQuestionList: () => void;
  onRadioChangeHandler: (value: string) => void;
  onAnsweredQuestionToList: (answeredQuestionList: IAnsweredQuestion) =>  void;
  onUpdateAnsweredQuestionToList: (answeredQuestionList: IAnsweredQuestion) => void;
  onClear: (index: number) => void;
  onUpdateCurrentQuestionNumber: (currentQuestionNumber: number) => void;
  onUpdateProgreeCounter: (progressCounter: number) => void;
  onUpdateCurrentAnswerSubmitted: (bool: boolean) => void;
  onClearCurrentAnswer: () => void;
  onUpdateQuizCompleted: () => void;
  onStartAgain: () => void;
}

class QuestionForm extends Component<IQuestionFormProps> {

  componentDidMount() {
    this.props.onfetchInitialQuestionList();
  }

  private currentQuestionInAnsweredList(): boolean {
    return (this.props.state.answeredQuestionList
      .filter(list => list.id === this.getQuestionId(this.props.state.currentQuestionNumber))
      .length) > 0;
  }

  private nextQuestionInAnsweredList(): boolean {
    return (this.props.state.answeredQuestionList
      .filter(list => list.id === this.getQuestionId(this.props.state.currentQuestionNumber + 1)))
      .length > 0;
  }

  private getQuestionId(index: number): number {
    return this.props.state.questionOrder[index];
  }

  private getCurrentQuestionId(): number {
    return this.props.state.questionOrder[this.props.state.currentQuestionNumber];
  }

  private getCurrentAnsweredQuestion(): IAnsweredQuestion {
    return this.props.state.answeredQuestionList
      .filter(list => list.id === this.getCurrentQuestionId())[0];
  }

  private getPreviousAnsweredQuestion(): IAnsweredQuestion {
    return this.props.state.answeredQuestionList
      .filter(list => list.id === this.getQuestionId(this.props.state.currentQuestionNumber -1))[0];
  }


  private getCurrentQuestionFromList(): IQuestion {
    return this.props.state.questionList
      .filter(list => list.id === this.getCurrentQuestionId())[0];
  }

  private getCurrentQuestionData(): IQuestion | IAnsweredQuestion {
    return this.currentQuestionInAnsweredList()
      ? this.getCurrentAnsweredQuestion()
      : this.getCurrentQuestionFromList();
  }

  private submitQuiz(): void {
    const {
      onAnsweredQuestionToList,
      onUpdateAnsweredQuestionToList,
      onUpdateCurrentAnswerSubmitted
    } = this.props;

    const currentQuestionData = this.getCurrentQuestionFromList();
    const correctAnswer = currentQuestionData.correctAnswer;
    const correct = correctAnswer === this.props.state.currentAnswer ? true : false;
    currentQuestionData['selecteddAnswer'] = this.props.state.currentAnswer;
    currentQuestionData['correct'] = correct;

    if (this.currentQuestionInAnsweredList()) {
      onUpdateAnsweredQuestionToList(currentQuestionData as IAnsweredQuestion);
      onUpdateCurrentAnswerSubmitted(true);
    } else {
      onAnsweredQuestionToList(currentQuestionData as IAnsweredQuestion);
      onUpdateCurrentAnswerSubmitted(true);
    }
  }

  private nextButtonClickHandler(): void {
    const {
      currentQuestionNumber,
      progressCounter,
      currentAnswerSubmitted
    } = this.props.state;

    const {
      onUpdateCurrentQuestionNumber,
      onUpdateProgreeCounter,
      onUpdateCurrentAnswerSubmitted,
      onClearCurrentAnswer
    } = this.props;

    if (currentAnswerSubmitted && progressCounter === currentQuestionNumber) {
      onUpdateProgreeCounter(progressCounter + 1);
      onUpdateCurrentQuestionNumber(progressCounter + 1);
      onUpdateCurrentAnswerSubmitted(false);
      onClearCurrentAnswer();
    } else if (currentAnswerSubmitted && progressCounter > currentQuestionNumber) {
      if (!this.nextQuestionInAnsweredList()) {
        onUpdateCurrentAnswerSubmitted(false);
        onClearCurrentAnswer();
      }
      onUpdateCurrentQuestionNumber(currentQuestionNumber + 1);
    }
  }

  private previousButtonClickHandler() {
    const { currentQuestionNumber } = this.props.state;

    const {
      onUpdateCurrentQuestionNumber,
      onRadioChangeHandler,
      onUpdateCurrentAnswerSubmitted,
    } = this.props;

    const answeredQuestion = this.getPreviousAnsweredQuestion();
    onRadioChangeHandler(answeredQuestion.selecteddAnswer);
    onUpdateCurrentQuestionNumber(currentQuestionNumber - 1);
    onUpdateCurrentAnswerSubmitted(true);
  }

  render() {
    const {
      quizStarted,
      questionList,
      answeredQuestionList,
      currentQuestionNumber,
      progressCounter,
      questionOrder,
      currentAnswer,
      currentAnswerSubmitted,
      correctAnswerCounter,
      totalQuestions,
      randomiseQuestion,
      practiceMode,
      fetching,
      fetchingSuccess,
      quizCompleted
    } = this.props.state;

    const {
      onRadioChangeHandler,
      onClear,
      onUpdateQuizCompleted,
      onStartAgain
    } = this.props;

    const lastPage = totalQuestions -1 === currentQuestionNumber;

    const currentQuestionData = this.getCurrentQuestionData();

    return (
      <Fragment>
      {fetchingSuccess && !quizCompleted && !quizStarted &&
        <QuizStartPageContainer />
      }
      {fetchingSuccess && !quizCompleted && quizStarted &&
        <Fragment>
          <form className={`${SC_QUIZ}quiz-form`}>
            <div className={`${SC_QUIZ}question-container`}>
              <p className={`${SC_QUIZ}question-index`}>Q{currentQuestionNumber + 1}:</p>
              <p className={`${SC_QUIZ}question`}>
                {currentQuestionData.question}
              </p>
            </div>
            <div className={`${SC_QUIZ}quiz-counter-container`}>
              <p className={`${SC_QUIZ}quiz-counter`}>{currentQuestionNumber + 1}/{totalQuestions}</p>
            </div>
            <AnswerChoiceShell>
              <RadioButtonForAnswers
                currentQuestionData={currentQuestionData}
                currentAnswer={currentAnswer}
                feedback={currentQuestionData.feedback}
                onChangeHandler={onRadioChangeHandler}
                currentAnswerSubmitted={currentAnswerSubmitted}
                correctAnswer={currentQuestionData.correctAnswer}
              />
            </AnswerChoiceShell>
          </form>
          <div className={`${SC_QUIZ}btn-container`}>
            <div className={`${SC_QUIZ}btn-container-left`}>
              {practiceMode &&
                <Fragment>
                  <QuizButton
                    className={`${SC_QUIZ}btn-control ${SC_QUIZ}btn-confirm`}
                    disabled={currentAnswer === '' ? true : false}
                    buttonText={SUBMIT_BUTTON_TEXT}
                    onClickHandler={() => this.submitQuiz()}
                  />
                  <QuizButton
                    className={`${SC_QUIZ}btn-control ${SC_QUIZ}btn-clear`}
                    disabled={currentAnswer === '' ? true : false}
                    buttonText={CLEAR_BUTTON_TEXT}
                    onClickHandler={() => onClear(questionOrder[currentQuestionNumber])}
                  />
                </Fragment>
              }
            </div>
            <div className="${SC_QUIZ}btn-container-right">
              <QuizButton
                className={`${SC_QUIZ}btn-control ${SC_QUIZ}btn-direction ${SC_QUIZ}btn-previous`}
                disabled={currentQuestionNumber === 0 ? true: false}
                buttonText={PREVIOUS_BUTTON_TEXT}
                onClickHandler={() => this.previousButtonClickHandler()}
              />
              {!lastPage &&
                <QuizButton
                className={`${SC_QUIZ}btn-control ${SC_QUIZ}btn-direction ${SC_QUIZ}btn-next`}
                disabled={totalQuestions - 1 === currentQuestionNumber || !currentAnswerSubmitted ? true: false}
                buttonText={NEXT_BUTTON_TEXT}
                onClickHandler={() => this.nextButtonClickHandler()}
                />
              }
              {lastPage &&
                <QuizButton
                  className={`${SC_QUIZ}btn-control ${SC_QUIZ}btn-confirm`}
                  disabled={!currentAnswerSubmitted ? true: false}
                  buttonText={COMPLETE_QUIZ_BUTTON_TEXT}
                  onClickHandler={() => {onUpdateQuizCompleted();}}
                />
              }
            </div>
          </div>
        </Fragment>
      }
      {
        quizCompleted && quizStarted &&
        <QuizOutcome
          answeredQuestionList={answeredQuestionList}
          onClickHandler={() => onStartAgain()}
        />
      }
      </Fragment>
    );
  }
}

export default QuestionForm;