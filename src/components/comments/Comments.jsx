import { useSelector } from 'react-redux';
import { selectComments } from '../../features/comments/commentsSlice';

import './comments.css';
import Comment from './Comment';
import CommentButton from './CommentButton';

function Comments(props) {

  const comments = useSelector(selectComments)[props.post.id];
  let isVisible = false;
  if(comments) {
    isVisible = comments.isVisible;
  }

  return (
      <div className='comments'>
        <CommentButton post={props.post}/>
        {/* { filteredPosts.map((post) => <Post post={post} key={post.id} subredditUrl={getSubredditUrl(post.subredditId)}/>)} */}
        <div className='comment-container' hidden={!isVisible}>
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
        </div>
      </div>
  );
}

export default Comments;