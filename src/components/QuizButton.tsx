import { h } from 'preact';

const QuizButton = ({
  className,
  onClickHandler,
  buttonText,
  disabled
}) => {

  return (
    <button
      type="buttom"
      className={disabled ? className + ' disabled' : className}
      disabled={disabled}
      onClick={onClickHandler}
    >{buttonText}
    </button>
  );
};

export default QuizButton;