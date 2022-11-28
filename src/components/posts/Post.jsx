import { setSelectedSubreddit } from "../../features/filter/filterSlice";
import './posts.css'

function Post() {
  // const dispatch = useDispatch();

  // const handleTermChange = ({target}) => {
  //   dispatch(setSearchTerm(target.value));
  // }

  //test data - needs to use real data eventually!
  const subredditUrl = 'https://b.thumbs.redditmedia.com/EndDxMGB-FTZ2MGtjepQ06cQEkZw_YQAsOUudpb9nSQ.png';
  const image = 'https://i.redd.it/5kazf35lap1a1.jpg'
  const post = {
    subredditLogo: subredditUrl,
    subreddit: 'r/Subreddit',
    user: 'u/user',
    karma: '13k',
    title: "German football team covers their mouths at their first game in Qatar",
    image: image
  }

  return (
      <div className='post'>
        <div className='post-data'>
          <div className='subreddit-container'>
            <div className='subreddit-logo-container'>
              <img src={post.subredditLogo} alt='Subreddit Logo' />
            </div>
            <div>
              <span className='subreddit-text'>{post.subreddit}</span>● 
              <span className='user-text'>{post.user}</span>
            </div>
          </div>
          <div className='karma-text'>
            {post.karma} karma
          </div>
        </div>
        <div className='post-title'>
          {post.title}
        </div>
        <div className='post-image-container'>
          <img src={post.image} alt='Post Image' />
        </div>
        <div className='post-space'></div>
      </div>
  );
}

export default Post;