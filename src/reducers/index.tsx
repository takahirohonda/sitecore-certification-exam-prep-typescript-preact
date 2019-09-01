import { AppActions } from '../actions';
import * as C from '../constants';
import { combineReducers } from 'redux';
import { initialState } from './initialState';
import { IQuestion, IAnsweredQuestion } from '../types/interfaces';

export const questionList = (
  state: Array<IQuestion> = initialState.questionList,
  action: AppActions
  ): Array<IQuestion> => {
  switch(action.type) {
    case C.LOAD_QUESTION_LIST:
      return action.payload;
  }
  return state;
};

export const answeredQuestionList = (
  state: Array<IAnsweredQuestion> = initialState.answeredQuestionList,
  action: AppActions
): Array<IAnsweredQuestion> => {
  switch(action.type) {
    case C.ADD_ANSWERED_QUESTION_TO_LIST:
      return [ ...state, action.payload ];

    case C.UPDATE_ANSWERED_QUESTION_TO_LIST:
      const clonedState = [ ...state ];
      const targetIdRemovedList = clonedState.filter(state => state.id !== action.payload.id);
      return [ ...targetIdRemovedList, action.payload ];

    case C.DELETE_ANSWERED_QUESTION_FROM_LIST:
      return state.filter(array => array.id !== action.payload);
  }
  return state;
};

export const currentQuestionNumber = (
  state: number = initialState.currentQuestionNumber,
  action: AppActions
): number => {
  switch(action.type) {
    case C.UPDATE_CURRENT_QUESTION_NUMBER:
      return action.payload;
  }
  return state;
};

export const progressCounter = (
  state: number = initialState.progressCounter,
  action: AppActions
): number => {
  switch(action.type) {
    case C.UPDATE_PROGRESS_COUNTER:
      return action.payload;
  }
  return state;
};

export const questionOrder = (
  state: Array<number> = initialState.questionOrder,
  action: AppActions
): Array<number> => {
  switch(action.type) {
    case C.UPDATE_QUESTION_ORDER:
      return action.payload;
  }
  return state;
};

export const currentAnswer = (
  state: string = initialState.currentAnswer,
  action: AppActions
): string => {
  switch(action.type) {
    case C.UPDATE_CURRENT_ANSWER:
      return action.payload;
  }
  return state;
};

export const currentAnswerSubmitted = (
  state: boolean = initialState.currentAnswerSubmitted,
  action: AppActions
): boolean => {
  switch(action.type) {
    case C.UPDATE_CURRENT_ANSWER_SUBMITTED:
      return action.payload;
  }
  return state;
};

export const correctAnswerCounter = (
  state: number = initialState.correctAnswerCounter,
  action: AppActions
): number => {
  switch(action.type) {
    case C.UPDATE_TOTAL_QUESTIONS:
      return action.payload;
  }
  return state;
};

export const totalQuestions = (
  state: number = initialState.totalQuestions,
  action: AppActions
): number => {
  switch(action.type) {
    case C.UPDATE_TOTAL_QUESTIONS:
      return action.payload;
  }
  return state;
};


export const randomiseQuestion = (
  state: boolean = initialState.randomiseQuestion,
  action: AppActions
): boolean => {
  switch(action.type) {
    case C.UPDATE_RANDOMISE_QUESTION:
      return action.payload;
  }
  return state;
};

export const practiceMode = (
  state: boolean = initialState.practiceMode,
  action: AppActions
): boolean => {
  switch(action.type) {
    case C.UPDATE_PRACTICE_MODE:
      return action.payload;
  }
  return state;
};

export const fetching = (
  state: boolean = initialState.fetching,
  action: AppActions
): boolean => {
  switch(action.type) {
    case C.UPDATE_FETCHING:
      return action.payload;
  }
  return state;
};

export const fetchingSuccess = (
  state: boolean = initialState.fetchingSuccess,
  action: AppActions
): boolean => {
  switch(action.type) {
    case C.UPDATE_FETCHING_SUCCESS:
      return action.payload;
  }
  return state;
};

export const quizCompleted = (
  state: boolean = initialState.quizCompleted,
  action: AppActions
): boolean => {
  switch(action.type) {
    case C.UPDATE_QUIZ_COMPLETED:
      return action.payload;
  }
  return state;
};

const appReducer = combineReducers({
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
});

const rootReducer = (state, action) => {
  if (action.type === C.START_AGAIN) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;