import './comments-skeleton.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

function Comment(props) {

  const comment = props.comment;
  const isSkeleton = props.isSkeleton;

  return (
      <div className='comment'>
        <SkeletonTheme inline='true'>
          <div className='comment-author'>
            {!isSkeleton ? 'u/'+comment.author : <Skeleton className='skeleton-comment-author'/> }
          </div>
          <div className='comment-body'>
            {!isSkeleton ? comment.body : <Skeleton count='2'/> }
          </div>
        </SkeletonTheme>
      </div>
  );
}

export default Comment;