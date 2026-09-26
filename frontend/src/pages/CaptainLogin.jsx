import { useState } from "react";
import { Link } from "react-router-dom";

export default function CaptainLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captainData, setCaptainDate] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setCaptainDate({
      email: email,
      password: password,
    });
    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between align-center">
      <div>
        <img
          className="w-35 mb-5"
          src="https://static.vecteezy.com/system/resources/previews/027/127/451/non_2x/uber-logo-uber-icon-transparent-free-png.png"
          alt="Yatrigan"
        />
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">What's Captain's email</h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-sm"
            type="email"
            placeholder="example@gmail.com"
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-sm"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            placeholder="password"
          />

          <button className="bg-[#111] text-white text-semibold mb-7 rounded px-4 py-2 w-full text-lg">
            Login
          </button>

          <p className="text-center text-lg">
            Join a feet ?
            <Link to="/captain-signup" className="text-blue-700 text-lg">
              {" "}
              Register as a Captain
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link
          to="/login"
          className="bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg"
        >
          Signup as a User
        </Link>
      </div>
    </div>
  );
}
