import { createContext, useState, useEffect } from "react";


const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState(() => {
    const storedName = localStorage.getItem("userName");
    return storedName || "";
  });

    useEffect(() => {
      localStorage.setItem("userName", userName);
    }, [userName]);
  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };