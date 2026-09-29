import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("chefToken") || null);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("chefUser")) || {
      _id: "guest-id",
      name: "Chef Vijay",
      email: "vijay@cheftrack.app",
      currentLevel: 1,
      completedRecipes: [],
    }
  );

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("chefToken", authToken);
    localStorage.setItem("chefUser", JSON.stringify(userData));
  };

  const logout = () => {
    setUser({
      _id: "guest-id",
      name: "Guest Chef",
      email: "",
      currentLevel: 1,
      completedRecipes: [],
    });
    setToken(null);
    localStorage.removeItem("chefToken");
    localStorage.removeItem("chefUser");
  };

  const updateLevel = (newLevel, completedRecipes) => {
    const updated = { ...user, currentLevel: newLevel, completedRecipes };
    setUser(updated);
    localStorage.setItem("chefUser", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, updateLevel }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);