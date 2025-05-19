import { KeyboardArrowDown } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/joy";
import { useState } from "react";
import { useRouteError } from "react-router";

const emojis = ["(ᵕ•_•)", "(ᵕ,•ᴗ•)", "(˘ŏ_ŏ)", "(ᵕ—ᴗ—)", "(つ╥﹏╥)つ"];

const ErrorBoundary = () => {
  const [emojiIndex, setEmojiIndex] = useState<number>(
    +(Math.random() * (emojis.length - 1)).toFixed(0)
  );
  const [expanded, setExpanded] = useState<boolean>(false);
  const handleNextEmoji = () => {
    setEmojiIndex((prevIndex) => (prevIndex + 1) % emojis.length);
  };

  const error = useRouteError();
  console.log(error);

  return (
    <Stack
      width={"100%"}
      height={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Typography
        color="neutral"
        sx={{ fontSize: "10rem", fontWeight: "bold", userSelect: "none" }}
        onClick={handleNextEmoji}
      >
        {emojis[emojiIndex]}
      </Typography>
      <Typography color="neutral" level="h2">
        <i>Une erreur est survenue...</i>
      </Typography>
      <IconButton onClick={() => setExpanded(!expanded)}>
        <KeyboardArrowDown />
      </IconButton>
      {expanded && (
        <Typography>{error instanceof Error && error.message}</Typography>
      )}
    </Stack>
  );
};

export default ErrorBoundary;
