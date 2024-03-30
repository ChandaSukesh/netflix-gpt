import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { netflixLogo, userAvatar } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  // on auth change- This is used to check authentication and to update our user store
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // sign in case
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    //unsubscribe when components unmounts, unsubscribe is provided by firebase
    return () => unsubscribe();
  }, []);

  const signOutHandler = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        navigate("/errorPage");
      });
  };

  return (
    <div className="absolute w-screen z-10 px-8 py-8 bg-gradient-to-b from-black flex justify-between">
      <img className="w-44" src={netflixLogo} alt="logo" />
      {user && (
        <div className="flex p-2">
          <img src={userAvatar} alt="Sign-out-icon" className="w-12 h-12" />
          <button
            className="font-bold text-white cursor-pointer"
            onClick={signOutHandler}
          >
            (Sign out)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
