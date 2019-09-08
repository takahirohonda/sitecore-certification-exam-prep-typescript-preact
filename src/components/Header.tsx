import { QUIZ_TITLE } from '../constants/constantValues';
import { h } from 'preact';
import { SC_QUIZ } from '../constants/constantValues';

const Header = () => {
  return (
    <h2 class={`${SC_QUIZ}quiz-title`}>
      <img class={`${SC_QUIZ}quiz-title-image`} src="https://mydatahack.github.io/static/img/sitecore-quiz/sitecore-logo.PNG" />
      <span>{QUIZ_TITLE}</span>
    </h2>
  );
};

export default Header;
