import { createContext } from "react";

const UserContext = createContext();

export function UserProvider(props) {
  const user = {
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
  };

  function updateUser() {}

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
