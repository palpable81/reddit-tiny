import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

function Subreddit(props) {

  const subreddit = props.subreddit;
  const isSkeleton = props.isSkeleton;

  return (
      <div className='subreddit'>
        <SkeletonTheme inline='true'>
          {/* <div className='comment-author'>
            {!isSkeleton ? 'u/'+comment.author : <Skeleton className='skeleton-comment-author'/> }
          </div>
          <div className='comment-body'>
            {!isSkeleton ? comment.body : <Skeleton count='2'/> }
          </div> */}
        </SkeletonTheme>
      </div>
  );
}

export default Subreddit;