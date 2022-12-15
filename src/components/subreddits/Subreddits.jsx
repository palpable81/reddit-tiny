import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSubreddits, selectIsLoading, selectHasError, fetchSubreddits } from '../../features/subreddits/subredditsSlice';
import { DEFAULT_SUBREDDIT_OBJ } from '../../api/reddit';
import Subreddit from './Subreddit';

function Subreddits() {

  const subreddits = useSelector(selectSubreddits);
  const isLoading = useSelector(selectIsLoading);
  const hasError = useSelector(selectHasError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSubreddits());
  }, [dispatch]);

  const renderSubreddits = () => {
    if(hasError) {
      return (<div className='error-message-text'>
                <h2>Error loading subreddits</h2>
              </div>
      );
    }
    else if(isLoading) {
      //render 20 empty subreddits for skeleton
      const skeletons = [];
      for (let i = 0; i < 20; i++) {
        skeletons.push(<Subreddit isSkeleton={true} key={i}/>);
      }
      return (
        <div className='subreddit-content'>
          {skeletons}
        </div>
      )
    }
    else {
      return (
        <div className='subreddit-content'>
          <Subreddit subreddit={DEFAULT_SUBREDDIT_OBJ} key={DEFAULT_SUBREDDIT_OBJ.id} />
          {subreddits.map((subreddit) => <Subreddit subreddit={subreddit} key={subreddit.id} />)}
        </div>
      );
    }
  }

  return (
      <div className='subreddits'>
        <div className='subreddits-heading'>
          <h2>Subreddits</h2>
        </div>
        {renderSubreddits()}
      </div>
  );
}

export default Subreddits;