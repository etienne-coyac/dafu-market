import { Box, Button, IconButton, Stack } from "@mui/joy";
import type { PostItReadType } from "../../types/lists";
import PostIt from "./PostIt";
import { useState } from "react";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

type PostItListProps = {
  postits: PostItReadType[];
  idList: number;
};

const PostItList = (props: PostItListProps) => {
  const { postits, idList } = props;
  const [currentPostitIndex, setCurrentPostitIndex] = useState<number>(0);
  const [addMode, setAddMode] = useState<boolean>(false);

  const handlePrev = () => {
    if (addMode) return;
    setCurrentPostitIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentPostitIndex((prev) => Math.min(postits.length - 1, prev + 1));
  };
  return (
    <>
      <Box
        gap={1}
        sx={{ display: "grid", gridTemplateColumns: "auto 1fr auto" }}
        alignItems={"center"}
        overflow={"hidden"}
      >
        <IconButton onClick={handlePrev}>
          <KeyboardArrowLeft />
        </IconButton>
        <Box
          sx={{
            overflowX: "hidden",
            display: "flex",
            "& > .MuiStack-root > .MuiAlert-root": {
              width: "100%",
              flexShrink: 0,
            },
          }}
        >
          <Stack
            direction={"row"}
            sx={{
              width: "100%",
              transition: "transform 0.4s",
              transform: `translateX(-${currentPostitIndex * 100}%)`,
            }}
          >
            {addMode && (
              <PostIt
                idList={idList}
                setAddMode={setAddMode}
                onDelete={() => null}
              />
            )}
            {postits.map((postit) => (
              <PostIt
                key={postit.idPost}
                postit={postit}
                idList={idList}
                onDelete={handlePrev}
              />
            ))}
          </Stack>
        </Box>
        <IconButton onClick={handleNext}>
          <KeyboardArrowRight />
        </IconButton>
      </Box>
      <Stack direction={"row"} gap={1}>
        <Button
          fullWidth
          color="warning"
          variant="soft"
          onClick={() => {
            if (addMode) return;
            setAddMode(true);
            setCurrentPostitIndex(0);
          }}
        >
          Nouveau post-it
        </Button>
      </Stack>
    </>
  );
};

export default PostItList;
