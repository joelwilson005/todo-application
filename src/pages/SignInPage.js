import LoadingBars from "../animation/LoadingBars";
import SignInForm from "../components/SignInForm";
import Footer from "../components/Footer";
import SignInImage from "../img/undraw_login_re_4vu2 (2).svg";
import "../animation/homePageAnimations";
import useLoadingState from "../hooks/useLoadingState";
import titles from "./pageTitles";
import {Helmet} from "react-helmet";
import {useNavigate} from "react-router-dom";
import useCheckUserStatus from "../hooks/useCheckUserStatus";

const SignInPage = () => {
    const loading = useLoadingState();

    const navigate = useNavigate();

    const isUserSignedIn = useCheckUserStatus();

    if (isUserSignedIn) {
        navigate("/dashboard");
    }


    if (loading) {
        return <LoadingBars/>;
    }
    return (
        <>
            <Helmet>
                <title>{titles.signIn}</title>
            </Helmet>

            <main className="grid min-h-screen grid-cols-1 gap-4 lg:grid-cols-2 bg:neutralBackground">
                <SignInForm></SignInForm>
                <img
                    alt="Sign In"
                    src={SignInImage}
                    className="hidden lg:block lg:place-self-center"
                ></img>
            </main>
            <Footer/>
        </>
    );
};

export default SignInPage;
