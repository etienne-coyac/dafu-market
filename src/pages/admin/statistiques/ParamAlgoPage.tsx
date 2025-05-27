import React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import RayonCheckboxGroup from "../../../components/admin/RayonCheckboxGroup";
import type { RayonType } from "../../../types/rayons";
import type { CategoryType } from "../../../types/categories";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getAllCategoriesPreview,
  getTousLesRayons,
} from "../../../api/rayons.api";
import {
  patchCheckedFalse,
  patchCheckedTrue,
} from "../../../api/admin/mettrePreview.api";

type HandleRayonChange = (
  index: number,
  newCategories: RayonType["categories"]
) => void;

const ParamAlgo: React.FC = () => {
  const { data: rayonsData } = useQuery({
    queryKey: ["rayons"],
    queryFn: getTousLesRayons,
  });

  const { data: dataChecked } = useQuery({
    queryKey: ["categoriesChecked"],
    queryFn: getAllCategoriesPreview,
  });

  const [rayons, setRayons] = React.useState<RayonType[]>([]);
  const [message, setMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (rayonsData && dataChecked) {
      const checkedIds = new Set(
        Array.isArray(dataChecked)
          ? dataChecked.map((cat) => cat.idCategorie)
          : []
      );

      const updatedRayons = rayonsData.map((rayon) => ({
        ...rayon,
        categories: rayon.categories.map((cat) => ({
          ...cat,
          checked: checkedIds.has(cat.idCategorie),
        })),
      }));

      setRayons(updatedRayons);
    }
  }, [rayonsData, dataChecked]);

  // Gérer les changements de catégories dans un rayon
  const handleRayonChange: HandleRayonChange = (index, newCategories) => {
    const updated = [...rayons];
    updated[index] = {
      ...updated[index],
      categories: newCategories,
    };
    setRayons(updated);
  };

  const mutation = useMutation({
    mutationFn: async (categories: CategoryType[]) => {
      await Promise.all(
        categories.map((categorie) =>
          categorie.checked
            ? patchCheckedTrue(categorie.idCategorie)
            : patchCheckedFalse(categorie.idCategorie)
        )
      );
    },
    onSuccess: () => {
      setMessage("✅ Les préférences ont bien été enregistrées.");
    },
    onError: () => {
      setMessage("❌ Une erreur est survenue lors de l'enregistrement.");
    },
  });

  const handleSubmit = () => {
    // Récupère toutes les catégories, qu'elles soient cochées ou non
    const allCategories: CategoryType[] = rayons.flatMap(
      (rayon) => rayon.categories
    );

    mutation.mutate(allCategories);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {rayons.map((rayon, index) => (
        <RayonCheckboxGroup
          key={rayon.nomRayon}
          rayon={rayon}
          categories={rayon.categories}
          onRayonChange={(newCategories) =>
            handleRayonChange(index, newCategories)
          }
        />
      ))}
      {message && (
        <Typography
          level="body-sm"
          color={message.startsWith("✅") ? "success" : "danger"}
          sx={{ mt: 2 }}
        >
          {message}
        </Typography>
      )}
      <Button
        disabled={mutation.isPending}
        onClick={handleSubmit}
        variant="solid"
        color="primary"
      >
        {mutation.isPending ? "Envoi..." : "Valider la sélection"}
      </Button>
    </Box>
  );
};

export default ParamAlgo;
