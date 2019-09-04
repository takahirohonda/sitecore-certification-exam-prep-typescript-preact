import QuestionForm from '../QuestionForm';
import { IStoreState, IAnsweredQuestion } from '../../types/interfaces';
import * as actions from '../../actions';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { currentQuestionNumber } from '../../reducers';

const mapStateToProps = (state: IStoreState) => ({
  state
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onfetchInitialQuestionList: () => {
    dispatch(actions.fetchInitialQuestionList());
  },
  onRadioChangeHandler: (value: string) => {
    dispatch(actions.updateCurrentAnswer(value));
  },
  onAnsweredQuestionToList: (answeredQuestionList: IAnsweredQuestion) => {
    dispatch(actions.addAnsweredQuestionToList(answeredQuestionList));
  },
  onUpdateAnsweredQuestionToList: (answeredQuestionList: IAnsweredQuestion) => {
    dispatch(actions.updateAnsweredQuestionToList(answeredQuestionList));
  },
  onClear: (index: number) => {
    dispatch(actions.updateCurrentAnswerSubmitted(false));
    dispatch(actions.updateCurrentAnswer(''));
    dispatch(actions.deleteAnsweredQuestionToList(index));
  },
  onUpdateCurrentQuestionNumber: (currentQuestionNumber: number) => {
    dispatch(actions.updateCurrentQuestionNumber(currentQuestionNumber));
  },
  onUpdateProgreeCounter: (progressCounter: number) => {
    dispatch(actions.updateProgressCounter(progressCounter));
  },
  onUpdateCurrentAnswerSubmitted: (bool: boolean) => {
    dispatch(actions.updateCurrentAnswerSubmitted(bool));
  },
  onClearCurrentAnswer: () => {
    dispatch(actions.updateCurrentAnswer(''));
  },
  onUpdateQuizCompleted: () => {
    dispatch(actions.updateQuizCompleted(true));
  },
  onStartAgain: () => {
    dispatch(actions.startAgain());
    dispatch(actions.fetchInitialQuestionList());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionForm);
