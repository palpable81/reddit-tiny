import fetch from "node-fetch";

const BASE_URL = 'https://reddit.com';

const Reddit = {
  getPosts: async (subreddit) => {
    if(!subreddit) {
      subreddit = 'popular';
    }
    const url = BASE_URL + '/r/' + subreddit + '.json';
    let response = await fetch(url);
    if(response.ok) {
      let json = await response.json();
      return json.data.children.map((post) => ({
        id: post.data.id,
        title: post.data.title,
        karma: post.data.score,
        author: post.data.author,
        subreddit: post.data.subreddit,
        subredditId: post.data.subreddit_id,
        image: post.data.url,
      }))
    }
  }
}

export default Reddit;

