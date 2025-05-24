import React from "react";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Table from "@mui/joy/Table";
import RowMenu from "./RowMenu";
import { useQueries } from "@tanstack/react-query";
// Update the import path to match the actual file name and location, e.g. 'produit.ts' or 'produit.js'
import { getProductById } from "../../api/products.api";
// If the file is named 'produit.js', use:
// import { getProductById } from "../../api/produit.js";
// Or correct the path if the file is in a different folder.
import type { CommandeType } from "../../types/commandes";

function Row(props: Readonly<{ row: CommandeType, clientMap: Map<number, { nom: string; prenom: string; email: string; adresse: string; cp: string; ville: string }> }>) {
    const { row, clientMap } = props;
    const [openDetails, setOpenDetails] = React.useState(false);

    // Fetch product data for each product in the order
    const productQueries = useQueries({
        queries: row.panier.lignes.map((ligne: any) => ({
            queryKey: ["produit", ligne.idProduit],
            queryFn: () => getProductById(ligne.idProduit),
        })),
    });

    return (
        <React.Fragment>
            <tr>
                <td>
                    <IconButton
                        aria-label="expand row"
                        variant="plain"
                        color="neutral"
                        size="sm"
                        onClick={() => setOpenDetails(!openDetails)}
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{
                                transition: 'transform 0.2s ease',
                                transform: openDetails ? 'rotate(180deg)' : 'rotate(0deg)',
                            }}
                        >
                            <path d="M5 8l5 5 5-5H5z" fill="currentColor" />
                        </svg>
                    </IconButton>
                </td>
                <td scope='row'>{row.idCommande}</td>
                <td>
                    {(() => {
                        const client = clientMap.get(row.panier.idClient);
                        return (
                            <div>
                                <Typography level="body-xs">{client ? `${client.prenom} ${client.nom}` : "Chargement..."}</Typography>
                            </div>
                        );
                    })()}
                </td>
                <td>
                    <div>
                        {(() => {
                            const date = new Date(row.dateHeureRetrait);
                            const day = String(date.getDate()).padStart(2, '0');
                            const month = String(date.getMonth() + 1).padStart(2, '0');
                            const year = String(date.getFullYear()).slice(-2);
                            return `${day}/${month}/${year}`;
                        })()}
                    </div>
                    <div>
                        [{new Date(row.dateHeureRetrait).getHours().toString().padStart(2, "0")}:{new Date(row.dateHeureRetrait).getMinutes().toString().padStart(2, "0")}]
                    </div>
                </td>
                <td>
                    {(() => {
                        let backgroundColor = '#bdc3c7'; // Gris par défaut
                        if (row.statut === 'PAYE') {
                            backgroundColor = '#3498db'; // Bleu
                        } else if (row.statut === 'EN_PREPARATION') {
                            backgroundColor = '#f39c12'; // Orange
                        } else if (row.statut === 'PRET') {
                            backgroundColor = '#27ae60'; // Vert
                        }
                        return (
                            <span
                                style={{
                                    padding: '4px 8px',
                                    borderRadius: '6px',
                                    fontWeight: 500,
                                    color: 'white',
                                    backgroundColor,
                                }}
                            >
                                {row.statut}
                            </span>
                        );
                    })()}
                </td>
                <td><RowMenu idCommande={String(row.idCommande)} status={row.statut} /></td>
            </tr>
            {openDetails && (
                <tr>
                    <td style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Box sx={{ margin: 1 }}>
                            <Typography gutterBottom component="div">
                                Détails de la commande
                            </Typography>
                            <Table size="sm">
                                <thead>
                                    <tr>
                                        <th>Produit</th>
                                        <th>Quantité</th>
                                        <th>Image</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {row.panier.lignes.map((ligne: any, idx: number) => {
                                        const query = productQueries[idx];
                                        const produit = query?.data as {
                                            nom: string;
                                            marque: string;
                                            imageUrl: string;
                                        } | undefined;
                                        const isLoading = query?.isLoading;

                                        return (
                                            <tr key={ligne.idProduit ?? idx}>
                                                <td>
                                                    {isLoading || !produit
                                                        ? "Chargement..."
                                                        : `${produit.nom} (${produit.marque})`}
                                                </td>
                                                <td>{ligne.quantite}</td>
                                                <td>
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
                    </td>
                </tr>
            )}
        </React.Fragment>
    );
}
export default Row;