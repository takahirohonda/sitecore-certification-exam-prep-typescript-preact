// Global prefix for CSS/HTML properties
export const SC_QUIZ = 'sc-quiz-';

// Content -quiz start page
export const OPTION_HEADER = 'Options';
export const QUIZ_START_BUTTON = 'Start Quiz';
export const SHORT_NUMBER = 10;
export const MEDIUM_NUMBER = 20;
export const FULL_NUMBER = 50;
export const QUIZ_OPTIONS = {
  answerOptions: [
    {
      id: "short",
      option: `Go for a quicky (${SHORT_NUMBER} questions)`
    },
    {
      id: "medium",
      option: `Try medium length (${MEDIUM_NUMBER} questions)`
    },
    {
      id: "full",
      option: `I'm ready for the exam (${FULL_NUMBER} questions)`
    },
    {
      id: "all",
      option: "Do all questions"
    }
  ]
};

// Content - quiz form
export const QUIZ_TITLE = 'Sitecore 9 Certification Prep Quiz';
export const ANSWER_CHOICE_HEADER = 'Answer Choices:';
export const ANSWER_CORRECT_MESSAGE = 'Correct';
export const ANSWER_WRONG_MESSAGE = 'Incorrect';
export const SUBMIT_BUTTON_TEXT = 'Submit';
export const CLEAR_BUTTON_TEXT = 'Clear';
export const PREVIOUS_BUTTON_TEXT = String.fromCharCode(8592) + ' Previous';
export const NEXT_BUTTON_TEXT = 'Next' + String.fromCharCode(8594);
export const COMPLETE_QUIZ_BUTTON_TEXT = 'Complete Quiz';

// Content - quiz outcome
export const PASSED_TEXT = 'Congratulations! You passed.';
export const PASS_SCORE = 80;
export const NOT_PASSED_TEXT = 'You did not pass. Try again!';
export const YOUR_SCORE_TEXT = 'Your score: ';
export const START_AGAIN_BUTTON_TEXT = 'Start again';

// class names
export const ANSWER_CORRECT_MESSAGE_CLASSNAME = `${SC_QUIZ}correct-msg`;
export const ANSWER_INCORRECT_MESSAGE_CLASSNAME = `${SC_QUIZ}incorrect-msg`;