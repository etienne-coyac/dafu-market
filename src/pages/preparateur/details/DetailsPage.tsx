import { Box, Link, Table } from "@mui/joy";
import { useNavigate, useLocation } from "react-router";
import { getProductById } from "../../../api/products.api";
import { useQueries } from "@tanstack/react-query";

function DetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const lignes = location.state?.commande.panier.lignes;

  const productQueries = useQueries({
    queries: lignes.map((row: any) => ({
      queryKey: ["produit", row.idProduit],
      queryFn: () => getProductById(row.idProduit),
    })),
  });

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateRows: "auto 1fr",
        height: "100dvh",
      }}
    >
      <Box component={"main"} sx={{ p: 1 }}>
        <Link
          component="button"
          onClick={() => navigate(`/preparateur/dashboard`)}
        >
          Revenir au dashboard
        </Link>
        <h1>Détails de la commande</h1>
        {/* Contenu des détails de la commande */}
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <thead>
            <tr>
              <th>Nom</th>
              <th align="right">Quantité</th>
              <th align="right">Image</th>
            </tr>
          </thead>
          <tbody>
            {productQueries.map((query, idx) => {
              const produit = query.data as
                | {
                    nom: string;
                    marque: string;
                    imageUrl: string;
                  }
                | undefined;
              const isLoading = query.isLoading;

              return (
                <tr
                  key={lignes[idx].nom}
                  style={idx === lignes.length - 1 ? { border: 0 } : undefined}
                >
                  <td scope="row">
                    {isLoading || !produit
                      ? "Chargement..."
                      : `${produit.nom} (${produit.marque})`}
                  </td>
                  <td align="right">{lignes[idx].quantite}</td>
                  <td align="right">
                    {isLoading || !produit ? (
                      "Chargement image..."
                    ) : (
                      <img
                        src={produit.imageUrl}
                        alt={produit.nom}
                        style={{ width: "80px", height: "auto" }}
                      />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Box>
    </Box>
  );
}

export default DetailsPage;
