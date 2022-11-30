import './posts.css'
import { addCommas } from '../../util/numberFormatter';

function Post(props) {

  //need to pull subreddit logo from slice
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
              <img src={post.subredditLogo} alt='Subreddit Logo' />
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
        <div className='post-space'></div>
      </div>
  );
}

export default Post;