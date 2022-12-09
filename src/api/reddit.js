const BASE_URL = 'https://www.reddit.com';
export const DEFAULT_SUBREDDIT = 'popular';
export const DEFAULT_SUBREDDIT_OBJ = {
  displayName: DEFAULT_SUBREDDIT,
  id: ''
}
export const COMMENT_LIMIT = 5;

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
      subredditId: post.data.subreddit_id.substring(3),
      isImage: isImage(post.data.url),
      url: post.data.url,
      permalink: post.data.permalink
    }));
  }
}

export const getComments = async (post) => {
  const url = `${BASE_URL}${post.permalink}.json`;
  const response = await fetch(url);
  if(response.ok) {
    const json = await response.json();
    let comments = json[1].data.children;
    if(comments.length > COMMENT_LIMIT) {
      comments = comments.slice(0, COMMENT_LIMIT);
    }

    return comments.map((comment) => ({
      id: comment.data.id,
      postId: post.id,
      author: comment.data.author,
      body: comment.data.body
    }));
  }
}

export const getSubreddits = async () => {
  const url = `${BASE_URL}/subreddits.json`;
  const response = await fetch(url);
  if(response.ok) {
    const json = await response.json();

    return json.data.children.map((subreddit) => ({
      title: subreddit.data.title,
      displayName: subreddit.data.display_name,
      iconUrl: subreddit.data.icon_img,
      id: subreddit.data.id 
    }));
  }
}

