import React, { createContext, useState } from "react";

export const userDataContext = createContext();

export default function UserContext({ children }) {
  const [user, setUser] = useState({
    email: "",
    fullName: {
      firstName: "",
      lastName: "",
    },
  });
  return (
    <div>
      <userDataContext.Provider value={[user, setUser]}>
        {children}
      </userDataContext.Provider>
    </div>
  );
}
