export interface IStoreState {
  questionList: Array<IQuestion>;
  answeredQuestionList: Array<IAnsweredQuestion>;
  currentQuestionNumber: number;
  progressCounter: number;
  questionOrder: Array<number>;
  currentAnswer: '';
  currentAnswerSubmitted: boolean;
  correctAnswerCounter: number;
  totalQuestions: number;
  randomiseQuestion: boolean;
  practiceMode: boolean;
  fetching: boolean;
  fetchingSuccess: boolean;
  quizCompleted: boolean;
}

export interface IAnsweredQuestion {
  id: number;
  answerType: string;
  question: string;
  answerOptions: IAnswerOptions;
  correctAnswer: string;
  feedback: string;
  selecteddAnswer: string;
  correct: boolean;
}

export interface IQuestion {
  id: number;
  answerType: string;
  question: string;
  answerOptions: IAnswerOptions;
  correctAnswer: string;
  feedback: string;
}

export interface IAnswerOptions {
  answerOptions: Array<IAnswerOption>;
  map: (IAnswerOption) => any;
}

export interface IAnswerOption {
  id: string;
  option: string;
}
