import { createContext, useCallback, useContext, useState } from "react";
import useAuth from "./auth.context";
import useClientData from "./client.context";
import LoginModal from "../components/ui/modals/LoginModal";
import ChoseMagasinModal from "../components/ui/modals/ChoseMagasinModal";

type CartGuardContextType = {
  beforeAddCart: () => void;
};

const cartGuardContextDefaultValue: CartGuardContextType = {
  beforeAddCart: () => {},
};

export const CartGuardContext = createContext<CartGuardContextType>(
  cartGuardContextDefaultValue
);

export const CartGuardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useAuth();
  const { idMagasin } = useClientData();
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
  const [openChoseMagasin, setOpenChoseMagasin] = useState<boolean>(false);

  const handleBeforeAddCart = useCallback(() => {
    if (!user) setOpenLoginModal(true);
    else if (!idMagasin) setOpenChoseMagasin(true);
  }, [idMagasin, user]);

  return (
    <CartGuardContext.Provider value={{ beforeAddCart: handleBeforeAddCart }}>
      {children}
      <LoginModal
        open={openLoginModal}
        setOpen={setOpenLoginModal}
        next={() => {
          if (!idMagasin) setOpenChoseMagasin(true);
        }}
      />
      <ChoseMagasinModal
        open={openChoseMagasin}
        setOpen={setOpenChoseMagasin}
      />
    </CartGuardContext.Provider>
  );
};

const useCartGuard = () => {
  const context = useContext(CartGuardContext);
  if (context === undefined) {
    throw new Error("useCartGuard must be used within a CartGuardProvider");
  }
  return context;
};

export default useCartGuard;
