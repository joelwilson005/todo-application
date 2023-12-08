import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import Dashboard from "./pages/Dashboard";
import PasswordResetPage from "./pages/PasswordResetPage";
import Terms from "./pages/Terms";
import NotFoundPage from "./pages/NotFoundPage";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./util/scrollToTop";

function App() {
  return (
    <>
      <Toaster />
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/signin" Component={SignInPage} />
          <Route path="/signup" Component={SignUpPage} />
          <Route path="/reset" Component={PasswordResetPage} />
          <Route path="/dashboard" Component={Dashboard} />
          <Route path="/terms" Component={Terms} />

          <Route path="*" Component={NotFoundPage} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
