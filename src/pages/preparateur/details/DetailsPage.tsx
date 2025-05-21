import { Box } from "@mui/joy";
import { useParams, useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import Link from "@mui/material/Link";
//import { getCommandes } from "../../../api/commandes.api";
import { getProducts } from "../../../api/products.api";
import { useQuery } from '@tanstack/react-query';


const rows = [
    {
        nom: "Frozen yoghurt",
        qte: 2,
        marque: "Dafu",
        prixPropose: 4.99,
        prixAvecPromo: 3.99,
        prixRecommande: 4.99,
        imageUrl: "https://example.com/image1.jpg"
    },
    {
        nom: "Ice cream sandwich",
        qte: 1,
        marque: "Dafu",
        prixPropose: 4.99,
        prixAvecPromo: 3.99,
        prixRecommande: 4.99,
        imageUrl: "https://example.com/image2.jpg"
    },
    {
        nom: "Eclair",
        qte: 3,
        marque: "Dafu",
        prixPropose: 4.99,
        prixAvecPromo: 3.99,
        prixRecommande: 4.99,
        imageUrl: "https://example.com/image3.jpg"
    },
];

function DetailsPage() {
    const { idCommande } = useParams();
    const navigate = useNavigate();
    console.log("ID de la commande:", idCommande);

    const { data: products, isFetching } = useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
    });

    //const { data: commandes, isFetching } = useQuery({
    //    queryKey: ["commandes"],
    //    queryFn: getCommandes,
    //});
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
                            <th align="right">Marque</th>
                            <th align="right">Prix</th>
                            <th align="right">Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row) => (
                            <tr
                                key={row.nom}
                                style={row === rows[rows.length - 1] ? { border: 0 } : undefined}
                            >
                                <td scope="row">
                                    {row.nom}
                                </td>
                                <td align="right">{row.qte}</td>
                                <td align="right">{row.marque}</td>
                                <td align="right">{row.prixPropose}</td>
                                <td align="right">{row.imageUrl}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Box>
        </Box >

    );
};

export default DetailsPage;

