import { createContext, useContext, useState } from "react";
import type { LoginType, UserType } from "../types/user";
import { login as apiLogin } from "../api/services/auth";
import { getCurrentClient } from "../api/client";

type AuthContextType = {
  user: UserType | null;
  login: (payload: LoginType) => Promise<void>;
  logout: () => void;
};

const authContextDefaultValues: AuthContextType = {
  user: null,
  login: async () => {},
  logout: () => {},
};

export const AuthContext = createContext<AuthContextType>(
  authContextDefaultValues
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);

  const login = async (payload: LoginType) => {
    console.log("oui");
    const token = await apiLogin(payload.email, payload.password);
    console.log("non", token);
    localStorage.setItem("authToken", token);
    const user = await getCurrentClient();
    console.log("yes", user);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export default useAuth;
