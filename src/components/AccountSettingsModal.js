import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  fetchGetUser,
  getUserFromStore,
  fetchUpdateUser,
  fetchDeleteAccount
} from "../data/userSlice";
import CreateToastNotification from "./CreateToastNotification";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AccountSettingsModal = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [gender, setGender] = useState(null);
  const [userId, setUserId] = useState(null);

  const [usernameError, setUsernameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [firstNameError, setFirstNameError] = useState(null);
  const [lastNameError, setLastNameError] = useState(null);
  const [dateOfBirthError, setDateOfBirthError] = useState(null);
  const [genderError, setGenderError] = useState(null);

  useEffect(() => {
    dispatch(fetchGetUser())
      .unwrap()
      .catch((error) => {
        CreateToastNotification("error", "An unexpected error has occurred");
      });
  }, [dispatch]);

  const userEntity = useSelector(getUserFromStore);

  useEffect(() => {
    if (userEntity) {
      setUserId(userEntity.userId);
      setUsername(userEntity.username);
      setEmail(userEntity.emailAddress);
      setPassword(userEntity.password);
      setFirstName(userEntity.firstName);
      setLastName(userEntity.lastName);
      setDateOfBirth(
        userEntity.dateOfBirth
          ? new Date(userEntity.dateOfBirth).toISOString().split("T")[0]
          : ""
      );
      setGender(userEntity.gender ? userEntity.gender.toLowerCase() : "");

      console.log("GENDER: " + gender);
    }
  }, [dispatch, userEntity]);

  // Function to validate form fields
  const validateForm = () => {
    let isValid = true;

    // Validate username
    if (!username) {
      setUsernameError("Username is required");
      isValid = false;
    } else {
      setUsernameError(null);
    }

    // Validate email
    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else {
      setEmailError(null);
    }

    // Validate first name
    if (!firstName) {
      setFirstNameError("First name is required");
      isValid = false;
    } else {
      setFirstNameError(null);
    }

    // Validate last name
    if (!lastName) {
      setLastNameError("Last name is required");
      isValid = false;
    } else {
      setLastNameError(null);
    }

    // Validate date of birth
    if (!dateOfBirth) {
      setDateOfBirthError("Date of birth is required");
      isValid = false;
    } else if (new Date(dateOfBirth) > new Date()) {
      setDateOfBirthError("Date of birth must be in the past");
      isValid = false;
    } else {
      setDateOfBirthError(null);
    }

    // Validate gender
    if (!gender) {
      setGenderError("Gender is required");
      isValid = false;
    } else {
      setGenderError(null);
    }

    return isValid;
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    console.log("FORM SUBMITTED");
    e.preventDefault();

    // Validate form fields
    if (validateForm()) {
      const payload = {
        userId: userId,
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password,
        emailAddress: email,
        dateOfBirth: dateOfBirth,
        gender: gender,
      };

      console.log("FORM VALIDATED " + userId);

      console.log("PAYLOAD from form: " + JSON.stringify(payload));

      dispatch(fetchUpdateUser(payload))
        .unwrap()
        .then(() =>
          CreateToastNotification("success", "Account updated successfully")
        )
        .catch((error) => {
          CreateToastNotification("error", "An unexpected error has occurred");
        });
    }
  };

  const handleAccountDeletion = (event) => {
    event.preventDefault();

    const userConfirmed = window.confirm(
      "Are you sure you want to delete your account? Your account will be permanently deleted after 14 days if you don't sign back in."
    );

    if (userConfirmed) {



      dispatch(fetchDeleteAccount())
        .unwrap()
        .then(() => {
          localStorage.setItem("isUserSignedIn", "false");
          localStorage.clear();
          navigate("/");
        })
        .catch((error) => {
          CreateToastNotification("error", "An unexpected error has occurred");
        });
    
    }
  };

  return (
    <>
      <div>
        <h1 className="text-xl text-primary mb-4 text-center">
          Account Settings
        </h1>
      </div>

      <form
        className="bg-neutralBackground p-8 rounded-lg max-w-md mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4"
        onSubmit={handleSubmit}
      >
        <label className="block text-primary mb-4">
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-main rounded-md"
          />
          {usernameError && (
            <p className="text-error text-sm">{usernameError}</p>
          )}
        </label>
        <label className="block text-primary mb-4">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-main rounded-md"
          />
          {emailError && <p className=" text-sm text-error">{emailError}</p>}
        </label>
        <label className="block text-primary mb-4">
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-3 py-2 border border-main rounded-md"
          />
          {firstNameError && (
            <p className="text-error text-sm">{firstNameError}</p>
          )}
        </label>
        <label className="block text-primary mb-4">
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-3 py-2 border border-main rounded-md"
          />
          {lastNameError && (
            <p className="text-error text-sm">{lastNameError}</p>
          )}
        </label>
        <label className="block text-primary mb-4">
          Date of Birth:
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            className="w-full px-3 py-2 border border-main rounded-md"
          />
          {dateOfBirthError && (
            <p className="text-error text-sm">{dateOfBirthError}</p>
          )}
        </label>
        <label className="block text-primary mb-4">
          Gender:
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full px-3 py-2 border border-main rounded-md"
          >
            <option value="">Select...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {genderError && <p className="text-error text-sm">{genderError}</p>}
        </label>
        <motion.button
          type="submit"
          whileHover={{ scale: 0.9 }}
          whileTap={{ scale: 0.9 }}
          className="w-full bg-accent text-neutralBackground py-2 px-4 rounded-md cursor-pointer mt-4 lg:col-span-2"
        >
          Save Changes{" "}
        </motion.button>
      </form>

      <div className="text-center mt-10">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleAccountDeletion}
          type="button"
          className="bg-error text-neutralBackground py-2 px-4 rounded-md cursor-pointer"
        >
          Delete Account
        </motion.button>
      </div>
    </>
  );
};

export default AccountSettingsModal;
