import { useState, createContext, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();


const UserProvider = ({ children }) => {

  const [state, setState] = useState({});

  useEffect(() => {
    setState(JSON.parse(window.localStorage.getItem("auth")));
  }, [state && state.token]);

  const token = state  ? state.token : "";
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  return (
    <UserContext.Provider value={[state, setState]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };