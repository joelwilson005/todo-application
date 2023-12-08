import React from "react";
import Footer from "../components/Footer";
import LoadingBars from "../animation/LoadingBars";
import { motion } from "framer-motion";
import backgroundImage from "../img/undraw_taken_re_yn20 (1).svg";
import logo from "../img/vectorpaint.svg";
import { homePageAnimations } from "../animation/homePageAnimations";
import useLoadingState from "../hooks/useLoadingState";
import { Helmet } from "react-helmet";
import titles from "./pageTitles";
import { Link } from "react-router-dom";
const NotFoundPage = () => {
  const loading = useLoadingState();

  if (loading) {
    return <LoadingBars></LoadingBars>;
  }

  return (
    <>
      <Helmet>
        <title>{titles.notFound}</title>
      </Helmet>
      <div className="grid min-h-screen grid-cols-1">
        <nav className="grid grid-cols-2 pt-10 pl-10 pr-10 place-content-between bg-neutralBackground">
          <div className="col-span-1">
            <img className="w-[160px] h-[80px]" src={logo} alt="logo" />
          </div>
        </nav>
        <main className="grid grid-cols-1 gap-1 px-10 sm:pt-8 bg-neutralBackground lg:grid-cols-2">
          <motion.p
            initial={homePageAnimations.initial}
            animate={homePageAnimations.animateFromLeft}
            transition={homePageAnimations.transition}
            className="col-span-1 my-auto text-3xl tracking-tighter text-center md:text-5xl font-secondary text-main md:tracking-tight md:leading-10 "
          >
            You seem to be lost 😔
            <br />
            <Link
              className="block py-10 text-2xl text-accent hover:underline"
              to="/"
            >
              Return home
            </Link>
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

export default NotFoundPage;
