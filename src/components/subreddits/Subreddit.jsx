import './subreddits.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedSubreddit, selectSelectedSubreddit } from '../../features/filter/filterSlice';
import defaultSubredditIcon from './default-subreddit-icon.png';

function Subreddit(props) {

  const selectedSubreddit = useSelector(selectSelectedSubreddit);

  const subreddit = props.subreddit;
  const isSkeleton = props.isSkeleton;

  const dispatch = useDispatch();

  const handleOnClick = () => {
    dispatch(setSelectedSubreddit(subreddit.displayName));
  }

  return (
    <SkeletonTheme inline='true'>
      <button className={!isSkeleton && selectedSubreddit === subreddit.displayName ? 'subreddit-button selected' : 'subreddit-button'} onClick={handleOnClick}>
        <div className='subreddit-logo-container'>
          {!isSkeleton ? 
            <img src={subreddit.iconUrl || defaultSubredditIcon} alt='Subreddit Logo' /> :
            <Skeleton className='skeleton-subreddit-logo' /> }
        </div>
        <div className='subreddit-text-container'>
          <span className='subreddit-text'>{!isSkeleton ? 'r/'+subreddit.displayName : <Skeleton className='skeleton-subreddit' />}</span>
        </div>
      </button>
    </SkeletonTheme>
  );
}

export default Subreddit;