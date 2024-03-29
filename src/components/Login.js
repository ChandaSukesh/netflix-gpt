import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [showSign, setShowSignIn] = useState(true);

  const toggleHandler = () => {
    setShowSignIn(!showSign);
  };

  return (
    <div>
      <Header />
      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e0-ecd7979cc88b/a3873901-5b7c-46eb-b9fa-12fea5197bd3/IN-en-20240311-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
        alt="logo"
        className="absolute"
      />

      <form className="w-3/12 p-12 bg-black absolute mx-auto my-36 right-0 left-0 text-white rounded-lg bg-opacity-80">
        <h1 className="font-bold text-3xl py-4">
          {showSign ? "Sign In" : "Sign Up"}
        </h1>
        {!showSign && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-2 my-4 w-full bg-gray-700"
          />
        )}
        <input
          type="text"
          placeholder="Email Address"
          className="p-2 my-4 w-full bg-gray-700"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 my-4 w-full bg-gray-700"
        />
        <button className="p-4 my-6 bg-red-700 w-full">
          {showSign ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleHandler}>
          {showSign
            ? "New to Netflix? Sign Up Now"
            : "Already registered user? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
