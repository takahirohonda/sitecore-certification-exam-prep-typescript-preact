import * as C from '../constants';
import { IQuestion, IAnsweredQuestion } from '../types/interfaces';
import { Dispatch } from 'redux';
import { getData } from '../utils/loadInitialData';

interface ILoadQuestionList {
  type: C.LOAD_QUESTION_LIST;
  payload: Array<IQuestion>;
}

interface IAddAnsweredQuestionToList {
  type: C.ADD_ANSWERED_QUESTION_TO_LIST;
  payload: IAnsweredQuestion;
}

interface IUpdateAnsweredQuestionToList {
  type: C.UPDATE_ANSWERED_QUESTION_TO_LIST;
  payload: IAnsweredQuestion;
}

interface IDeleteAnsweredQuestionFromList {
  type: C.DELETE_ANSWERED_QUESTION_FROM_LIST;
  payload: number;
}

interface IUpdateCurrentQuestionNumber {
  type: C.UPDATE_CURRENT_QUESTION_NUMBER;
  payload: number;
}

interface IUpdateProgressCounter {
  type: C.UPDATE_PROGRESS_COUNTER;
  payload: number;
}

interface IUpdateQuestionOrder {
  type: C.UPDATE_QUESTION_ORDER;
  payload: Array<number>;
}


interface IUpdateCurrentAnswer {
  type: C.UPDATE_CURRENT_ANSWER;
  payload: string;
}

interface IUpdateCurrentAnswerSubmitted {
  type: C.UPDATE_CURRENT_ANSWER_SUBMITTED;
  payload: boolean;
}

interface IUpdateCorrectAnswerCounter {
  type: C.UPDATE_CORRECT_ANSWER_COUNTER;
  payload: number;
}

interface IUpdateTotalQuestions {
  type: C.UPDATE_TOTAL_QUESTIONS;
  payload: number;
}

interface IUpdateRandomisedQuestion {
  type: C.UPDATE_RANDOMISE_QUESTION;
  payload: boolean;
}

interface IUpdatePracticeMode {
  type: C.UPDATE_PRACTICE_MODE;
  payload: boolean;
}

interface IUpdateFetching {
  type: C.UPDATE_FETCHING;
  payload: boolean;
}

interface IUpdateFetchingSuccess {
  type: C.UPDATE_FETCHING_SUCCESS;
  payload: boolean;
}

interface IUpdateQuizCompleted {
  type: C.UPDATE_QUIZ_COMPLETED;
  payload: boolean;
}

interface IStartAgain {
  type: C.START_AGAIN;
}

export type AppActions =
ILoadQuestionList
| IAddAnsweredQuestionToList
| IUpdateAnsweredQuestionToList
| IDeleteAnsweredQuestionFromList
| IUpdateCurrentQuestionNumber
| IUpdateProgressCounter
| IUpdateQuestionOrder
| IUpdateCurrentAnswer
| IUpdateCurrentAnswerSubmitted
| IUpdateCorrectAnswerCounter
| IUpdateTotalQuestions
| IUpdateRandomisedQuestion
| IUpdatePracticeMode
| IUpdateFetching
| IUpdateFetchingSuccess
| IUpdateQuizCompleted
| IStartAgain;

export const loadQuestionList = (questionList: Array<IQuestion>)
: ILoadQuestionList => (
  {
    type: C.LOAD_QUESTION_LIST,
    payload: questionList
  }
);

export const fetchInitialQuestionList = () => async(dispatch: Dispatch) => {
  dispatch(updateFetching(true));
  try {
    const initialData = await getData();
    dispatch(updateFetching(false));
    console.log(initialData);
    dispatch(loadQuestionList(initialData));
    dispatch(updateFetchingSuccess(true));
  } catch {
    dispatch(updateFetching(false));
    dispatch(updateFetchingSuccess(false));
  }
};

export const addAnsweredQuestionToList = (answeredQuestion: IAnsweredQuestion)
: IAddAnsweredQuestionToList => (
  {
    type: C.ADD_ANSWERED_QUESTION_TO_LIST,
    payload: answeredQuestion
  }
);

export const updateAnsweredQuestionToList = (answeredQuestion: IAnsweredQuestion)
: IUpdateAnsweredQuestionToList => (
  {
    type: C.UPDATE_ANSWERED_QUESTION_TO_LIST,
    payload: answeredQuestion
  }
);

export const deleteAnsweredQuestionToList = (index: number)
: IDeleteAnsweredQuestionFromList => (
  {
    type: C.DELETE_ANSWERED_QUESTION_FROM_LIST,
    payload: index
  }
);

export const updateCurrentQuestionNumber = (currentQuestionNumber: number)
: IUpdateCurrentQuestionNumber => (
  {
    type: C.UPDATE_CURRENT_QUESTION_NUMBER,
    payload: currentQuestionNumber
  }
);

export const updateProgressCounter = (progressCounter: number)
: IUpdateProgressCounter => (
  {
    type: C.UPDATE_PROGRESS_COUNTER,
    payload: progressCounter
  }
);

export const updateQuestionOrder = (questionOrder: Array<number>)
: IUpdateQuestionOrder => (
  {
    type: C.UPDATE_QUESTION_ORDER,
    payload: questionOrder
  }
);

export const updateCurrentAnswer = (currentAnswer: string)
: IUpdateCurrentAnswer => (
  {
    type: C.UPDATE_CURRENT_ANSWER,
    payload: currentAnswer
  }
);


export const updateCurrentAnswerSubmitted = (currentAnswerSubmitted: boolean)
: IUpdateCurrentAnswerSubmitted => (
  {
    type: C.UPDATE_CURRENT_ANSWER_SUBMITTED,
    payload: currentAnswerSubmitted
  }
);

export const updateCorrectAnswerCounter = (counter: number)
: IUpdateCorrectAnswerCounter => (
  {
    type: C.UPDATE_CORRECT_ANSWER_COUNTER,
    payload: counter
  }
);

export const updateTotalQuestions = (total: number)
: IUpdateTotalQuestions => (
  {
    type: C.UPDATE_TOTAL_QUESTIONS,
    payload: total
  }
);


export const updateRandomiseQuestion = (randomised: boolean)
: IUpdateRandomisedQuestion => (
  {
    type: C.UPDATE_RANDOMISE_QUESTION,
    payload: randomised
  }
);

export const updatePracticeMode = (practiceMode: boolean)
: IUpdatePracticeMode => (
  {
    type: C.UPDATE_PRACTICE_MODE,
    payload: practiceMode
  }
);

export const updateFetching = (fetching: boolean)
: IUpdateFetching => (
  {
    type: C.UPDATE_FETCHING,
    payload: fetching
  }
);

export const updateFetchingSuccess = (fetchingSuccess: boolean)
: IUpdateFetchingSuccess => (
  {
    type: C.UPDATE_FETCHING_SUCCESS,
    payload: fetchingSuccess
  }
);

export const updateQuizCompleted = (quizCompleted: boolean)
: IUpdateQuizCompleted => (
  {
    type: C.UPDATE_QUIZ_COMPLETED,
    payload: quizCompleted
  }
);

export const startAgain = (): IStartAgain => (
  {
    type: C.START_AGAIN
  }
);
