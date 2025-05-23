import { useEffect, useState } from "react";

function useIsSmallScreen(breakpoint = 640) {
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);

        const updateMatch = () => setIsSmallScreen(mediaQuery.matches);

        updateMatch(); // Initial check
        mediaQuery.addEventListener("change", updateMatch);

        return () => {
            mediaQuery.removeEventListener("change", updateMatch);
        };
    }, [breakpoint]);

    return isSmallScreen;
}
export default useIsSmallScreen;