import { createContext, useContext, useState } from "react";

const TodoListContext = createContext();

export const TodoListProvider = ({ children }) => {
  const [todoListId, setTodoListId] = useState(null);

  const updateTodoListId = (id) => {
    setTodoListId(id);
  };


  return (
    <TodoListContext.Provider value={{ todoListId, updateTodoListId}}>
      {children}
    </TodoListContext.Provider>
  );
};

export const useTodoListContext = () => {
  return useContext(TodoListContext);
};
