import React from "react";
import Footer from "../components/Footer";
import LoadingBars from "../animation/LoadingBars";
import { motion } from "framer-motion";
import backgroundImage from "../img/undraw_to_do_re_jaef (1).svg";
import logo from "../img/vectorpaint.svg";
import { homePageAnimations } from "../animation/homePageAnimations";
import useLoadingState from "../hooks/useLoadingState";
import { Helmet } from "react-helmet";
import titles from "./pageTitles";
import useCheckUserStatus from "../hooks/useCheckUserStatus";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const loading = useLoadingState();

  const isUserSignedIn = useCheckUserStatus();

  if (isUserSignedIn) {
    navigate("/dashboard");
  }

  if (loading) {
    return <LoadingBars></LoadingBars>;
  }

  return (
    <>
      <Helmet>
        <title>{titles.home}</title>
      </Helmet>
      <div className="grid min-h-screen grid-cols-1">
        <nav className="grid grid-cols-2 pt-10 pl-10 pr-10 place-content-between bg-neutralBackground">
          <div className="col-span-1">
            <img className="w-[160px] h-[80px]" src={logo} alt="logo" />
          </div>
          <div className="col-span-1 text-2xl font-primary text-accent">
            <ul className="flex flex-row justify-end ">
              <li className="block ml-1 hover:underline hover:cursor-pointer">
                <a href="/signup">Sign up</a>
              </li>
              <li className="block px-1 ml-4 border-2 rounded-md hover:underline hover:cursor-pointer border-accent">
                <a className="" href="/signin">
                  Sign in
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <main className="grid grid-cols-1 px-10 bg-neutralBackground lg:grid-cols-2">
          <motion.p
            initial={homePageAnimations.initial}
            animate={homePageAnimations.animateFromLeft}
            transition={homePageAnimations.transition}
            className="col-span-1 my-auto text-3xl tracking-tighter text-center md:text-5xl font-secondary text-main md:tracking-tight md:leading-10 "
          >
            Tracking your daily tasks has never been easier!
          </motion.p>
          <motion.div
            initial={homePageAnimations.initial}
            animate={homePageAnimations.animateFromRight}
            transition={homePageAnimations.transition}
            className="col-span-1"
          >
            <img src={backgroundImage} alt="background" />
          </motion.div>
        </main>
      </div>

      <Footer></Footer>
    </>
  );
};

export default HomePage;
