import { useSelector } from 'react-redux';
import { selectComments } from '../../features/comments/commentsSlice';

import './comments.css';
import Comment from './Comment';
import CommentButton from './CommentButton';

function Comments(props) {

  let comments = [];
  let commentsEntry = useSelector(selectComments)[props.post.id];
  let isVisible = false;
  let isLoading = false;
  let isLoaded = false;
  let hasError = false;
  if(commentsEntry) {
    comments = commentsEntry.comments;
    // if(comments.length > 0 && !isLoading) {
    //   isLoaded = true;
    // }
    isVisible = commentsEntry.isVisible;
    isLoading = commentsEntry.isLoading;
    isLoaded = commentsEntry.isLoaded;
    hasError = commentsEntry.hasError;
  }

  const renderComments = () => {
    if(hasError) {
      return (<div className='error-message-text'>
                <h2>Error loading comments</h2>
              </div>
      );
    }
    else if(isLoading) {
      //render five empty comments for skeleton
      return (
        <div>
          <Comment isSkeleton={true}/>
          <Comment isSkeleton={true}/>
          <Comment isSkeleton={true}/>
          <Comment isSkeleton={true}/>
          <Comment isSkeleton={true}/>
        </div>
      )
    } else {
      return comments.map((comment) => <Comment comment={comment} key={comment.id} />);
    }
  }

  return (
      <div data-testid="comments" className='comments'>
        <CommentButton post={props.post} isVisible={isVisible} isLoading={isLoading} isLoaded={isLoaded}/>
        <div data-testid="comment-container" className={isVisible ? 'comment-container' : 'comment-container hidden'} >
          {renderComments()}
        </div>
      </div>
  );
}

export default Comments;