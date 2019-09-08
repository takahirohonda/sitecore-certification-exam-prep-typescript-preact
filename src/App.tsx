import { h, Fragment } from 'preact';
import { SC_QUIZ } from './constants/constantValues';
import Header from './components/Header';
import QuestionFormContainer from './components/containers/QuestionFormContainer';
import Style from './components/Style';

const App = () => {
  return (
    <div class={`${SC_QUIZ}wrapper`}>
      <Style />
      <Header />
      <QuestionFormContainer />
    </div>
  );
};

export default App;