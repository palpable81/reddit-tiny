import './posts.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPosts, fetchPosts } from '../../features/posts/postsSlice';
import { selectSelectedSubreddit } from '../../features/filter/filterSlice';
import Post from './Post';

function Posts() {

  const posts = useSelector(selectPosts);
  const selectedSubreddit = useSelector(selectSelectedSubreddit);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts(selectedSubreddit));
  }, [selectedSubreddit, dispatch]);

  return (
      <div className='posts'>
        { posts.map((post) => <Post post={post} key={post.id}/>)}
      </div>
  );
}

export default Posts;