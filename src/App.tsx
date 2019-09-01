import { h, Fragment } from 'preact';
import Header from './components/Header';
import QuestionFormContainer from './components/containers/QuestionFormContainer';
import Style from './components/Style';

const App = () => {
  return (
    <div id="wrapper">
      <Style />
      <Header />
      <QuestionFormContainer />
    </div>
  );
};

export default App;