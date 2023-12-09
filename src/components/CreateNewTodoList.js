import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {fetchCreateNewTodoList} from "../data/todoListsSlice";
import CreateToastNotification from "./CreateToastNotification";

const CreateNewTodoList = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const handleCreateNewTodoList = (event) => {
        event.preventDefault();

        const payload = {
            title: title,
            description: description,
        };

        dispatch(fetchCreateNewTodoList(payload))
            .unwrap()
            .then(() => {
                CreateToastNotification("info", "Todo list successfully created", 1000);
            })
            .catch((error) => {
                CreateToastNotification("error", "An unexpected error has occurred");
            });
    };

    return (
        <form onSubmit={handleCreateNewTodoList}>
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
            <label className="block min-w-full mb-2 font-primary">Description</label>
            <input
                autoFocus={false}
                className="block p-2 mb-8 border-b-2 min-w-full border-main focus:border-transparent focus:ring-0 focus:border-0"
                type="text"
                value={description}
                onChange={(e) => {
                    setDescription(e.target.value);
                }}
            />
            <button type="submit">Save Changes</button>
        </form>
    );
};

export default CreateNewTodoList;
