import { render, screen } from '@testing-library/react';
import Post from './Post';

//mocking Comments
const mockCommentsComponent = jest.fn();
jest.mock("../comments/Comments", () => (props) => {
  mockCommentsComponent(props);
  return <mock-commentsComponent />;
});

test('renders post text and image', () => {
  const subreddit = 's';
  const author = 'a';
  const karma = '1000';
  const title = 't';
  const expectedLogoUrl = 'logo.jpg';
  const expectedAuthor = 'u/'+author;
  const expectedSubreddit = 'r/'+subreddit;
  const expectedUrl = 'image.jpg';
  const post = {
    subreddit: subreddit,
    author: author,
    karma: karma,
    title: title,
    url: expectedUrl,
    isImage: true,
    subredditLogo: expectedLogoUrl
  };

  render(<Post post={post} subredditUrl={expectedLogoUrl}/>);

  const actualAuthor = screen.getByText(expectedAuthor);
  expect(actualAuthor).toBeInTheDocument();
  const actualSubreddit = screen.getByText(expectedSubreddit);
  expect(actualSubreddit).toBeInTheDocument();
  const karmaText = screen.getByText('1,000 karma');
  expect(karmaText).toBeInTheDocument();
  const actualTitle = screen.getByText(title);
  expect(actualTitle).toBeInTheDocument();
  const actualLogo = screen.getByAltText('Subreddit Logo');
  expect(actualLogo).toBeInTheDocument();
  expect(actualLogo.src).toContain(expectedLogoUrl);
  const actualImage = screen.getByAltText('Post');
  expect(actualImage).toBeInTheDocument();
  expect(actualImage.src).toContain(expectedUrl);

  expect(mockCommentsComponent).toHaveBeenCalledWith(
    expect.objectContaining({
      post: post
    })
  );
});

test('renders no image if not an image', () => {
  const subreddit = 's';
  const author = 'a';
  const karma = '1000';
  const title = 't';
  const expectedLogoUrl = 'logo.jpg';
  const expectedUrl = 'image.jpg';
  const post = {
    subreddit: subreddit,
    author: author,
    karma: karma,
    title: title,
    url: expectedUrl,
    isImage: false,
    subredditLogo: expectedLogoUrl
  };

  render(<Post post={post} subredditUrl={expectedLogoUrl}/>);

  const actualImage = screen.queryByAltText('Post');
  expect(actualImage).not.toBeInTheDocument();
});

test('renders default subreddit icon if none passed', () => {
  const subreddit = 's';
  const author = 'a';
  const karma = '1000';
  const title = 't';
  const expectedUrl = 'image.jpg';
  const post = {
    subreddit: subreddit,
    author: author,
    karma: karma,
    title: title,
    url: expectedUrl,
    isImage: false,
  };

  render(<Post post={post} />);

  const actualLogo = screen.getByAltText('Subreddit Logo');
  expect(actualLogo).toBeInTheDocument();
  expect(actualLogo.src).toContain('default-subreddit-icon.png');
});

test('renders skeletons instead of text', () => {
  const subreddit = 's';
  const author = 'a';
  const title = 't';
  const expectedAuthor = 'u/'+author;
  const expectedSubreddit = 'r/'+subreddit;

  render(<Post isSkeleton='true'/>);

  const actualAuthor = screen.queryByText(expectedAuthor);
  expect(actualAuthor).not.toBeInTheDocument();
  const actualSubreddit = screen.queryByText(expectedSubreddit);
  expect(actualSubreddit).not.toBeInTheDocument();
  const karmaText = screen.queryByText('1,000 karma');
  expect(karmaText).not.toBeInTheDocument();
  const actualTitle = screen.queryByText(title);
  expect(actualTitle).not.toBeInTheDocument();
  const actualLogo = screen.queryByAltText('Subreddit Logo');
  expect(actualLogo).not.toBeInTheDocument();
  const actualImage = screen.queryByAltText('Post');
  expect(actualImage).not.toBeInTheDocument();

  expect(mockCommentsComponent).not.toHaveBeenCalled();
});