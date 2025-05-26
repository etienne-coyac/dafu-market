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
  return (
    <>
      <Stack gap={1} direction={"row"} alignItems={"center"}>
        <IconButton
          onClick={() => setCurrentPostitIndex((prev) => Math.max(0, prev - 1))}
        >
          <KeyboardArrowLeft />
        </IconButton>
        <Box
          sx={{
            flexGrow: 1,
            overflowX: "hidden",

            "& > .MuiStack-root > .MuiAlert-root": {
              width: "100%",
              flexShrink: 0,
            },
          }}
        >
          <Stack
            direction={"row"}
            sx={{
              transition: "transform 0.4s",
              transform: `translateX(-${currentPostitIndex * 100}%)`,
            }}
          >
            {postits.map((postit) => (
              <PostIt key={postit.idPost} postit={postit} idList={idList} />
            ))}
          </Stack>
        </Box>
        <IconButton
          onClick={() =>
            setCurrentPostitIndex((prev) =>
              Math.min(prev + 1, postits.length - 1)
            )
          }
        >
          <KeyboardArrowRight />
        </IconButton>
      </Stack>
      <Stack direction={"row"} gap={1}>
        <Button fullWidth color="warning" variant="soft">
          Nouveau post-it
        </Button>
      </Stack>
    </>
  );
};

export default PostItList;
