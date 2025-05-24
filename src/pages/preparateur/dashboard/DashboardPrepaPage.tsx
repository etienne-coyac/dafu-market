import * as React from 'react';
import type { ColorPaletteProp } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';

import { getCommandes, getCommandesNow } from "../../../api/commandes.api";
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueries } from '@tanstack/react-query';
import { getClientById } from '../../../api/clients.api';
import useIsSmallScreen from '../../../hooks/useSmallScreen';
import Row from '../../../components/dashboard/Row';
import RowMenu from '../../../components/dashboard/RowMenu';
import type { OrderType } from '../../../types/order';
import { useState } from 'react';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T): number {
    if (orderBy === "dateHeureRetrait") {
        const parseDateTime = (row: any): number => {
            const raw = row.dateHeureRetrait ?? "1970-01-01 00:00:00";
            const isoString = raw.replace(" ", "T");
            const parsedDate = new Date(isoString);
            return parsedDate.getTime();
        };

        const aDate = parseDateTime(a);
        const bDate = parseDateTime(b);

        return bDate - aDate; // Descending
    }

    const aValue = a[orderBy];
    const bValue = b[orderBy];

    if (bValue < aValue) return -1;
    if (bValue > aValue) return 1;
    return 0;
}

function getComparator<Key extends keyof any>(
    order: OrderType,
    orderBy: Key
): (
    a: { [key in Key]: number | string | Date },
    b: { [key in Key]: number | string | Date }
) => number {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function DashboardPrepa() {
    const navigate = useNavigate();

    const { data: commandes } = useQuery({
        queryKey: ["commandes"],
        queryFn: getCommandes,
    });

    const { data: commandesNow } = useQuery({
        queryKey: ["commandesNow"],
        queryFn: getCommandesNow,
    });

    const uniqueClientIds = Array.isArray(commandes)
        ? Array.from(new Set(commandes.map((row) => row.panier.idClient)))
        : [];

    const clientsQueries = useQueries({
        queries: uniqueClientIds.map((id) => ({
            queryKey: ["client", id],
            queryFn: () => getClientById(id),
        })),
    });

    const clientMap = new Map<number, { nom: string; prenom: string; email: string; adresse: string; cp: string; ville: string }>();
    clientsQueries.forEach((query) => {
        if (query.data) {
            const { nom, prenom, idClient, email, adresse, cp, ville } = query.data;
            clientMap.set(idClient, { nom, prenom, email, adresse, cp, ville });
        }
    });

    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [filteredRows, setFilteredRows] = React.useState<Array<any> | null>(null);
    const [prioriteEtat, setPrioriteEtat] = React.useState(false);
    const isSmallScreen = useIsSmallScreen(); // Par défaut : max-width: 640px (taille "sm")

    React.useEffect(() => {
        setFilteredRows(Array.isArray(commandes) ? commandes : []);
    }, [commandes]);

    return (
        <React.Fragment>
            {isSmallScreen && (
                <Sheet>
                    <Table
                        aria-label="collapsible table"
                        sx={{
                            '& > thead > tr > th:nth-child(n + 3), & > tbody > tr > td:nth-child(n + 3)':
                                { textAlign: 'right' },
                            '& > tbody > tr:nth-child(odd) > td, & > tbody > tr:nth-child(odd) > th[scope="row"]':
                            {
                                borderBottom: 0,
                            },
                        }}
                    >
                        <thead>
                            <tr>
                                <th style={{ width: 40 }}>
                                    <IconButton
                                        size="sm"
                                        onClick={() => {
                                            const newEtat = !prioriteEtat;
                                            setPrioriteEtat(newEtat);
                                            if (newEtat) {
                                                setFilteredRows(Array.isArray(commandesNow) ? commandesNow : []);
                                            } else {
                                                setFilteredRows(Array.isArray(commandes) ? commandes : []);
                                            }
                                        }}
                                        style={{
                                            border: '1px solid #ccc',
                                            backgroundColor: prioriteEtat ? '#ff4d4f' : 'white', // rouge si actif
                                            padding: '4px',
                                            borderRadius: '6px',
                                        }}
                                    >
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            {/* Triangle */}
                                            <path
                                                d="M1 21H23L12 2L1 21Z"
                                                fill={prioriteEtat ? 'white' : '#ff4d4f'}
                                                stroke={prioriteEtat ? 'white' : '#ff4d4f'}
                                                strokeWidth="1.5"
                                            />
                                            {/* Point d'exclamation - barre */}
                                            <line
                                                x1="12"
                                                y1="8"
                                                x2="12"
                                                y2="13"
                                                stroke={prioriteEtat ? '#ff4d4f' : 'white'}
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                            />
                                            {/* Point d'exclamation - point */}
                                            <circle
                                                cx="12"
                                                cy="17"
                                                r="1"
                                                fill={prioriteEtat ? '#ff4d4f' : 'white'}
                                            />
                                        </svg>
                                    </IconButton>
                                </th>
                                <th style={{ width: 20 }}>N°</th>
                                <th>Client</th>
                                <th>
                                    <Link
                                        underline="none"
                                        color="primary"
                                        component="button"
                                        onClick={() => {
                                            setOrder(order === 'asc' ? 'desc' : 'asc');
                                        }}
                                        sx={{
                                            fontWeight: 'lg',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 0.5,
                                            '& svg': {
                                                transition: 'transform 0.3s ease',
                                                transform: order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                                            },
                                        }}
                                    >
                                        Retrait
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="12"
                                            height="12"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <polyline points="6 9 12 15 18 9" />
                                        </svg>
                                    </Link>
                                </th>
                                <th>Statut</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {((filteredRows) as Array<any> ?? []).slice().sort(getComparator(order, 'dateHeureRetrait')).map((row) => (
                                <Row key={row.name} row={row} clientMap={clientMap} />
                            ))}
                        </tbody>
                    </Table>
                </Sheet>
            )}
            <Box
                className="SearchAndFilters-tabletUp"
                sx={{
                    borderRadius: 'sm',
                    py: 2,
                    display: { xs: 'none', sm: 'flex' },
                    flexWrap: 'wrap',
                    gap: 1.5,
                    '& > *': {
                        minWidth: { xs: '120px', md: '160px' },
                    },
                }}
            >
            </Box>
            <Sheet
                className="OrderTableContainer"
                variant="outlined"
                sx={{
                    display: { xs: 'none', sm: 'initial' },
                    width: '100%',
                    borderRadius: 'sm',
                    flexShrink: 1,
                    overflow: 'auto',
                    minHeight: 0,
                }}
            >
                <Table
                    aria-labelledby="tableTitle"
                    stickyHeader
                    hoverRow
                    sx={{
                        '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
                        '--Table-headerUnderlineThickness': '1px',
                        '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
                        '--TableCell-paddingY': '4px',
                        '--TableCell-paddingX': '8px',
                    }}
                >
                    <thead>
                        <tr>
                            <th style={{ width: 140, padding: '12px 6px' }}>Numéro</th>
                            <th style={{ width: 120, padding: '12px 6px' }}>
                                <Link
                                    underline="none"
                                    color="primary"
                                    component="button"
                                    onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
                                    sx={[
                                        {
                                            fontWeight: 'lg',
                                            '& svg': {
                                                transition: '0.2s',
                                                transform:
                                                    order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                                            },
                                        },
                                        order === 'desc'
                                            ? { '& svg': { transform: 'rotate(0deg)' } }
                                            : { '& svg': { transform: 'rotate(180deg)' } },
                                    ]}
                                >
                                    Retrait
                                </Link>
                            </th>
                            <th style={{ width: 140, padding: '12px 6px' }}>Statut</th>
                            <th style={{ width: 240, padding: '12px 6px' }}>Client</th>
                            <th style={{ width: 140, padding: '12px 6px' }}> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {((filteredRows) as Array<any> ?? []).slice().sort(getComparator(order, 'dateHeureRetrait')).map((row) => (
                            <tr key={`${row.idCommande}`}>
                                <td>
                                    <Typography level="body-xs">{row.idCommande}</Typography>
                                </td>
                                <td>
                                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                        <div>
                                            <Typography level="body-xs">{new Date(row.dateHeureRetrait).toISOString().split("T")[0]}</Typography>
                                            <Typography level="body-xs">{new Date(row.dateHeureRetrait).getHours().toString().padStart(2, "0")}:{new Date(row.dateHeureRetrait).getMinutes().toString().padStart(2, "0")}</Typography>
                                        </div>
                                    </Box>
                                </td>
                                <td>
                                    <Chip
                                        variant="soft"
                                        size="sm"
                                        color={
                                            ({
                                                Paid: 'success',
                                                Refunded: 'neutral',
                                                Cancelled: 'danger',
                                            } as Record<string, ColorPaletteProp>)[row.statut] ?? 'neutral'
                                        }
                                    >
                                        {row.statut}
                                    </Chip>
                                </td>
                                <td>
                                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                        <div>
                                            {(Array.isArray(commandes) ? commandes : []).map((row) => {
                                                const client = clientMap.get(row.panier.idClient);
                                                return (
                                                    <tr key={row.idCommande}>
                                                        <td>
                                                            <Typography level="body-xs">{client ? `${client.prenom} ${client.nom}` : "Chargement..."}</Typography>
                                                            <Typography level="body-xs">{client ? `${client.email}` : "Chargement..."}</Typography>
                                                            <Typography level="body-xs">{client ? `${client.adresse}, ${client.ville} (${client.cp}) ` : "Chargement..."}</Typography>
                                                        </td>
                                                    </tr>
                                                );
                                            })}

                                        </div>
                                    </Box>
                                </td>
                                <td>
                                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                        <Link
                                            component="button"
                                            color="primary"
                                            onClick={() =>
                                                navigate(`/preparateur/dashboard/${row.idCommande}`, {
                                                    state: { commande: row }
                                                })
                                            }
                                        >
                                            Voir les détails
                                        </Link>
                                        <RowMenu idCommande={row.idCommande} />
                                    </Box>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Sheet>
        </React.Fragment>
    );
}

export default DashboardPrepa;

