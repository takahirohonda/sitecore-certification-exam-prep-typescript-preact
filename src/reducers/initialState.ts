import { IStoreState } from '../types/interfaces';

export const initialState: IStoreState = {
  quizStarted: false,
  quizOption: '',
  questionList: [],
  answeredQuestionList: [],
  currentQuestionNumber: 0,
  progressCounter: 0,
  questionOrder: [0, 1, 2, 3, 4],
  currentAnswer: '',
  currentAnswerSubmitted: false,
  correctAnswerCounter: 0,
  totalQuestions: 4,
  randomiseQuestion: false,
  practiceMode: true,
  fetching: false,
  fetchingSuccess: false,
  quizCompleted: false
};