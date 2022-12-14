import { useSelector } from 'react-redux'; 
import { render, screen} from '@testing-library/react';
import Comments from './Comments';

//mocking useSelector
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

//mocking CommentButton
const mockCommentButtonComponent = jest.fn();
jest.mock("./CommentButton", () => (props) => {
  mockCommentButtonComponent(props);
  return <mock-commentButtonComponent />;
});

//mocking Comment
const mockCommentComponent = jest.fn();
jest.mock("./Comment", () => (props) => {
  mockCommentComponent(props);
  return <mock-commentComponent />;
});

test('renders button with no comments if no comments in store', () => {
  const postId = '1';
  const comments = {
  };
  const post = {
    id: postId
  };
  useSelector.mockReturnValue(comments);

  render(<Comments post={post}/>);

  expect(mockCommentButtonComponent).toHaveBeenCalledWith(
    expect.objectContaining({
      post: post,
      isVisible: false,
      isLoading: false
    })
  );
  expect(mockCommentComponent).not.toHaveBeenCalled();
});

test('renders button with comments if comments in store', () => {
  const postId = '1';
  const expectedIsVisible = true;
  const expectedIsLoading = false;
  const comments = {
    [postId]: {comments: [{id: 1, author: 'a', body: 'b'}, {id: 2, author: 'c', body: 'd'}],
                isVisible: expectedIsVisible,
                isLoading: expectedIsLoading}
  };
  const post = {
    id: postId
  };
  useSelector.mockReturnValue(comments);

  render(<Comments post={post}/>);

  expect(mockCommentButtonComponent).toHaveBeenCalledWith(
    expect.objectContaining({
      post: post,
      isVisible: expectedIsVisible,
      isLoading: expectedIsLoading,
    })
  );
  expect(mockCommentComponent).toHaveBeenCalledTimes(2);
});

test('renders button with skeleton comments if comments loading', () => {
  const postId = '1';
  const expectedIsVisible = true;
  const expectedIsLoading = true;
  const comments = {
    [postId]: {comments: [{id: 1, author: 'a', body: 'b'}, {id: 2, author: 'c', body: 'd'}],
                isVisible: expectedIsVisible,
                isLoading: expectedIsLoading}
  };
  const post = {
    id: postId
  };
  useSelector.mockReturnValue(comments);

  render(<Comments post={post}/>);

  expect(mockCommentButtonComponent).toHaveBeenCalledWith(
    expect.objectContaining({
      post: post,
      isVisible: expectedIsVisible,
      isLoading: expectedIsLoading,
    })
  );
  expect(mockCommentComponent).toHaveBeenCalledTimes(5);
  expect(mockCommentComponent).toHaveBeenLastCalledWith(
    expect.objectContaining({
      isSkeleton: true,
    })
  )
});