import { useDispatch } from 'react-redux';
import { fetchComments, toggleComments } from '../../features/comments/commentsSlice';

function CommentButton({post, isVisible, isLoading, isLoaded}) {

  const dispatch = useDispatch();

  const handleOnClick = () => {
    if(!isLoaded) {
      dispatch(fetchComments(post));
    }
    else {
      dispatch(toggleComments(post));
    }
  }

  const renderButtonText = () => {
    if(isLoading) {
      return "Loading Comments...";
    }
    else if(isVisible) {
      return "Hide Comments";
    }
    else {
      return "Show Top Comments";
    }
  }

  return (
      <div className='comment-button'>
        <button onClick={handleOnClick} disabled={isLoading}>
          {renderButtonText()}
        </button>
      </div>
  );
}

export default CommentButton;