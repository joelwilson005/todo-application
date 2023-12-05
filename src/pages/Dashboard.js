import useLoadingState from "../hooks/useLoadingState";
import LoadingBars from "../animation/LoadingBars";
import TodoListContainer from "../components/TodoListContainer";
import Foote

const Dashboard = () => {


  const loading = useLoadingState();

  

  

  if (loading) {
    return <LoadingBars></LoadingBars>;
  }

  return (
    <>
      <TodoListContainer/>
    </>
  );
};

export default Dashboard;
