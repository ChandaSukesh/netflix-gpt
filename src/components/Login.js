import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidateData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { netflixBackgroundImg } from "../utils/constants";

const Login = () => {
  const [showSignIn, setShowSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const toggleHandler = () => {
    setShowSignIn(!showSignIn);
  };

  const buttonClickHandler = (e) => {
    // Validate the form data
    const message = checkValidateData(
      email.current.value,
      password.current.value,
      showSignIn ? null : name.current.value,
      showSignIn
    );

    setErrorMessage(message);

    if (message) return;

    // Sign-in-Sign-up Logic
    if (!showSignIn) {
      //sign-up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;

          // doing for the purpose of display name updation
          updateProfile(user, {
            displayName: name.current.value,
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName })
              );
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(error?.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + errorMessage);
        });
    } else {
      //sign-in logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + errorMessage);
        });
    }
  };

  return (
    <div>
      <Header />
      <img src={netflixBackgroundImg} alt="logo" className="absolute" />

      <form
        onSubmit={(e) => e?.preventDefault()}
        className="w-3/12 p-12 bg-black absolute mx-auto my-36 right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {showSignIn ? "Sign In" : "Sign Up"}
        </h1>
        {!showSignIn && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-2 my-4 w-full bg-gray-700"
            ref={name}
          />
        )}
        <input
          type="text"
          placeholder="Email Address"
          className="p-2 my-4 w-full bg-gray-700"
          ref={email}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 my-4 w-full bg-gray-700"
          ref={password}
        />
        <p className="text-red-500 font-bold text-md py-2">{errorMessage}</p>
        <button
          className="p-4 my-6 bg-red-700 w-full"
          onClick={buttonClickHandler}
        >
          {showSignIn ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleHandler}>
          {showSignIn
            ? "New to Netflix? Sign Up Now"
            : "Already registered user? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
