import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import chef from "../../Images/chef.png";
import gsap from "gsap";
import authService from "../appwrite/Auth";

function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
  useEffect(() => {
    tl.from(".signup-div", { y: "-80%" }, "signup").to(
      ".signup-div",
      { y: 0, duration: 0.5 },
      "signup"
    );
  }, [window.location.pathname==='/signup']);
  const handleClose = () => {
    navigate("/", { replace: true });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name || !email || !password || !confirmpassword){
      setError("Please fill all the fields");
      return;
    }
    if(password!==confirmpassword){
      setError("Passwords do not match");
      return;
    }
    if(password.length<8){
      setError("Password must be atleast 8 characters long");
      return;
    }
    authService.createAccount({ email, password, name });
    setRole("");
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setImage("");
    navigate("/", { replace: true });
    window.location.reload();
  };
  return (
    <div className="w-screen h-screen bg-black/20 z-50 fixed">
      <div className="w-full my-2 flex justify-center items-center h-full">
        <div className="w-fit h-full sm:h-fit mx-2 p-4 bg-white rounded-lg shadow-xl signup-div z-50">
          <div className="flex w-full h-fit">
            <h2 className="text-3xl p-1 font-semibold text-center text-orange-400">
              Sign Up
            </h2>
            <button onClick={handleClose} className="ml-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex justify-center items-center text-red-600">{error}</div>
          <form className="mt-3">
              <div className="w-96">
                <div className="mb-3">
                  <label
                    for="name"
                    className="block mb-2 text-sm font-medium text-gray-600"
                  >
                    Name
                  </label>
                  <input
                    type="name"
                    id="name"
                    name="name"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-4 border rounded-lg"
                  />
                </div>
                <div className="mb-3">
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-4 border rounded-lg"
                  />
                </div>
                <div className="mb-3">
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-600"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    minLength={8}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-4 border rounded-lg"
                  />
                </div>
                <div className="mb-3">
                  <label
                    for="cpassword"
                    className="block mb-2 text-sm font-medium text-gray-600"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="cpassword"
                    name="cpassword"
                    minLength={8}
                    value={confirmpassword}
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-4 border rounded-lg"
                  />
                </div>
              </div>
            <div className="w-full flex justify-center">
              <button
                onClick={handleSubmit}
                className="w-1/2 p-4 text-white bg-orange-400 rounded-lg transition-colors hover:bg-orange-500"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
