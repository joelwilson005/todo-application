import SkeletonLoader from "./SkeletonLoader";

const TodoListSkeleton = () => {
  return (
    <>
      
        <div>
          <SkeletonLoader classes="title width-50"></SkeletonLoader>
          <SkeletonLoader classes="title width-100"></SkeletonLoader>
        </div>
    </>
  );
};

export default TodoListSkeleton;
