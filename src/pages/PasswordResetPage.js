import LoadingBars from "../animation/LoadingBars";
import ResetPasswordForm from "../components/ResetPasswordForm";
import Footer from "../components/Footer";
import ForgotPasswordImage from "../img/undraw_forgot_password_re_hxwm.svg";
import "../animation/homePageAnimations";
import useLoadingState from "../hooks/useLoadingState";
import titles from "./pageTitles";
import {Helmet} from "react-helmet";
import {useNavigate} from "react-router-dom";
import useCheckUserStatus from "../hooks/useCheckUserStatus";

const PasswordResetPage = () => {
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
                <title>{titles.resetPassword}</title>
            </Helmet>

            <main className="grid min-h-screen grid-cols-1 gap-4 lg:grid-cols-2 bg:neutralBackground">
                <ResetPasswordForm></ResetPasswordForm>
                <img
                    alt="Sign In"
                    src={ForgotPasswordImage}
                    className="hidden lg:block lg:place-self-center"
                ></img>
            </main>
            <Footer/>
        </>
    );
};

export default PasswordResetPage;
