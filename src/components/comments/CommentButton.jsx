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

  const renderButton = () => {
    let buttonText;
    if(isLoading) {
      buttonText = "Loading Comments...";
    }
    else if(isVisible) {
      buttonText = "Hide Comments";
    }
    else {
      buttonText = "Show Top Comments";
    }
    return <button onClick={handleOnClick} disabled={isLoading}>{buttonText}</button>;
  }

  return (
      <div className='comment-button'>
        {renderButton()}
      </div>
  );
}

export default CommentButton;