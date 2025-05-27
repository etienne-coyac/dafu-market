import { createContext, useContext, useEffect, useState } from "react";
import type { LoginType, UserType } from "../types/user";
import { useLocation, useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";

type AuthStrategy<U extends UserType> = {
  loginFn: (email: string, password: string) => Promise<string>; // returns token
  getCurrentUserFn: () => Promise<U>; // fetches user of type U
  loginRoute: string;
};

type AuthContextType<U extends UserType> = {
  user: U | null;
  loading: boolean;
  login: (payload: LoginType) => Promise<void>;
  /*
    use only inside user type hooks (client.context, admin.context, ...)
  */
  logout: () => void;
  canAccess: (route: string) => boolean;
};

const authContextDefaultValues: AuthContextType<UserType> = {
  user: null,
  loading: false,
  login: async () => {},
  logout: () => {},
  canAccess: () => true,
};

const AuthContext = createContext<AuthContextType<UserType>>(
  authContextDefaultValues
);

const protectedRoutes = ["/panier"];

export function AuthProvider<U extends UserType>({
  children,
  authStrategy,
}: Readonly<{
  children: React.ReactNode;
  authStrategy: AuthStrategy<U>;
}>) {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<U | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const login = async (payload: LoginType) => {
    setLoading(true);
    const token = await authStrategy.loginFn(payload.email, payload.password);
    localStorage.setItem("authToken", token);
    const user = await authStrategy.getCurrentUserFn();
    setUser(user);
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    queryClient.clear();
    setUser(null);
  };

  const canAccess = (route: string) =>
    !user && !protectedRoutes.includes(route);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token && !user) {
      setLoading(true);
      authStrategy
        .getCurrentUserFn()
        .then((user) => setUser(user))
        .catch(() => {
          logout();
          navigate(authStrategy.loginRoute);
        })
        .finally(() => setLoading(false));
    } else if (
      !user &&
      location.pathname !== "/" &&
      protectedRoutes.some((route) => route.includes(location.pathname))
    ) {
      navigate(authStrategy.loginRoute, { state: { from: location.pathname } });
    }
  }, [location.pathname, navigate, user]);

  return (
    <AuthContext.Provider value={{ user, login, logout, canAccess, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export default useAuth;
