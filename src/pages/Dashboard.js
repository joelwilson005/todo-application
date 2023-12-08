import useLoadingState from "../hooks/useLoadingState";
import LoadingBars from "../animation/LoadingBars";
import TodoListContainer from "../components/TodoListContainer";
import Footer from "../components/Footer";
import useCheckUserStatus from "../hooks/useCheckUserStatus";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import titles from "./pageTitles";
import DashboardNavBar from "../components/DashboardNavBar";

const Dashboard = () => {
  const loading = useLoadingState();

  const isUserSignedIn = useCheckUserStatus();

  const navigate = useNavigate();

  if (isUserSignedIn === false) {
    navigate("/signin");
  }

  if (loading) {
    return <LoadingBars></LoadingBars>;
  }

  return (
    <>
      <Helmet>
        <title>{titles.dashboard}</title>
      </Helmet>
      <DashboardNavBar />
      <TodoListContainer />
      <Footer />
    </>
  );
};

export default Dashboard;
