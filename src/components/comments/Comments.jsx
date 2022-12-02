import { useSelector } from 'react-redux';
import { selectComments } from '../../features/comments/commentsSlice';

import './comments.css';
import Comment from './Comment';
import CommentButton from './CommentButton';

function Comments(props) {

  let comments;
  let commentsEntry = useSelector(selectComments)[props.post.id];
  let isVisible = false;
  if(commentsEntry) {
    comments = commentsEntry.comments;
    isVisible = commentsEntry.isVisible;
  }
  else {
    comments = [];
  }

  return (
      <div className='comments'>
        <CommentButton post={props.post}/>
        <div className='comment-container' hidden={!isVisible}>
          { comments.map((comment) => <Comment comment={comment} key={comment.id} />)}
        </div>
      </div>
  );
}

export default Comments;