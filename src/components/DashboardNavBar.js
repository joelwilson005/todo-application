import { FaPlus, FaUser } from "react-icons/fa6";
import { motion } from "framer-motion";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { useState, useEffect, useRef } from "react";
import CreateNewTodoList from "./CreateNewTodoList";
import "../styles/modal.css";
import { useNavigate } from "react-router-dom";
import AccountSettingsModal from "./AccountSettingsModal";

const DashboardNavBar = () => {
  const [open, setOpen] = useState(false);
  const [openUserSettings, setOpenUserSettings] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = (event) => {
    setOpen(true);
  };

  const handleOpenUserSettings = (event) => {
    setOpenUserSettings(true);
  };

  const handleUserClick = (event) => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSignOutUser = (event) => {
    localStorage.setItem("isUserSignedIn", "false");
    navigate("/");
    localStorage.clear();
  };

  return (
    <>
      <nav className=" bg-main text-neutralBackground">
        <ul className="grid grid-cols-2 grid-rows-1 p-8">
          <motion.li
            whileHover={{
              scale: 1.05,
              rotate: "-0.5deg",
            }}
            onClick={handleClick}
            className="border-2 block max-w-fit p-4 hover:cursor-pointer rounded-md"
          >
            <FaPlus className="inline  mr-2"></FaPlus>
            <span>Add new</span>
          </motion.li>
          <motion.li
            ref={dropdownRef}
            whileHover={{
              scale: 1.07,
            }}
            onClick={handleUserClick}
            className="p-4 border-2 rounded-full max-w-fit place-self-end hover:cursor-pointer relative"
          >
            <FaUser></FaUser>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-accent ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <a
                    href="#"
                    onClick={handleOpenUserSettings}
                    className="block px-4 py-2 text-sm text-neutralBackground hover:bg-secondary"
                    role="menuitem"
                  >
                    Account Settings
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-neutralBackground hover:bg-secondary"
                    role="menuitem"
                    onClick={handleSignOutUser}
                  >
                    Sign out
                  </a>
                </div>
              </div>
            )}
          </motion.li>
        </ul>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          classNames={{ modal: "modal" }}
        >
          <CreateNewTodoList />
        </Modal>

        <Modal
          open={openUserSettings}
          onClose={() => setOpenUserSettings(false)}
          classNames={{ modal: "modal" }}
        >
          <AccountSettingsModal />
        </Modal>
      </nav>
    </>
  );
};

export default DashboardNavBar;
