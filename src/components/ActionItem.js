import { FaTrash } from "react-icons/fa6";
import { useState } from "react";
import {
  fetchUpdateActionItem,
  fetchDeleteActionItem,
} from "../data/todoListsSlice";
import { useDispatch } from "react-redux";
import CreateToastNotification from "./CreateToastNotification";
import { motion, AnimatePresence } from "framer-motion";

const ActionItem = ({ actionItem, todoListId }) => {
  const dispatch = useDispatch();
  const [textDescription, setTextDescription] = useState(
    actionItem.textDescription
  );
  const [completed, setCompleted] = useState(actionItem.completed);
  const [isShown, setIsShown] = useState(true);

  const handleTextDescriptionChange = (event) => {
    event.preventDefault();
    if (textDescription === "") {
      return;
    }

    const payload = {
      textDescription: textDescription,
      completed: completed,
      id: actionItem.id,
      todoListId: todoListId,
    };

    dispatch(fetchUpdateActionItem(payload))
      .unwrap()
      .catch((error) => {
        CreateToastNotification("error", "An unexpected error has occurred");
      });
  };

  const handleCompletedChange = (event) => {
    event.preventDefault();

    const payload = {
      textDescription: textDescription,
      completed: !completed,
      id: actionItem.id,
      todoListId: todoListId,
    };

    dispatch(fetchUpdateActionItem(payload))
      .unwrap()
      .catch((error) => {
        CreateToastNotification("error", "An unexpected error has occurred");
      });

    setCompleted(!completed);
  };

  const handleDeleteClick = (event) => {
    event.preventDefault();

    setIsShown(false);

    const payload = {
      id: actionItem.id,
      todoListId: todoListId,
    };

    dispatch(fetchDeleteActionItem(payload))
      .unwrap()
      .catch((error) => {
        CreateToastNotification("error", "An unexpected error has occurred");
      });
  };

  return (
    isShown && (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.25, 0.5, 0.75, 1] }}
          transition={{ duration: 0.8 }}
          exit={{
            scale: [1, 0.75, 0.5, 0.25, 0],
            transition: { duration: 0.4 },
          }}
          className="flex flex-row px-2 my-2 text-primary min-w-full"
        >
          <input
            type="checkbox"
            checked={completed}
            className=" w-4 h-4 mt-3"
            onChange={handleCompletedChange}
          />
          <input
            type="text"
            className={`ml-2 p-2 ${completed ? "line-through" : ""}`}
            required
            value={textDescription}
            onBlur={handleTextDescriptionChange}
            onChange={(e) => {
              setTextDescription(e.target.value);
            }}
          />
          <motion.button onClick={handleDeleteClick} whileHover={{
            scale: 1.3,
            rotate: "-5deg"
          }}className="hover:text-warning">
            <FaTrash></FaTrash>
          </motion.button>
        </motion.div>
      </AnimatePresence>
    )
  );
};

export default ActionItem;
