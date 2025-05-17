import { useTheme } from "@mui/joy";
import type { Breakpoint } from "@mui/system";
import { useEffect, useState } from "react";

type UpDown = "up" | "down";

const useMediaQuery = (target: UpDown, breakpoint: Breakpoint) => {
  const [matches, setMatches] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const uiQuery = theme.breakpoints[target](breakpoint).replace(
      "@media ",
      ""
    );
    const mediaQuery = window.matchMedia(uiQuery);
    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, [target, breakpoint, theme]);

  return matches;
};

export default useMediaQuery;
