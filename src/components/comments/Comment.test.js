import { render, screen } from '@testing-library/react';
import Comment from './Comment';

describe('Comment', () => {
  test('renders comment text', () => {
    const author = 'a';
    const expectedAuthor = 'u/'+author;
    const expectedBody = 'b';
    const comment = {
      author: author,
      body: expectedBody
    };

    render(<Comment comment={comment}/>);

    const actualAuthor = screen.getByText(expectedAuthor);
    expect(actualAuthor).toBeInTheDocument();
    const actualBody = screen.getByText(expectedBody);
    expect(actualBody).toBeInTheDocument();
  });

  test('renders skeletons instead of text', () => {
    const author = 'a';
    const expectedAuthor = 'u/'+author;
    const expectedBody = 'b';
    const comment = {
      author: author,
      body: expectedBody
    };

    render(<Comment comment={comment} isSkeleton='true'/>);

    const actualAuthor = screen.queryByText(expectedAuthor);
    expect(actualAuthor).not.toBeInTheDocument();
    const actualBody = screen.queryByText(expectedBody);
    expect(actualBody).not.toBeInTheDocument();
  });
});