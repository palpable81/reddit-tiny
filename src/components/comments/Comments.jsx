import { useSelector } from 'react-redux';
import { selectComments } from '../../features/comments/commentsSlice';

import './comments.css';
import Comment from './Comment';
import CommentButton from './CommentButton';

function Comments(props) {

  let comments = [];;
  let commentsEntry = useSelector(selectComments)[props.post.id];
  let isVisible = false;
  let isLoading = false;
  let isLoaded = false;
  if(commentsEntry) {
    comments = commentsEntry.comments;
    if(comments.length > 0 && !isLoading) {
      isLoaded = true;
    }
    isVisible = commentsEntry.isVisible;
    isLoading = commentsEntry.isLoading;
  }

  return (
      <div className='comments'>
        <CommentButton post={props.post} isVisible={isVisible} isLoading={isLoading} isLoaded={isLoaded}/>
        <div className='comment-container' hidden={!isVisible}>
          { comments.map((comment) => <Comment comment={comment} key={comment.id} />)}
        </div>
      </div>
  );
}

export default Comments;