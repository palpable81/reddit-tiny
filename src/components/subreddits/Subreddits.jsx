import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSubreddits, fetchSubreddits } from '../../features/subreddits/subredditsSlice';

function Subreddits() {

  const posts = useSelector(selectSubreddits);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSubreddits());
  }, [dispatch]);

  return (
      <div className='subreddits'>
        {/* need to fill this in */}
      </div>
  );
}

export default Subreddits;