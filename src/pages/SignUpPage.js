// Importing necessary dependencies and components
import LoadingBars from "../animation/LoadingBars";
import Footer from "../components/Footer";
import SignUpImage from "../img/undraw_sign_up_n6im (1).svg";
import "../animation/homePageAnimations";
import { Helmet } from "react-helmet";
import titles from "./pageTitles";
import useLoadingState from "../hooks/useLoadingState";
import SignUpForm from "../components/SignUpForm";
import { useNavigate } from "react-router-dom";
import useCheckUserStatus from "../hooks/useCheckUserStatus";

// Functional component for the SignUpPage
const SignUpPage = () => {
  // Custom hook to check if the user is already signed in
  const isUserSignedIn = useCheckUserStatus();

  const navigate = useNavigate();

  // Custom hook to manage loading state
  const loading = useLoadingState();

  if (isUserSignedIn) {
    navigate("/dashboard");
  }

  // Redirect to the dashboard if the user is already signed in
  // Display loading animation while checking user status
  if (loading) {
    return <LoadingBars></LoadingBars>;
  }

  // JSX for the SignUpPage component
  return (
    <>
      {/* Setting page title using Helmet */}
      <Helmet>
        <title>{titles.signUp}</title>
      </Helmet>

      {/* Main content of the SignUpPage */}
      <main className="grid min-h-screen grid-cols-1 gap-4 lg:grid-cols-2 bg:neutralBackground">
        {/* SignUpForm component for user registration */}
        <SignUpForm />

        {/* Image displayed only on larger screens */}
        <img
          alt="Sign In"
          src={SignUpImage}
          className="hidden lg:block lg:place-self-center"
        ></img>
      </main>

      {/* Footer component for the page */}
      <Footer></Footer>
    </>
  );
};

// Exporting the SignUpPage component as the default export
export default SignUpPage;
