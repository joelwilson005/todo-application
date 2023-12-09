import {Helmet} from "react-helmet";
import titles from "./pageTitles";
import Footer from "../components/Footer";
import useLoadingState from "../hooks/useLoadingState";
import LoadingBars from "../animation/LoadingBars";

const Terms = () => {
    const loading = useLoadingState();

    if (loading) {
        return <LoadingBars/>;
    }
    return (
        <>
            <Helmet>
                <title>{titles.terms}</title>
            </Helmet>
            <div className=" min-w-full  grid grid-cols-1 p-10 bg-neutralBackground justify-items-center">
                <article className="prose lg:prose-xl  text-neutralText">
                    <h1>Terms and Conditions</h1>

                    <p>
                        These terms and conditions ("Agreement") govern your use of the JW
                        Todo web app ("the App") provided by JW Todo ("the Company"). By using
                        the App, you agree to be bound by these terms and conditions. If you
                        do not agree with any of these terms, please refrain from using the
                        App.
                    </p>

                    <h2>Use of the App</h2>

                    <ul>
                        <li>The App is intended for personal and non-commercial use only.</li>
                        <li>You must be at least 18 years old to use the App.</li>
                        <li>
                            You are responsible for maintaining the confidentiality of your
                            account credentials and are liable for any activities conducted
                            through your account.
                        </li>
                        <li>
                            You agree not to use the App for any illegal or unauthorized
                            purposes.
                        </li>
                        <li>
                            The Company reserves the right to suspend or terminate your access
                            to the App at any time without prior notice.
                        </li>
                    </ul>

                    <h2>Intellectual Property</h2>

                    <ul>
                        <li>
                            The App and all its contents, including but not limited to text,
                            graphics, logos, and images, are the property of the Company and are
                            protected by intellectual property laws.
                        </li>
                        <li>
                            You may not modify, reproduce, distribute, or create derivative
                            works based on the App or its contents without the prior written
                            consent of the Company.
                        </li>
                    </ul>

                    <h2>Privacy</h2>

                    <ul>
                        <li>
                            The Company respects your privacy and handles your personal
                            information in accordance with its Privacy Policy.
                        </li>
                        <li>
                            By using the App, you consent to the collection, use, and storage of
                            your personal information as outlined in the Privacy Policy.
                        </li>
                    </ul>

                    <h2>Limitation of Liability</h2>

                    <ul>
                        <li>
                            The Company shall not be liable for any direct, indirect,
                            incidental, consequential, or exemplary damages arising from your
                            use of the App.
                        </li>
                        <li>
                            The Company does not warrant that the App will be error-free or
                            uninterrupted, or that any defects will be corrected.
                        </li>
                    </ul>

                    <h2>Governing Law and Jurisdiction</h2>

                    <ul>
                        <li>
                            This Agreement shall be governed by and construed in accordance with
                            the laws of Jamaica.
                        </li>
                        <li>
                            Any disputes arising out of or in connection with this Agreement
                            shall be subject to the exclusive jurisdiction of the courts in
                            Jamaica.
                        </li>
                    </ul>

                    <h2>Changes to the Agreement</h2>

                    <ul>
                        <li>
                            The Company reserves the right to modify or amend this Agreement at
                            any time. Any changes will be effective upon posting the revised
                            Agreement on the App.
                        </li>
                        <li>
                            It is your responsibility to review the Agreement periodically for
                            any updates or changes.
                        </li>
                    </ul>

                    <p>
                        By using the JW Todo web app, you acknowledge that you have read,
                        understood, and agreed to these Terms and Conditions. If you do not
                        agree to any provisions of this Agreement, please discontinue the use
                        of the App.
                    </p>

                    <p>Last updated: November 11, 2023</p>
                </article>
            </div>
            <Footer/>
        </>
    );
};

export default Terms;
