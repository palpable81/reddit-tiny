function Comment(props) {

  //TO-DO add real data
  const comment = props.comment;

  return (
      <div className='comment'>
        <div className='comment-author'>
          u/{comment.author}
        </div>
        <div className='comment-body'>
          {comment.body}
        </div>
      </div>
  );
}

export default Comment;