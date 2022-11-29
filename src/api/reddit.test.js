import { getPosts } from './reddit.js';

beforeEach(() => {
  fetch.resetMocks();
});

test('fetches posts from subreddit', async () => {
  const subreddit = 'CFB';
  fetch.mockResponseOnce(JSON.stringify({ 
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
        }
      ]
    }
  }));

  const response = await getPosts(subreddit);

  expect(response.length).toBe(1);
  expect(fetch).toHaveBeenCalledWith(
    expect.stringContaining(subreddit)
  );
});

test('fetches posts from pics by default', async () => {
  const subreddit = '';
  fetch.mockResponseOnce(JSON.stringify({ 
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
          },
        }
      ]
    }
  }));

  const response = await getPosts(subreddit);

  expect(response.length).toBe(2);
  expect(fetch).toHaveBeenCalledWith(
    expect.stringContaining('pics')
  );
});