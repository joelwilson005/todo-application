const TodoListCard = ({ title, description }) => {
  return (
    <>
      <div className="p-6 my-4 rounded-lg max-h-36 bg-secondary text-neutralBackground">
        <h2 className="mb-8">{title}</h2>
        <p>{description}</p>
      </div>
    </>
  );
};

export default TodoListCard;
