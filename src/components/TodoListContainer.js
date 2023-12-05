import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateToastNotification from "../components/CreateToastNotification";
import {
  fetchAllTodoLists,
  getTodoLists,
  todoListsState,
} from "../data/todoListsSlice";
import TodoListCard from "./TodoListCard";
import TodoListSkeleton from "../animation/TodoListSkeleton";

const TodoListContainer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllTodoLists())
      .unwrap()
      .catch((error) => {
        if (error) {
          CreateToastNotification("error", "An unexpected error has occurred");
        }
      });
  }, [dispatch]);
  const { todoLists } = useSelector(getTodoLists);
  const status = useSelector(todoListsState);

  const skeletonCount = 12;

  if (status === "loading") {
    return (
      <>
        <div className="grid min-h-screen grid-cols-1 gap-1 p-4 md:gap-2 md:grid-cols-2 lg:grid-cols-3 bg-neutralBackground ">
          {Array.from({ length: skeletonCount }, (_, index) => (
            <TodoListSkeleton key={index} />
          ))}
        </div>
      </>
    );
  }
  return (
    <>
      <div className="grid min-h-screen grid-cols-1 p-4 md:place-items-center md:gap-2 md:grid-cols-2 lg:grid-cols-3 bg-neutralBackground ">
        {(todoLists.length === 0 && (
          <p>No todo lists are available at this time</p>
        )) ||
          todoLists.map((todoList) => (
            <TodoListCard
              key={todoList.id} // Make sure to use a unique key for each item
              title={todoList.title}
              description={todoList.description}
            />
          ))}
      </div>
    </>
  );
};

export default TodoListContainer;
