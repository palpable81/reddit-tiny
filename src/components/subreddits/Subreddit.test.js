import { render, screen, fireEvent } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux'; 
import { setSelectedSubreddit } from '../../features/filter/filterSlice';
import Subreddit from './Subreddit';

//mocking useSelector, useDispatch
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

jest.mock('../../features/filter/filterSlice', () => ({
  setSelectedSubreddit: jest.fn()
}))

describe('Subreddit', () => {
  test('renders subreddit and image', () => {
    const displayName = 's';
    const expectedLogoUrl = 'logo.jpg';
    const expectedDisplayName = 'r/'+displayName;
    const subreddit = {
      displayName: displayName,
      iconUrl: expectedLogoUrl
    };

    render(<Subreddit subreddit={subreddit} />);

    const actualDisplayName = screen.getByText(expectedDisplayName);
    expect(actualDisplayName).toBeInTheDocument();
    const actualLogo = screen.getByAltText('Subreddit Logo');
    expect(actualLogo).toBeInTheDocument();
    expect(actualLogo.src).toContain(expectedLogoUrl);
  });

  test('renders default subreddit icon if none provided', () => {
    const displayName = 's';
    const expectedLogoUrl = '';
    const subreddit = {
      displayName: displayName,
      iconUrl: expectedLogoUrl
    };

    render(<Subreddit subreddit={subreddit} />);

    const actualLogo = screen.getByAltText('Subreddit Logo');
    expect(actualLogo).toBeInTheDocument();
    expect(actualLogo.src).toContain('default-subreddit-icon');
  });

  test('renders skeleton subreddit', () => {
    render(<Subreddit isSkeleton={true} />);

    const actualDisplayName = screen.queryByText('r/');
    expect(actualDisplayName).not.toBeInTheDocument();
    const actualLogo = screen.queryByAltText('Subreddit Logo');
    expect(actualLogo).not.toBeInTheDocument();
  });

  test('has class "selected" if matches selectedSubreddit', () => {
    const displayName = 's';
    const expectedLogoUrl = 'logo.jpg';
    const subreddit = {
      displayName: displayName,
      iconUrl: expectedLogoUrl
    };
    useSelector.mockReturnValue(displayName);

    render(<Subreddit subreddit={subreddit} />);

    const button = screen.getByRole('button');
    expect(button.className).toContain('selected');
  });

  test('doesn\'t have class "selected" if not matching selectedSubreddit', () => {
    const displayName = 's';
    const expectedLogoUrl = 'logo.jpg';
    const subreddit = {
      displayName: displayName,
      iconUrl: expectedLogoUrl
    };
    useSelector.mockReturnValue('t');

    render(<Subreddit subreddit={subreddit} />);

    const button = screen.getByRole('button');
    expect(button.className).not.toContain('selected');
  });

  test('dispatches setSelectedSubreddit when clicked', () => {
    const displayName = 's';
    const expectedLogoUrl = 'logo.jpg';
    const subreddit = {
      displayName: displayName,
      iconUrl: expectedLogoUrl
    };
    const mockSetSelectedSubreddit = jest.fn();
    setSelectedSubreddit.mockReturnValue(mockSetSelectedSubreddit);
    const mockDispatchFn = jest.fn();
    useDispatch.mockReturnValue(mockDispatchFn);

    render(<Subreddit subreddit={subreddit} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(setSelectedSubreddit).toHaveBeenCalledWith(displayName);
    expect(mockDispatchFn).toHaveBeenCalledWith(mockSetSelectedSubreddit);
  });
});