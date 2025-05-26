import {
  Alert,
  Stack,
  Input,
  Textarea,
  Button,
  Divider,
  Typography,
} from "@mui/joy";
import type {
  ListType,
  PostItCreateType,
  PostItReadType,
} from "../../types/lists";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postitSchema } from "../../schemas/postit.schema";
import { updatePostIt } from "../../api/lists.api";
import { useQueryClient } from "@tanstack/react-query";
import { snackbar } from "../../providers/snackbar/snackbar";

type PostItProps = {
  postit: PostItReadType;
  idList: number;
};

const PostIt = (props: PostItProps) => {
  const { postit, idList } = props;
  const [editMode, setEditMode] = useState(false);
  const queryClient = useQueryClient();

  const postitForm = useForm<PostItCreateType>({
    resolver: zodResolver(postitSchema),
    values: postit,
  });

  const handleCancel = () => {
    postitForm.reset(postit);
    setEditMode(false);
  };

  const onError = (err: any) => {
    console.log(err);
    snackbar.error({ text: "Une erreur est survenue" });
  };

  const handleSave = async (data: PostItCreateType) => {
    console.log("data", data);
    if (postit === undefined) {
      // create
    } else {
      // update
      await updatePostIt(postit.idPost, { saisie: data.contenu }).then(
        (res) => {
          queryClient.setQueryData(["lists"], (old: ListType[] | undefined) =>
            !old
              ? undefined
              : old.map((list) =>
                  list.idListe === idList
                    ? {
                        ...list,
                        postIts: list.postIts.map((post) =>
                          post.idPost === res.idPost ? res : post
                        ),
                      }
                    : list
                )
          );
          setEditMode(false);
        }
      );
    }
  };

  return (
    <Alert color="warning">
      <Stack gap={1} width={"100%"} direction={{ xs: "column", sm: "row" }}>
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
              {postit.titre}
            </Typography>
            <Typography
              level="body-sm"
              sx={{ maxHeight: "120px", overflowY: "auto" }}
            >
              {postit.contenu}
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
              <Button
                fullWidth
                color="warning"
                variant="solid"
                onClick={() => setEditMode(true)}
              >
                Modifier
              </Button>
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
        <Stack flex={1} justifyContent={"space-between"}>
          <Typography>Réponse :</Typography>
          <Button color="warning" disabled>
            Proposer des produits
          </Button>
        </Stack>
      </Stack>
    </Alert>
  );
};

export default PostIt;
