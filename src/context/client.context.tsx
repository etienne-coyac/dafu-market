import { createContext, useContext, useEffect, useState } from "react";
import type { MagasinType } from "../types/magasin";
import { enableCache } from "../AppProviders";
import { getMagasins } from "../api/magasins.api";
import { useQuery } from "@tanstack/react-query";
import { getPanier } from "../api/panier.api";
import useAuth from "./auth.context";
import type { CartType } from "../types/cart";

type ClientContextType = {
  magasin: MagasinType | undefined;
  idMagasin: number | undefined;
  setIdMagasin: (idMagasin: number | undefined) => void;

  cart: CartType | undefined;
};

const clientContextDefaultValue: ClientContextType = {
  magasin: undefined,
  idMagasin: undefined,
  setIdMagasin: () => {},

  cart: undefined,
};

export const ClientContext = createContext<ClientContextType>(
  clientContextDefaultValue
);

export const ClientContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useAuth();

  const { data: cart } = useQuery({
    queryKey: ["cart-client"],
    queryFn: getPanier,
    enabled: !!user,
    ...enableCache(),
  });

  const [idMagasin, setIdMagasin] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (cart && cart.lignes.length > 0) {
      setIdMagasin(cart.lignes[0].idMagasin);
    }
  }, [cart]);

  const { data: magasins } = useQuery({
    queryKey: ["magasins"],
    queryFn: getMagasins,
    ...enableCache(),
  });

  const magasin = magasins?.find((magasin) => magasin.idMagasin === idMagasin);

  return (
    <ClientContext.Provider value={{ magasin, idMagasin, setIdMagasin, cart }}>
      {children}
    </ClientContext.Provider>
  );
};

const useClientData = () => {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error("useClientData must be used within a ClientDataProvider");
  }
  return context;
};

export default useClientData;
