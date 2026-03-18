import { createContext, useState } from "react";

const UserContext = createContext();

export function UserProvider(props) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) ?? {
      name: "Segun Olu-Abe",
      email: "segun.oluabe@gmail.com",
      other: {
        accountNumber: "****5678",
        accountType: "Savings Account",
        memberSince: "January 2020",
        phoneNumber: "+234 803 456 7890",
        address: "Lekki Phase 1, Lagos, Nigeria",
        nationality: "Nigeria",
        status: "Active",
      },
    },
  );

  function sanitizeInput(value) {
    return value.replace(/[^a-zA-Z0-9 ]/g, "");
  }

  function updateUser(key, value) {
    if (key in user) {
      const newUser = { ...user, [key]: sanitizeInput(value) };
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
    }
  }

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
