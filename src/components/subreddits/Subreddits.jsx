import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSubreddits, selectIsLoading, fetchSubreddits } from '../../features/subreddits/subredditsSlice';
import Subreddit from './Subreddit';

function Subreddits() {

  const subreddits = useSelector(selectSubreddits);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSubreddits());
  }, [dispatch]);

  const renderSubreddits = () => {
    if(isLoading) {
      //render five empty posts for skeleton
      return (
        <div className='subreddit-content'>
          <Subreddit isSkeleton='true'/>
          <Subreddit isSkeleton='true'/>
          <Subreddit isSkeleton='true'/>
          <Subreddit isSkeleton='true'/>
          <Subreddit isSkeleton='true'/>
        </div>
      )
    }
    else {
      return (
        <div className='subreddit-content'>
          {subreddits.map((subreddit) => <Subreddit subreddit={subreddit} key={subreddit.id} />)}
        </div>
      );
    }
  }

  return (
      <div className='subreddits'>
        <div className='no-matches-text'>
          <h2>Subreddits</h2>
        </div>
        {renderSubreddits()}
      </div>
  );
}

export default Subreddits;