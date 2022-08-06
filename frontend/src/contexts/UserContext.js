import { createContext, useState } from "react";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    isLoggedIn: false,
    _id: null,
    token: null,
  });

  // User login
  const login = (_id, token) => {
    setUser({
      isLoggedIn: true,
      _id: _id,
      token: token,
    });
  };

  // User logout
  const logout = () => {
    setUser({
      isLoggedIn: false,
      _id: null,
      token: null,
    });
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
