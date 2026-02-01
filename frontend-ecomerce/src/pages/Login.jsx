import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const navigate = useNavigate();
const location = useLocation();

const redirect =
  new URLSearchParams(location.search).get("redirect") || "home";


  const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

  

  const handleAuth = async (e) => {
    e.preventDefault(); 
    try {
      const url =
        currentState === "Login"
          ? "http://localhost:5000/api/users/login"
          : "http://localhost:5000/api/users/register";
  
      const body =
        currentState === "Login"
          ? { email, password }
          : { name, email, password };
  
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        alert(data.message);
        return;
      }
  
      // ✅ Save token for both login & register
      localStorage.setItem("token", data.token);
      // ✅ CONDITIONAL redirect
    if (redirect === "cart") {
      navigate("/cart");
    } else {
      navigate("/");
    }
      console.log("Login success");

  
    } catch (error) {
      console.log(error);
    }
  };
  
  

  return (
    <div className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">

      {/* TITLE */}
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">
          {currentState}
        </p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {/* NAME (ONLY FOR SIGN UP) */}
      {currentState !== "Login" && (
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-800"
        />
      )}

      {/* EMAIL */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-3 py-2 border border-gray-800"
      />

      {/* PASSWORD */}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-3 py-2 border border-gray-800"
      />

      {/* EXTRA OPTIONS */}
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">
          Forgot your password?
        </p>

        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer"
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Login
          </p>
        )}
      </div>

      {/* SUBMIT BUTTON */}
      <button onClick={handleAuth} className="bg-black text-white font-light px-8 py-2 mt-4">
  {currentState === "Login" ? "Sign In" : "Sign Up"}
</button>

    </div>
  );
};

export default Login;
