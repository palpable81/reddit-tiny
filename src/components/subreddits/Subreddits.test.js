import { render, screen } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux'; 
import Subreddits from './Subreddits';

//mocking useSelector, useDispatch
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
  useEffect: jest.fn()
}));

jest.mock('../../features/subreddits/subredditsSlice', () => ({
  selectSubreddits: jest.fn(),
  selectIsLoading: jest.fn(),
  seelctHasError: jest.fn(),
  fetchSubreddits: jest.fn()
}));

//mocking Subreddit
const mockSubredditComponent = jest.fn();
jest.mock("./Subreddit", () => (props) => {
  mockSubredditComponent(props);
  return <mock-subredditComponent />;
});

test('renders 1 default subreddit and other subreddits if not loading', () => {
  const selectSubredditsResponse = [{
    id: 1,
    displayName: 'a',
    iconUrl: 'logo.url'
  }];

  useDispatch.mockReturnValue(jest.fn());
  useSelector.mockReturnValueOnce(selectSubredditsResponse)
    .mockReturnValueOnce(false);

  render(<Subreddits />);

  expect(mockSubredditComponent).toHaveBeenCalledTimes(2);
});

test('renders 20 skeletons if loading', () => {
  const selectSubredditsResponse = [{
    id: 1,
    displayName: 'a',
    iconUrl: 'logo.url'
  }];

  useDispatch.mockReturnValue(jest.fn());
  useSelector.mockReturnValueOnce(selectSubredditsResponse)
    .mockReturnValueOnce(true);

  render(<Subreddits />);

  expect(mockSubredditComponent).toHaveBeenCalledTimes(20);
});

test('displays error message if loading', () => {
  const selectSubredditsResponse = [{
    id: 1,
    displayName: 'a',
    iconUrl: 'logo.url'
  }];

  useDispatch.mockReturnValue(jest.fn());
  useSelector.mockReturnValueOnce(selectSubredditsResponse)
    .mockReturnValueOnce(false)
    .mockReturnValueOnce(true);

  render(<Subreddits />);

  expect(mockSubredditComponent).toHaveBeenCalledTimes(0);
  const errorMessage = screen.getByText('Error loading subreddits');
  expect(errorMessage).toBeInTheDocument();
});