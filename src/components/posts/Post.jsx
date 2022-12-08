import './posts.css';
import './posts-skeleton.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Comments from '../comments/Comments';
import { addCommas } from '../../util/numberFormatter';
import defaultSubredditIcon from './default-subreddit-icon.png';

function Post(props) {

  const post = {
    ...props.post,
    subredditLogo: props.subredditUrl
  };
  const isSkeleton = props.isSkeleton;

  const renderImageContainer = () => {
    if(post.isImage) {
      return (
        <div className='post-image-container'>
          <img src={post.url} alt='Post' />
        </div>
      )
    }
  }

  return (
      <div className='post'>
        <SkeletonTheme inline='true'>
          <div className='post-data'>
            <div className='post-subreddit-container'>
              <div className='post-subreddit-logo-container'>
                {!isSkeleton ? 
                  <img src={post.subredditLogo || defaultSubredditIcon} alt='Subreddit Logo' /> :
                  <Skeleton className='skeleton-subreddit-logo' /> }
              </div>
              <div className='post-subreddit-author-container'>
                <span className='post-subreddit-text'>{!isSkeleton ? 'r/'+post.subreddit : <Skeleton className='skeleton-subreddit' />}</span>
                {!isSkeleton && '●' }
                <span className='post-author-text'>{!isSkeleton ? 'u/'+post.author : <Skeleton className='skeleton-author' />}</span>
              </div>
            </div>
            <div className='post-karma-text'>
              { !isSkeleton ? addCommas(post.karma) + ' karma' : <Skeleton className='skeleton-karma' />}
            </div>
          </div>
          <div className='post-title'>
            {!isSkeleton ? post.title : <Skeleton count='2'/>}
          </div>
          { renderImageContainer() }
          {!isSkeleton ? <Comments post={post}/> : <Skeleton className='skeleton-button' containerClassName='skeleton-button-container' />}
        </SkeletonTheme>
      </div>
  );
}

export default Post;