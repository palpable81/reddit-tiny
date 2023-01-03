import { getPosts, getSubreddits, getComments, DEFAULT_SUBREDDIT,
        COMMENT_LIMIT } from './reddit.js';

const mockFetchPostsResponse = { 
  data: {
    children: [
      {
        data: {
          id: 'z783po',
          author: 'Zajac19',
          subreddit: 'CFB',
          title: 'Auburn is finalizing a deal to hire Liberty coach Hugh Freeze, sources tell @SINow.',
          subreddit_id: 't5_2qm9d',
          score: 3063,
          url: 'https://www.reddit.com/r/CFB/comments/z783po/auburn_is_finalizing_a_deal_to_hire_liberty_coach/'
        }
      },
      {
        data: {
          id: 'z72ya1',
          title: 'Bully steals a kids phone and his big brother enacts revenge',
          score: 38884,
          author: 'Fox-Mulder7',
          subreddit: 'r/CrazyFuckingVideos',
          subreddit_id: 't5_45hae8',
          url: 'https://v.redd.it/7n3kfa8cbq2a1'
        }
      }
    ]
  }
}
const mockFetchSubredditsResponse = { 
  data: {
    children: [
      {
        data: {
          icon_img: "",
          title: "Home",
          display_name: "Home",
          id: "2qs0k",
        }
      },
      {
        data: {
          icon_img: "https://b.thumbs.redditmedia.com/EndDxMGB-FTZ2MGtjepQ06cQEkZw_YQAsOUudpb9nSQ.png",
          title: "Ask Reddit...",
          display_name: "AskReddit",
          id: "2qh1i",
        }
      }
    ]
  }
}
const mockFetch1CommentResponse = [
  {},
  {
    "data": {
      "children": [
        {
          "data": {
            "id": "ixk5lz5",
            "author": "Merari01",
            "body": "Please keep in mind our subreddit's [case-specific rules](https://www.reddit.com/r/WhitePeopleTwitter/comments/z2shfr/the_shooter_is_nonbinary/) surrounding this tragedy.",
          }
        },
      ]
    }
  }
]
const mockFetch6CommentsResponse = [
  {},
  {
    "data": {
      "children": [
        {
          "data": {
            "id": "ixk5lz5",
            "author": "Merari01",
            "body": "Please keep in mind our subreddit's [case-specific rules](https://www.reddit.com/r/WhitePeopleTwitter/comments/z2shfr/the_shooter_is_nonbinary/) surrounding this tragedy.",
          }
        },
        {
          "data": {
            "id": "ixjdfp8",
            "author": "Grizzchops",
            "body": "Stomped on by heels",
          }
        },
        {
          "data": {
            "id": "ixk5lz5",
            "author": "Merari01",
            "body": "Please keep in mind our subreddit's [case-specific rules](https://www.reddit.com/r/WhitePeopleTwitter/comments/z2shfr/the_shooter_is_nonbinary/) surrounding this tragedy.",
          }
        },
        {
          "data": {
            "id": "ixjdfp8",
            "author": "Grizzchops",
            "body": "Stomped on by heels",
          }
        },
        {
          "data": {
            "id": "ixk5lz5",
            "author": "Merari01",
            "body": "Please keep in mind our subreddit's [case-specific rules](https://www.reddit.com/r/WhitePeopleTwitter/comments/z2shfr/the_shooter_is_nonbinary/) surrounding this tragedy.",
          }
        },
        {
          "data": {
            "id": "ixjdfp8",
            "author": "Grizzchops",
            "body": "Stomped on by heels",
          }
        }
      ]
    }
  }
]

beforeEach(() => {
  fetch.resetMocks();
});

describe('reddit', () => {
  test('fetches posts from subreddit sorted by karma', async () => {
    const subreddit = 'CFB';
    fetch.mockResponseOnce(JSON.stringify(mockFetchPostsResponse));

    const actual = await getPosts(subreddit);

    expect(actual.length).toBe(2);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(subreddit)
    );
    expect(actual[0].karma).toBe(mockFetchPostsResponse.data.children[1].data.score);
    expect(actual[1].karma).toBe(mockFetchPostsResponse.data.children[0].data.score);
  });

  test('fetches posts from default', async () => {
    const subreddit = '';
    fetch.mockResponseOnce(JSON.stringify(mockFetchPostsResponse));

    const actual = await getPosts(subreddit);

    expect(actual.length).toBe(2);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(DEFAULT_SUBREDDIT)
    );
  });

  test('throws error when posts response not ok', async () => {
    const subreddit = 'CFB';
    fetch.mockResponseOnce(JSON.stringify(mockFetchPostsResponse), { status: 400 });

    await expect(getPosts(subreddit)).rejects.toEqual(Error('Response was not ok'));
  });

  test('throws error when posts response malformed', async () => {
    const subreddit = 'CFB';
    fetch.mockResponseOnce(JSON.stringify({}));

    await expect(getPosts(subreddit)).rejects.toThrow();
  });

  test('fetches subreddits', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockFetchSubredditsResponse));

    const actual = await getSubreddits();

    expect(actual.length).toBe(2);
  });

  test('throws error when subreddits response not ok', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockFetchSubredditsResponse), { status: 400 });

    await expect(getSubreddits()).rejects.toEqual(Error('Response was not ok'));
  });

  test('throws error when subreddits response malformed', async () => {
    fetch.mockResponseOnce(JSON.stringify({}));

    await expect(getSubreddits()).rejects.toThrow();
  });

  test('fetches 1 comment', async () => {
    const postId = 'jk34j5';
    const postPermalink = 'permalink';
    const arg = {
      id: postId,
      permalink: postPermalink
    };
    fetch.mockResponseOnce(JSON.stringify(mockFetch1CommentResponse));

    const actual = await getComments(arg);

    expect(actual.length).toBe(1);
    expect(actual[0].postId).toBe(postId);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(postPermalink)
    );
  });

  test('fetches comments up to limit only', async () => {
    const postId = 'jk34j5';
    const postPermalink = 'permalink';
    const arg = {
      id: postId,
      permalink: postPermalink
    };
    fetch.mockResponseOnce(JSON.stringify(mockFetch6CommentsResponse));

    const actual = await getComments(arg);

    expect(actual.length).toBe(COMMENT_LIMIT);
    expect(actual[0].postId).toBe(postId);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(postPermalink)
    );
  });

  test('throws error when comments response not ok', async () => {
    const postId = 'jk34j5';
    const postPermalink = 'permalink';
    const arg = {
      id: postId,
      permalink: postPermalink
    };
    fetch.mockResponseOnce(JSON.stringify(mockFetch6CommentsResponse), { status: 400 });

    await expect(getComments(arg)).rejects.toEqual(Error('Response was not ok'));
  });

  test('throws error when comments response malformed', async () => {
    const postId = 'jk34j5';
    const postPermalink = 'permalink';
    const arg = {
      id: postId,
      permalink: postPermalink
    };
    fetch.mockResponseOnce(JSON.stringify({}));

    await expect(getComments(arg)).rejects.toThrow();
  });
});