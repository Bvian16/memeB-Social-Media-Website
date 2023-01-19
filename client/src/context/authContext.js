import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [page, setPage] = useState("login");

  const handlePage = (curPage) => {
    setPage(curPage);
    // console.log("auth ", page);
  };

  const register = async (inputs) => {
    await axios.post("http://localhost:8800/api/auth/register", inputs);
  };

  const login = async (inputs) => {
    const res = await axios.post(
      "http://localhost:8800/api/auth/login",
      inputs,
      {
        withCredentials: true,
      }
    );

    setCurrentUser(res.data);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{ currentUser, page, handlePage, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
