import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch } from 'react-redux'; 
import Header from './Header';

//mocking dispatch
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

test('renders reddit text', () => {
  render(<Header />);
  const linkElement = screen.getByText('Reddit');
  expect(linkElement).toBeInTheDocument();
});

test('renders search box', () => {
  const { queryByPlaceholderText } = render(<Header />);
  const searchInput = queryByPlaceholderText('Search...');
  expect(searchInput).toBeInTheDocument();
});

test('dispatches to store when search box updated', () => {
  const searchTerm = 'my search';
  const mockDispatchFn = jest.fn();
  useDispatch.mockReturnValue(mockDispatchFn);
  
  const { queryByPlaceholderText } = render(<Header />);
  const searchInput = queryByPlaceholderText('Search...');

  fireEvent.change(searchInput, { target: { value: searchTerm } })
  expect(mockDispatchFn).toHaveBeenCalledWith(
    expect.objectContaining({
      payload: searchTerm,
    })
  );
});
