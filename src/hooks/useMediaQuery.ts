import { useTheme } from "@mui/joy";
import type { Breakpoint } from "@mui/system";
import { useEffect, useState } from "react";

type UpDown = "up" | "down";

const useMediaQuery = (target: UpDown, breakpoint: Breakpoint) => {
  const theme = useTheme();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getMatch = () => {
    const uiQuery = theme.breakpoints[target](breakpoint).replace(
      "@media ",
      ""
    );
    const mediaQuery = window.matchMedia(uiQuery);
    return mediaQuery;
  };

  const [matches, setMatches] = useState<boolean>(getMatch().matches);

  useEffect(() => {
    const newMatch = getMatch();
    if (newMatch.matches !== matches) setMatches(newMatch.matches);

    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
    newMatch.addEventListener("change", handler);

    return () => newMatch.removeEventListener("change", handler);
  }, [target, breakpoint, theme, matches, getMatch]);

  return matches;
};

export default useMediaQuery;
