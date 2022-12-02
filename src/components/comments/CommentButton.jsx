import { useDispatch, useSelector } from 'react-redux';
import { selectComments, fetchComments, toggleComments } from '../../features/comments/commentsSlice';

function CommentButton(props) {

  //const comments = useSelector(selectComments)[props.postId];
  let isVisible, isLoading;
  const comments = useSelector(selectComments)[props.post.id];
  const dispatch = useDispatch();

  if(!comments) {
    isVisible = false;
    isLoading = false;
  }
  else {
    isVisible = comments.isVisible;
    isLoading = comments.isloading;
  }

  const handleOnClick = () => {
    if(!comments) {
      dispatch(fetchComments(props.post));
    }
    else {
      dispatch(toggleComments(props.post));
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
    return <button onClick={handleOnClick}>{buttonText}</button>;
  }

  return (
      <div className='comment-button'>
        {renderButton()}
      </div>
  );
}

export default CommentButton;