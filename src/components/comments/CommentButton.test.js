import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch } from 'react-redux'; 
import { fetchComments, toggleComments } from '../../features/comments/commentsSlice';
import CommentButton from './CommentButton';


//mocking dispatch
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

//mocking commentsSlice
jest.mock("../../features/comments/commentsSlice", () => ({
  fetchComments: jest.fn(),
  toggleComments: jest.fn()
}));

describe('CommentButton', () => {
  test('button text is "Show" before comments are loaded', () => {
    const expectedText = 'Show Top Comments';

    render(<CommentButton isLoaded={false}/>);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent(expectedText);
  });

  test('button text is "Loading" while comments are loading', () => {
    const expectedText = 'Loading Comments...';

    render(<CommentButton isLoading={true}/>);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent(expectedText);
  });

  test('button text is "Hide" while comments have loaded and are visible', () => {
    const expectedText = 'Hide Comments';

    render(<CommentButton isLoaded={true} isVisible={true}/>);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent(expectedText);
  });

  test('button text is "Show" while comments have loaded and are not visible', () => {
    const expectedText = 'Show Top Comments';

    render(<CommentButton isLoaded={true} isVisible={false}/>);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent(expectedText);
  });

  test('dispatches fetchComments when button clicked if comments not loaded ', () => {
    const expectedPost = {test: 'true'};
    const mockDispatchFn = jest.fn();
    useDispatch.mockReturnValue(mockDispatchFn);
    const mockFetchComments = jest.fn();
    fetchComments.mockReturnValue(mockFetchComments);
    
    render(<CommentButton isLoaded={false} post={expectedPost}/>);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockDispatchFn).toHaveBeenCalledWith(mockFetchComments);
  });

  test('dispatches toggleComments when button clicked if comments are loaded ', () => {
    const expectedPost = {test: 'true'};
    const mockDispatchFn = jest.fn();
    useDispatch.mockReturnValue(mockDispatchFn);
    const mockToggleComments = jest.fn();
    toggleComments.mockReturnValue(mockToggleComments);
    
    render(<CommentButton isLoaded={true} post={expectedPost}/>);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockDispatchFn).toHaveBeenCalledWith(mockToggleComments);
  });
});