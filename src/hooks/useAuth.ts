import { useQuery } from "@tanstack/react-query";
import { getCurrentClient } from "../api/client";

const useAuth = () => {
  const { data: user } = useQuery({
    queryKey: ["client"],
    queryFn: getCurrentClient,
  });
  const isAuthenticated = localStorage.getItem("authToken") !== null && !!user;
  console.log("isAuthenticated", isAuthenticated);
  return { isAuthenticated, user };
};

export default useAuth;
