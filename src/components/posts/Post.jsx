import './posts.css'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Comments from '../comments/Comments';
import { addCommas } from '../../util/numberFormatter';
import defaultSubredditIcon from './default-subreddit-icon.png';

function Post(props) {

  const post = {
    ...props.post,
    subredditLogo: props.subredditUrl
  };

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
        <div className='post-data'>
          <div className='subreddit-container'>
            <div className='subreddit-logo-container'>
              {post.subreddit ? 
                <img src={post.subredditLogo || defaultSubredditIcon} alt='Subreddit Logo' /> :
                <Skeleton inline='true' height='30px'/>}
            </div>
            <div className='subreddit-user-text'>
              <span className='subreddit-text'>{post.subreddit ? 'r/'+post.subreddit : <Skeleton inline='true' width='5rem'/>}</span>
              {post.subreddit ? '●' : ''} 
              <span className='user-text'>{post.author ? 'u/'+post.author : <Skeleton inline='true' width='8rem'/>}</span>
            </div>
          </div>
          <div className='karma-text'>
            { post.karma ? addCommas(post.karma) + ' karma' : <Skeleton inline='true' width='5rem'/>}
          </div>
        </div>
        <div className='post-title'>
          {post.title || <Skeleton count='2'/>}
        </div>
        { renderImageContainer() }
        {post.title ? <Comments post={post}/> : <Skeleton height='1.5rem' width='9rem' containerClassName='skeleton-button'/>}
      </div>
  );
}

export default Post;