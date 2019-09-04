import { QUIZ_TITLE } from '../constants/constantValues';
import { h } from 'preact';
import { SC_QUIZ } from '../constants/constantValues';

const Header = () => {
  return (
    <h3 class={`${SC_QUIZ}quiz-title`}>{QUIZ_TITLE} </h3>
  );
};

export default Header;
