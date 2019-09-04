import QuizStartPage from '../QuizStartPage';
import { IStoreState } from '../../types/interfaces';
import * as actions from '../../actions';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

const mapStateToProps = (state: IStoreState) => ({
  state
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onUpdateTotalQuestions: (value: number) => {
    dispatch(actions.updateTotalQuestions(value));
  },
  onUpdateQuestionOrder: (questionOrder: Array<number>) => {
    dispatch(actions.updateQuestionOrder(questionOrder));
  },
  onUpdateQuizStarted: (quizStarted: boolean) => {
    dispatch(actions.updateQuizStarted(quizStarted));
  },
  onUpdateQuizOption: (quizOption: string) => {
    dispatch(actions.updateQuizOption(quizOption));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizStartPage);

