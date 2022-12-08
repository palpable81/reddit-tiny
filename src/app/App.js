import './App.css';
import Posts from '../components/posts/Posts';
import Header from '../components/header/Header';
import Subreddits from '../components/subreddits/Subreddits';

function App() {
  return (
    <div className="App">
      <Header />
      <div className='content'>
        <Subreddits />
        <Posts />
      </div>
    </div>
  );
}

export default App;
