function Comment() {

  //TO-DO add real data
  const comment = {
    id: 'jdkrg4',
    postId: 'nreg94',
    author: 'Vinnie',
    body: 'This is my comment. It has got several lines so we can see what it looks like when it wraps around the screen. I bet it is pretty great.',
  }

  return (
      <div className='comment'>
        <div className='author'>
          {comment.author}
        </div>
        <div className='body'>
          {comment.body}
        </div>
      </div>
  );
}

export default Comment;