import React, { createContext, useContext, useState, useCallback } from "react";
import { Snackbar, Alert, Typography, type ColorPaletteProp } from "@mui/joy";

export type SnackbarOptions = {
  text: string;
  variant?: "soft" | "solid" | "outlined";
};

type SnackbarType = ColorPaletteProp;

type SnackbarContextType = {
  show: (type: SnackbarType, options: SnackbarOptions) => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<SnackbarType>("success");

  const show = useCallback((t: SnackbarType, options: SnackbarOptions) => {
    setType(t);
    setMessage(options.text);
    setOpen(true);
  }, []);

  return (
    <SnackbarContext.Provider value={{ show }}>
      {children}
      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={3000}
        color={type}
        variant="soft"
        size="sm"
      >
        <Typography>{message}</Typography>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};
