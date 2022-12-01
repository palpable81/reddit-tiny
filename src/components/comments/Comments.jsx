import './comments.css';
import Comment from './Comment';

function Comments() {

  // const posts = useSelector(selectPosts);
  // let filteredPosts;
  // const searchTerm = useSelector(selectSearchTerm);

  // //filter posts based on search term
  // if(!searchTerm) {
  //   filteredPosts = posts;
  // }
  // else {
  //   filteredPosts = posts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
  // }


  // const subreddits = useSelector(selectSubreddits);
  // const selectedSubreddit = useSelector(selectSelectedSubreddit);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchPosts(selectedSubreddit));
  // }, [selectedSubreddit, dispatch]);

  // const getSubredditUrl = (subredditId) => {
  //   const filteredSubreddits = subreddits.filter((subreddit) => subreddit.id === subredditId);
  //   if(filteredSubreddits.length > 0) {
  //     return filteredSubreddits[0].iconUrl;
  //   }
  //   return '';
  // }

  return (
      <div className='comments'>
        {/* { filteredPosts.map((post) => <Post post={post} key={post.id} subredditUrl={getSubredditUrl(post.subredditId)}/>)} */}
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </div>
  );
}

export default Comments;