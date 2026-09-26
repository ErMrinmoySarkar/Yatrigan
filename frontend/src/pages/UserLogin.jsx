import { useState } from "react";
import { Link } from "react-router-dom";

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserDate] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setUserDate({
      email: email,
      password: password,
    });
    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between align-center">
      <div>
        <img className="w-16 mb-10" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original" alt="Yatrigan" />
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
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
            New Here ?
            <Link to="/signup" className="text-blue-700 text-lg">
              {" "}
              Create new Account
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link to="/captain-login" className="bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg">Signup as a Captain</Link>
      </div>
    </div>
  );
}
