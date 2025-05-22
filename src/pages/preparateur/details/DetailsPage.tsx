import { Box } from "@mui/joy";
import { useNavigate, useLocation } from "react-router-dom";
import Table from "@mui/material/Table";
import Link from "@mui/material/Link";

function DetailsPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const lignes = location.state?.commande.panier.lignes;

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
                    onClick={() => navigate(`/preparateur/dashboard`)}>
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
                        {Array.isArray(lignes) &&
                            lignes
                                .map((row, idx, arr) => (
                                    <tr
                                        key={row.nom}
                                        style={idx === arr.length - 1 ? { border: 0 } : undefined}
                                    >
                                        <td scope="row">
                                            {row.nomProduit} ({row.marque})
                                        </td>
                                        <td align="right">{row.quantite}</td>
                                        <td align="right">
                                            <img src={row.imageUrl} alt={row.nomProduit} style={{ width: "80px", height: "auto" }} />
                                        </td>

                                    </tr>
                                ))
                        }
                    </tbody>
                </Table>
            </Box>
        </Box >

    );
};

export default DetailsPage;

