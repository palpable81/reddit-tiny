import './posts.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPosts, fetchPosts, selectIsLoading } from '../../features/posts/postsSlice';
import { selectSelectedSubreddit, selectSearchTerm } from '../../features/filter/filterSlice';
import { selectSubreddits } from '../../features/subreddits/subredditsSlice';
import Post from './Post';

function Posts() {

  const isLoading = useSelector(selectIsLoading);

  const posts = useSelector(selectPosts);
  let filteredPosts;
  const searchTerm = useSelector(selectSearchTerm);

  //filter posts based on search term
  if(!searchTerm) {
    filteredPosts = posts;
  }
  else {
    filteredPosts = posts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  const subreddits = useSelector(selectSubreddits);
  const selectedSubreddit = useSelector(selectSelectedSubreddit);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts(selectedSubreddit));
  }, [selectedSubreddit, dispatch]);

  const getSubredditUrl = (subredditId) => {
    const filteredSubreddits = subreddits.filter((subreddit) => subreddit.id === subredditId);
    if(filteredSubreddits.length > 0) {
      return filteredSubreddits[0].iconUrl;
    }
    return '';
  }

  return (
      <div className='posts'>
        { isLoading ? <><Post /><Post /><Post /><Post /></> :
          filteredPosts.map((post) => <Post post={post} key={post.id} subredditUrl={getSubredditUrl(post.subredditId)}/>)}
      </div>
  );
}

export default Posts;