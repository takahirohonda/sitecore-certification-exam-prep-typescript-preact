import { h, Component, Fragment } from 'preact';
import { IStoreState, IAnsweredQuestion } from '../types/interfaces';
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
import { answeredQuestionList } from '../reducers';

interface QuestionFormProps {
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

class QuestionForm extends Component<QuestionFormProps> {

  componentDidMount() {
    this.props.onfetchInitialQuestionList();
  }

  private checkAnswered(currentQuestionNumber) {
    console.log('checking checkAnswered function', this.props.state.answeredQuestionList.filter(list => list.id === currentQuestionNumber).length > 0);
    return this.props.state.answeredQuestionList
      .filter(list => list.id === currentQuestionNumber).length > 0
      ? true : false;
  }

  private getCurrentQuestionData() {
    const {
      questionList,
      answeredQuestionList,
      questionOrder,
      currentQuestionNumber
    } = this.props.state;

    return this.checkAnswered(currentQuestionNumber)
      ? answeredQuestionList[questionOrder[currentQuestionNumber]]
      : questionList[questionOrder[currentQuestionNumber]];
  }

  private submitQuiz() {
    const {
      questionList,
      answeredQuestionList,
      currentAnswer,
      currentQuestionNumber,
      questionOrder
    } = this.props.state;

    const {
      onAnsweredQuestionToList,
      onUpdateAnsweredQuestionToList,
      onUpdateCurrentAnswerSubmitted
    } = this.props;

    const currentQuestionData = questionList[questionOrder[currentQuestionNumber]];
    const correctAnswer = currentQuestionData.correctAnswer;
    const correct = correctAnswer === currentAnswer ? true : false;
    currentQuestionData['selecteddAnswer'] = currentAnswer;
    currentQuestionData['correct'] = correct;

    if (answeredQuestionList.filter(list => list.id === currentQuestionNumber)) {
      onUpdateAnsweredQuestionToList(currentQuestionData as IAnsweredQuestion);
      onUpdateCurrentAnswerSubmitted(true);
    } else {
      onAnsweredQuestionToList(currentQuestionData as IAnsweredQuestion);
      onUpdateCurrentAnswerSubmitted(true);
    }
  }

  private nextButtonClickHandler() {
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
      onUpdateCurrentQuestionNumber(currentQuestionNumber + 1);
      if (!this.checkAnswered(currentQuestionNumber + 1)) {
        onUpdateCurrentAnswerSubmitted(false);
        onClearCurrentAnswer();
      }
    }
  }

  private previousButtonClickHandler() {
    const {
      currentQuestionNumber,
      answeredQuestionList,
      questionOrder
    } = this.props.state;

    const {
      onUpdateCurrentQuestionNumber,
      onRadioChangeHandler,
      onUpdateCurrentAnswerSubmitted,
    } = this.props;
    onRadioChangeHandler(answeredQuestionList[questionOrder[currentQuestionNumber - 1]].selecteddAnswer);
    onUpdateCurrentQuestionNumber(currentQuestionNumber - 1);
    onUpdateCurrentAnswerSubmitted(true);
  }

  render() {
    const {
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

    const lastPage = totalQuestions - 1 === currentQuestionNumber;

    const currentQuestionData = this.getCurrentQuestionData();

    return (
      <Fragment>
      {fetchingSuccess && !quizCompleted &&
        <Fragment>
          <form className={`${SC_QUIZ}quiz-form`}>
            <div className={`${SC_QUIZ}question-container`}>
              <p className={`${SC_QUIZ}question-index`}>Q{currentQuestionNumber + 1}:</p>
              <p className={`${SC_QUIZ}question`}>
                {currentQuestionData.question}
              </p>
            </div>
            <AnswerChoiceShell>
              <RadioButtonForAnswers
                currentQuestionData={currentQuestionData}
                currentAnswer={currentAnswer}
                feedback={currentQuestionData.feedback}
                onChangeHandler={onRadioChangeHandler}
                currentAnswerSubmitted={currentAnswerSubmitted}
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
                disabled={progressCounter === 0 ? true: false}
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
                  onClickHandler={() => {onUpdateQuizCompleted();console.log('updatedQUizcompleted');}}
                />
              }
            </div>
          </div>
        </Fragment>
      }
      {
        quizCompleted &&
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