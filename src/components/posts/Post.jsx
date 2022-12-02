import './posts.css'
import Comments from '../comments/Comments';
import { addCommas } from '../../util/numberFormatter';
import defaultSubredditIcon from './default-subreddit-icon.png';

function Post(props) {

  const post = {
    ...props.post,
    subredditLogo: props.subredditUrl
  };

  const renderImage = () => {
    if(post.isImage) {
      return <img src={post.url} alt='Post' />;
    }
  }

  return (
      <div className='post'>
        <div className='post-data'>
          <div className='subreddit-container'>
            <div className='subreddit-logo-container'>
              <img src={post.subredditLogo || defaultSubredditIcon} alt='Subreddit Logo' />
            </div>
            <div>
              <span className='subreddit-text'>r/{post.subreddit}</span>● 
              <span className='user-text'>u/{post.author}</span>
            </div>
          </div>
          <div className='karma-text'>
            { addCommas(post.karma)} karma
          </div>
        </div>
        <div className='post-title'>
          {post.title}
        </div>
        <div className='post-image-container'>
            { renderImage() }
        </div>
        <Comments />
      </div>
  );
}

export default Post;