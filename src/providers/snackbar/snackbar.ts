import type { ColorPaletteProp } from "@mui/joy";
import type { SnackbarOptions } from "./SnackbarProvider";

type SnackbarType = ColorPaletteProp;

let handler: ((type: SnackbarType, options: SnackbarOptions) => void) | null =
  null;

export const registerSnackbar = (fn: typeof handler) => {
  handler = fn;
};

export const snackbar = {
  success: (opts: SnackbarOptions) => handler?.("success", opts),
  error: (opts: SnackbarOptions) => handler?.("danger", opts),
  primary: (opts: SnackbarOptions) => handler?.("primary", opts),
  warning: (opts: SnackbarOptions) => handler?.("warning", opts),
};
