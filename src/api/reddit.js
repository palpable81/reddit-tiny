const BASE_URL = 'https://www.reddit.com';
export const DEFAULT_SUBREDDIT = 'pics'

const isImage = (url) => {
  const regex = /.(jpg|png|gif)$/;
  return url.match(regex) ? true : false;
}

export const getPosts = async (subreddit) => {

  //use default if no subreddit provided
  if(!subreddit) {
    subreddit = DEFAULT_SUBREDDIT;
  }
  const url = `${BASE_URL}/r/${subreddit}.json`;
  const response = await fetch(url);
  if(response.ok) {
    const json = await response.json();

    return json.data.children.map((post) => ({
      id: post.data.id,
      title: post.data.title,
      karma: post.data.score,
      author: post.data.author,
      subreddit: post.data.subreddit,
      subredditId: post.data.subreddit_id,
      isImage: isImage(post.data.url),
      url: post.data.url
    }
  ));
  }
}

