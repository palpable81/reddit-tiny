import './posts.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPosts, fetchPosts } from '../../features/posts/postsSlice';
import { selectSelectedSubreddit } from '../../features/filter/filterSlice';
import { selectSubreddits } from '../../features/subreddits/subredditsSlice';
import Post from './Post';

function Posts() {

  const posts = useSelector(selectPosts);
  const subreddits = useSelector(selectSubreddits);
  const selectedSubreddit = useSelector(selectSelectedSubreddit);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts(selectedSubreddit));
  }, [selectedSubreddit, dispatch]);

  const getSubredditUrl = (subredditId) => {
    const filteredSubreddits = subreddits.filter((subreddit) => subreddit.id === subredditId);
    return filteredSubreddits[0].iconUrl;
  }

  return (
      <div className='posts'>
        { posts.map((post) => <Post post={post} key={post.id} subredditUrl={getSubredditUrl(post.subredditId)}/>)}
      </div>
  );
}

export default Posts;