import {
  Alert,
  Stack,
  Input,
  Textarea,
  Button,
  Divider,
  Typography,
  Box,
  CircularProgress,
} from "@mui/joy";
import type {
  ListType,
  PostItCreateType,
  PostItReadType,
} from "../../types/lists";
import { useState } from "react";
import { useForm, type SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postitSchema } from "../../schemas/postit.schema";
import {
  createPostIt,
  deletePostIt,
  requestLLM,
  updatePostIt,
} from "../../api/lists.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { snackbar } from "../../providers/snackbar/snackbar";

type PostItProps = {
  postit?: PostItReadType;
  idList: number;
  setAddMode?: (mode: boolean) => void;
  onDelete: () => void;
};

const PostIt = (props: PostItProps) => {
  const { postit, idList, setAddMode, onDelete } = props;
  const [editMode, setEditMode] = useState(postit === undefined);
  const queryClient = useQueryClient();

  const postitForm = useForm<PostItCreateType>({
    resolver: zodResolver(postitSchema),
    values: postit,
  });

  const handleCancel = () => {
    postitForm.reset(postit);
    setEditMode(false);
  };

  const onError: SubmitErrorHandler<PostItCreateType> = (err) => {
    console.log(err);
    snackbar.error({ text: "Une erreur est survenue" });
  };

  const changeQueryDataPostIt = (
    post: PostItReadType,
    deletePost?: boolean
  ) => {
    const exists = postit?.idPost === post.idPost;
    queryClient.setQueryData(["lists"], (old: ListType[] | undefined) =>
      !old
        ? undefined
        : old.map((list) =>
            list.idListe === idList
              ? {
                  ...list,
                  postIts:
                    deletePost === true
                      ? list.postIts.filter((p) => p.idPost !== post.idPost) // delete
                      : exists
                      ? list.postIts.map(
                          (
                            p // update
                          ) => (p.idPost === post.idPost ? post : p)
                        )
                      : [post, ...list.postIts], // create
                }
              : list
          )
    );
  };

  const handleSave = async (data: PostItCreateType) => {
    if (postit === undefined) {
      // create
      await createPostIt(idList, { ...data, saisie: data.contenu })
        .then(changeQueryDataPostIt)
        .then(() => setAddMode?.(false));
    } else {
      // update
      await updatePostIt(postit.idPost, { saisie: data.contenu })
        .then(changeQueryDataPostIt)
        .then(() => setEditMode(false));
    }
  };

  const handleLLM = async () => {
    if (postit !== undefined && !!postit.contenu) {
      await requestLLM(postit.idPost).then((res) => {
        if (res.postit.reponseLLM === null) {
          snackbar.error({
            text: "Une erreur est survenue pendant la proposition. Réessayez",
          });
          return;
        }
        queryClient.setQueryData(["lists"], (old: ListType[] | undefined) =>
          !old
            ? undefined
            : old.map((list) =>
                list.idListe === idList
                  ? {
                      ...list,
                      postIts: list.postIts.map((post) =>
                        post.idPost === res.postit.idPost ? res.postit : post
                      ),
                      items: res.liste.items,
                    }
                  : list
              )
        );
      });
    }
  };

  const llmMutation = useMutation({
    mutationFn: handleLLM,
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (postit === undefined) return;
      await deletePostIt(postit.idPost).then(() => {
        changeQueryDataPostIt(postit, true);
        onDelete();
      });
    },
  });

  return (
    <Alert color="warning">
      <Stack
        gap={1}
        width={"100%"}
        height={"100%"}
        direction={{ xs: "column", sm: "row" }}
      >
        {/* user input */}
        <Stack flex={1} gap={1} sx={{ position: "relative" }}>
          <Input
            fullWidth
            placeholder="Titre"
            {...postitForm.register("titre")}
            disabled={postit !== undefined}
            sx={!editMode ? { opacity: 0, zIndex: -1 } : undefined}
          />
          <Textarea
            sx={{
              width: "100%",
              ...(!editMode ? { opacity: 0, zIndex: -1 } : undefined),
            }}
            placeholder="Contenu"
            minRows={4}
            maxRows={4}
            {...postitForm.register("contenu")}
            disabled={!editMode}
          />
          <Stack
            gap={1}
            sx={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              ...(editMode ? { opacity: 0, zIndex: -1 } : undefined),
            }}
          >
            <Typography
              level="body-lg"
              fontWeight={"bold"}
              sx={{ textDecoration: "underline" }}
            >
              {postit?.titre}
            </Typography>
            <Typography
              level="body-sm"
              sx={{ maxHeight: "120px", overflowY: "auto" }}
            >
              {postit?.contenu}
            </Typography>
          </Stack>

          <Stack direction={"row"} gap={1}>
            {editMode ? (
              <>
                <Button
                  fullWidth
                  color="warning"
                  variant="outlined"
                  onClick={handleCancel}
                >
                  Annuler
                </Button>
                <Button
                  fullWidth
                  color="warning"
                  variant="solid"
                  type="submit"
                  onClick={() => {
                    console.log("click");
                    postitForm.handleSubmit(handleSave, onError)();
                  }}
                >
                  Valider
                </Button>
              </>
            ) : (
              <>
                <Button
                  fullWidth
                  color="warning"
                  variant="solid"
                  onClick={() => setEditMode(true)}
                >
                  Modifier
                </Button>{" "}
                <Button
                  fullWidth
                  color="danger"
                  variant="solid"
                  onClick={() => deleteMutation.mutate()}
                  loading={deleteMutation.isPending}
                >
                  Supprimer
                </Button>
              </>
            )}
          </Stack>
        </Stack>
        <Divider
          sx={{
            blockSize: { xs: "var(--Divider-thickness)", md: "initial" },
            inlineSize: { xs: "initial", md: "var(--Divider-thickness)" },
          }}
        />

        {/* LLM response */}
        <Stack flex={1} height={"100%"} justifyContent={"space-between"}>
          <Box>
            <Typography>Réponse :</Typography>
            {llmMutation.isPending ? (
              <CircularProgress size="sm" />
            ) : (
              <Typography
                level="body-sm"
                sx={{
                  maxHeight: "130px",
                  overflowY: "auto",
                  pr: 0.5,
                  textAlign: "justify",
                }}
              >
                {postit?.reponseLLM}
              </Typography>
            )}
          </Box>
          <Button
            color="warning"
            variant="outlined"
            sx={{ backgroundColor: "white" }}
            disabled={postit === undefined || editMode}
            onClick={() => llmMutation.mutate()}
          >
            Proposer des produits
          </Button>
        </Stack>
      </Stack>
    </Alert>
  );
};

export default PostIt;
