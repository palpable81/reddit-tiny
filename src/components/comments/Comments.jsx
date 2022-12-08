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

  const renderComments = () => {
    if(isLoading) {
      //render five empty comments for skeleton
      return (
        <div>
          <Comment isSkeleton='true'/>
          <Comment isSkeleton='true'/>
          <Comment isSkeleton='true'/>
          <Comment isSkeleton='true'/>
          <Comment isSkeleton='true'/>
        </div>
      )
    } else {
      return comments.map((comment) => <Comment comment={comment} key={comment.id} />);
    }
  }

  return (
      <div className='comments'>
        <CommentButton post={props.post} isVisible={isVisible} isLoading={isLoading} isLoaded={isLoaded}/>
        <div className='comment-container' hidden={!isVisible}>
          {renderComments()}
        </div>
      </div>
  );
}

export default Comments;