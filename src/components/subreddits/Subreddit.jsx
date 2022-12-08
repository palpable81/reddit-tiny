import './subreddits.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import defaultSubredditIcon from './default-subreddit-icon.png';

function Subreddit(props) {

  const subreddit = props.subreddit;
  const isSkeleton = props.isSkeleton;

  return (
    <SkeletonTheme inline='true'>
        <div className='subreddit-container'>
          <div className='subreddit-logo-container'>
            {!isSkeleton ? 
              <img src={subreddit.iconUrl || defaultSubredditIcon} alt='Subreddit Logo' /> :
              <Skeleton className='skeleton-subreddit-logo' /> }
          </div>
          <div className='subreddit-text-container'>
            <span className='subreddit-text'>{!isSkeleton ? 'r/'+subreddit.displayName : <Skeleton className='skeleton-subreddit' />}</span>
          </div>
        </div>
    </SkeletonTheme>
  );
}

export default Subreddit;