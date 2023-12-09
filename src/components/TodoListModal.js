import React, {useEffect, useState} from "react";
import {
    fetchCreateActionItem,
    fetchDeleteTodoList,
    fetchUpdateExistingTodoList,
    getTodoListFromStoreById
} from "../data/todoListsSlice";
import {useDispatch, useSelector} from "react-redux";
import CreateToastNotification from "./CreateToastNotification";
import {FaPlus, FaTrash} from "react-icons/fa6";
import {motion} from "framer-motion";
import ActionItem from "./ActionItem";

const TodoListModal = ({todoListId}) => {
    const [id, setId] = useState(null);
    const [title, setTitle] = useState(null);
    const [actionList, setActionList] = useState([]);
    const [description, setDescription] = useState(null);

    const [newActionItem, setNewActionItem] = useState("");

    const todoList = useSelector((state) =>
        getTodoListFromStoreById(state, todoListId)
    );

    const dispatch = useDispatch();

    useEffect(() => {
        // Set the initial title when the component mounts
        if (todoList) {
            setTitle(todoList.title);
            setDescription(todoList.description);
            setId(todoList.id);
        }
    }, [todoList.title, todoList.description]);

    useEffect(() => {
        if (todoList) {
            setActionList(todoList.actionList || []);
        }
    }, [todoList.actionList]);
    const handleUpdateTodoList = (event) => {
        event.preventDefault();

        const payload = {
            id: id,
            title: title,
            description: description,
        };

        dispatch(fetchUpdateExistingTodoList(payload, id))
            .unwrap()
            .then(() => {
                CreateToastNotification("info", "Changes saved successfully", 1000);
            })
            .catch((error) => {
                CreateToastNotification("error", "An unexpected error has occurred");
            });
    };

    const handleDeleteTodoList = (event) => {
        const shouldDelete = window.confirm(
            "Are you sure you want to delete this todo list?"
        );

        if (shouldDelete) {
            const payload = {
                id: id,
            };

            dispatch(fetchDeleteTodoList(payload))
                .unwrap()
                .then(() => {
                    CreateToastNotification(
                        "info",
                        "Todo list successfully deleted",
                        1000
                    );
                })
                .catch((error) => {
                    CreateToastNotification("error", "An unexpected error has occurred");
                });
        }
    };

    const handleAddNewActionItem = (event) => {
        event.preventDefault();

        if (newActionItem.trim() === "") {
            // Don't add an empty action item
            return;
        }

        const payload = {
            todoListId: id,
            action: {textDescription: newActionItem},
        };

        dispatch(fetchCreateActionItem(payload))
            .unwrap()
            .catch((error) => {
                CreateToastNotification("error", "An unexpected error has occurred");
            });

        // Reset the new action item state
        setNewActionItem("");
    };

    const handleSaveChanges = (event) => {
        handleAddNewActionItem(event);
        handleUpdateTodoList(event);
    };

    return (
        <>
            <div className="flex flex-col font-secondary min-w-full text-neutralText">
                <motion.a
                    whileTap={{
                        scale: 1.05,
                    }}
                    whileHover={{
                        scale: 1.05,
                    }}
                    className="mb-10 hover:cursor-pointer max-w-fit hover:text-warning"
                    onClick={handleDeleteTodoList}
                >
                    <FaTrash></FaTrash>
                </motion.a>
                <form onSubmit={handleUpdateTodoList}>
                    <label className="block min-w-full mb-2 font-primary">Title</label>
                    <input
                        autoFocus={false}
                        className="block p-2 mb-8 border-b-2 min-w-full border-main focus:border-transparent focus:ring-0 focus:border-0"
                        type="text"
                        required
                        min={1}
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                    />
                    <label className="block font-primary">Description</label>
                    <input
                        className="block min-w-full p-2 mb-8 border-b-2 border-main focus:border-transparent focus:ring-0 focus:border-0"
                        type="text"
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                    />

                    {actionList.map((actionItem) => (
                        <ActionItem
                            key={actionItem.id}
                            id={actionItem.id}
                            actionItem={actionItem}
                            todoListId={id}
                        />
                    ))}

                    <input
                        type="text"
                        className="block min-w-full p-2 mb-8 border-b-2 border-accent focus:border-transparent focus:ring-0 focus:border-0"
                        value={newActionItem}
                        onChange={(e) => setNewActionItem(e.target.value)}
                        placeholder="New action item"
                    />

                    <motion.button
                        onClick={handleAddNewActionItem}
                        whileHover={{
                            scale: 1.04,
                        }}
                        className="px-2 my-4 border-2 py-2 rounded-lg hover:bg-accent hover:text-neutralText"
                    >
                        <FaPlus></FaPlus>
                    </motion.button>
                    <button type="submit" onClick={handleSaveChanges}>
                        Save Changes
                    </button>
                </form>
            </div>
        </>
    );
};
export default TodoListModal;
