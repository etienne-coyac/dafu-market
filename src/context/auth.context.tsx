import { createContext, useContext, useEffect, useState } from "react";
import type { LoginType, UserType } from "../types/user";
import { login as apiLogin } from "../api/services/auth";
import { getCurrentClient } from "../api/client";
import { useLocation, useNavigate } from "react-router";

type AuthContextType = {
  user: UserType | null;
  loading: boolean;
  login: (payload: LoginType) => Promise<void>;
  logout: () => void;
  canAccess: (route: string) => boolean;
};

const authContextDefaultValues: AuthContextType = {
  user: null,
  loading: false,
  login: async () => {},
  logout: () => {},
  canAccess: () => true,
};

export const AuthContext = createContext<AuthContextType>(
  authContextDefaultValues
);

const protectedRoutes = ["/panier"];

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const login = async (payload: LoginType) => {
    setLoading(true);
    const token = await apiLogin(payload.email, payload.password);
    localStorage.setItem("authToken", token);
    const user = await getCurrentClient();
    setUser(user);
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  const canAccess = (route: string) =>
    !user && !protectedRoutes.includes(route);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setLoading(true);
      getCurrentClient()
        .then((user) => setUser(user))
        .catch(() => {
          logout();
          navigate("/login");
        })
        .finally(() => setLoading(false));
    } else if (
      location.pathname !== "/" &&
      protectedRoutes.some((route) => route.includes(location.pathname))
    ) {
      navigate("/login", { state: { from: location.pathname } });
    }
  }, [location.pathname]);

  return (
    <AuthContext.Provider value={{ user, login, logout, canAccess, loading }}>
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
