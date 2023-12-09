import React, {useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import CreateToastNotification from "../components/CreateToastNotification";
import {fetchAllTodoLists, getTodoLists, todoListsState,} from "../data/todoListsSlice";
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

    const {todoLists} = useSelector(getTodoLists);
    const status = useSelector(todoListsState);

    // Memoize the sorted todo lists
    const sortedTodoLists = useMemo(() => {
        return [...todoLists].sort((a, b) => {
            const dateA = new Date(a.updatedAt);
            const dateB = new Date(b.updatedAt);
            return dateB - dateA;
        });
    }, [todoLists]);

    const skeletonCount = 20;

    if (status === "loading") {
        return (
            <>
                <div
                    className="grid min-h-screen grid-cols-1 gap-1 p-4 md:gap-2 md:grid-cols-2 lg:grid-cols-3 bg-neutralBackground">
                    {Array.from({length: skeletonCount}, (_, index) => (
                        <TodoListSkeleton key={index}/>
                    ))}
                </div>
            </>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-neutralBackground">
                <div className="grid grid-cols-1 p-4 items-start md:gap-x-8 md:grid-cols-2 lg:grid-cols-3">
                    {(sortedTodoLists.length === 0 && (
                            <p>No todo lists are available at this time</p>
                        )) ||
                        sortedTodoLists.map((todoList) => (
                            <TodoListCard
                                key={todoList.id}
                                title={todoList.title}
                                description={todoList.description}
                                id={todoList.id}
                                lastUpdated={todoList.updatedAt}
                            />
                        ))}
                </div>
            </div>
        </>
    );
};

export default TodoListContainer;
