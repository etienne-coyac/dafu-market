import { useQuery } from "@tanstack/react-query";
import { getPanier } from "../../api/panier.api";
import { enableCache } from "../../AppProviders";
import useAuth from "../../context/auth.context";

const useCart = () => {
  const { user } = useAuth();
  const data = useQuery({
    queryKey: ["cart"],
    queryFn: getPanier,
    enabled: !!user,
    ...enableCache(),
  });
  return data;
};

export default useCart;
