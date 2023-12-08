import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import React from "react";
import TodoListModal from "./TodoListModal";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import "../styles/modal.css";

const TodoListCard = ({ title, description, id, lastUpdated }) => {
  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <>
      <motion.div
        key="card"
        onClick={handleClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1 } }}
        className="min-w-full shadow-xl p-6 my-4 rounded-lg max-h-36 bg-secondary text-neutralBackground hover:cursor-pointer"
      >
        <h2 className="mb-8">{title}</h2>
        <p>{description}</p>
        <p>
          <span className="bold text-sm">Last updated:</span>{" "}
          {new Date(lastUpdated).toLocaleString()}
        </p>
      </motion.div>

      <Modal
        open={open}
        onClose={handleCloseModal}
        classNames={{
          modal: "modal",
        }}
      >
        <TodoListModal todoListId={id} />
      </Modal>
    </>
  );
};

export default TodoListCard;
