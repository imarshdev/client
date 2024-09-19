import React, { createContext, useState, useEffect } from "react";
/* this is the user context file. 
 In here we define globbally the username, token and logged in status. 
 we might need this when fetching data for security */
export const UserContext = createContext();

// context provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser !== null
      ? JSON.parse(storedUser)
      : {
          Username: "", // quite self explanatory
          Token: "", // same!!
          isLoggedIn: false, // same still
        };
  });

  /* storing this in local storage especially the logged in state to avoid re-logging in the user
  that can be a pain in the **s */
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
