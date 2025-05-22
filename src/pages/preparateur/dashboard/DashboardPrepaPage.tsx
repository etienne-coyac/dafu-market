import * as React from 'react';
import type { ColorPaletteProp } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { getCommandes, getCommandesNow } from "../../../api/commandes.api";
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueries } from '@tanstack/react-query';
import { getClientById } from '../../../api/clients.api';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T): number {
    if (orderBy === "jourRetrait") {
        const parseDateTime = (row: any) =>
            new Date(`${row.jourRetrait} ${row.heureDebRetrait ?? "00:00"}`);

        const aDate = parseDateTime(a);
        const bDate = parseDateTime(b);

        return bDate.getTime() - aDate.getTime(); // Descendant
    }

    const aValue = a[orderBy];
    const bValue = b[orderBy];

    if (bValue < aValue) return -1;
    if (bValue > aValue) return 1;
    return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
): (
    a: { [key in Key]: number | string | Date },
    b: { [key in Key]: number | string | Date }
) => number {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function changeStatusCommande(idCommande: string, newStatus: string) {
    // This is a placeholder for updating the status of a commande.
    // In a real app, you would call an API or update state here.
    // For now, just log the action.
    console.log(`Changing status of commande ${idCommande} to ${newStatus}`);
    // Optionally, show a notification or update local state if needed.
}

function supprimerCommande(idCommande: string) {
    // This is a placeholder for deleting a commande.
    // In a real app, you would call an API or update state here.
    // For now, just log the action.
    console.log(`Deleting commande ${idCommande}`);
    // Optionally, show a notification or update local state if needed.
}

function RowMenu({ idCommande }: Readonly<{ idCommande: string }>) {
    return (
        <Dropdown>
            <MenuButton
                slots={{ root: IconButton }}
                slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
            >
                <MoreHorizRoundedIcon />
            </MenuButton>
            <Menu size="sm" sx={{ minWidth: 140 }}>
                <MenuItem
                    component="button"
                    onClick={() => { changeStatusCommande(idCommande, "preparation"); }}
                >Mettre en préparation</MenuItem>
                <MenuItem
                    component="button"
                    onClick={() => { changeStatusCommande(idCommande, "finaliser"); }}
                >Finaliser la commande</MenuItem>
                <Divider />
                <MenuItem color="danger"
                    component="button"
                    onClick={() => { supprimerCommande(idCommande); }}
                >Supprimer</MenuItem>
            </Menu>
        </Dropdown>
    );
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
    console.log("commandesNow", commandesNow);

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

    const [order, setOrder] = React.useState<Order>('asc');
    const [open, setOpen] = React.useState(false);
    const [searchFilter, setSearchFilter] = React.useState<string | null>(null);
    const [statusFilter, setStatusFilter] = React.useState<string | null>(null);
    const [customerFilter, setCustomerFilter] = React.useState<string | null>(null);
    const [filteredRows, setFilteredRows] = React.useState<Array<any> | null>(null);

    const renderFilters = () => (
        <React.Fragment>
            <FormControl size="sm">
                <FormLabel>Status</FormLabel>
                <Select
                    size="sm"
                    placeholder="All"
                    value={statusFilter ?? ""}
                    onChange={(_, newValue) => {
                        setStatusFilter(typeof newValue === "string" && newValue !== "" ? newValue : null);
                    }}
                >
                    <Option value="">All</Option>
                    {(Array.isArray(commandes) ? commandes : []).slice().sort(getComparator(order, 'jourRetrait')).map((row) => (
                        <Option key={row.idCommande} value={row.statut}>
                            {row.statut}
                        </Option>
                    ))}
                </Select>
            </FormControl>
            <FormControl size="sm">
                <FormLabel>Customer</FormLabel>
                <Select
                    size="sm"
                    placeholder="All"
                    value={customerFilter ?? ""}
                    onChange={(_, newValue) => {
                        setCustomerFilter(typeof newValue === "string" && newValue !== "" ? newValue : null);
                    }}
                >
                    <Option value="">All</Option>
                    {(Array.isArray(commandes) ? commandes : []).slice().sort(getComparator(order, 'jourRetrait')).map((row) => (
                        <Option key={row.idCommande} value={String(row.panier.idClient)}>
                            {row.panier.idClient}
                        </Option>
                    ))}
                </Select>
            </FormControl>

            <Button
                component="button"
                color="neutral"
                sx={{ fontSize: 'sm', textDecoration: 'underline' }}
                onClick={() => {
                    setOpen(false); // Fermer le modal
                    const filteredRows = Array.isArray(commandes)
                        ? commandes.filter((row) => {
                            const searchMatch = searchFilter ? String(row.idCommande).toLowerCase().includes(searchFilter.toLowerCase()) : true;
                            const customerMatch = customerFilter ? String(row.panier.idClient).toLowerCase() === customerFilter.toLowerCase() : true;
                            const statusMatch = statusFilter ? row.statut.toLowerCase() === statusFilter.toLowerCase() : true;
                            return customerMatch && statusMatch && searchMatch;
                        })
                        : [];
                    setFilteredRows(filteredRows);
                }}
            >
                Filtrer
            </Button>
            <Button
                component="button"
                color="neutral"
                sx={{ fontSize: 'sm', textDecoration: 'underline' }}
                onClick={() => {
                    setSearchFilter(null);
                    setStatusFilter(null);
                    setCustomerFilter(null);
                    setFilteredRows(null);
                }}
            >
                Réinitialiser
            </Button>
        </React.Fragment >
    );
    return (
        <React.Fragment>
            <Sheet
                className="SearchAndFilters-mobile"
                sx={{ display: { xs: 'flex', sm: 'none' }, my: 1, gap: 1 }}
            >
                <Input
                    size="sm"
                    placeholder="Search"
                    startDecorator={<SearchIcon />}
                    sx={{ flexGrow: 1 }}
                />
                <IconButton
                    size="sm"
                    variant="outlined"
                    color="neutral"
                    onClick={() => setOpen(true)}
                >
                    <FilterAltIcon />
                </IconButton>
                <Modal open={open} onClose={() => setOpen(false)}>
                    <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
                        <ModalClose />
                        <Typography id="filter-modal" level="h2">
                            Filters
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <Sheet sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {renderFilters()}
                        </Sheet>
                    </ModalDialog>
                </Modal>
            </Sheet>
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
                <FormControl sx={{ flex: 1 }} size="sm">
                    <FormLabel>Search for order</FormLabel>
                    <Input
                        size="sm"
                        placeholder="Search"
                        startDecorator={<SearchIcon />}
                        value={searchFilter ?? ''}
                        onChange={(e) => setSearchFilter(e.target.value)}
                    />
                </FormControl>
                {renderFilters()}
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
                                    endDecorator={<ArrowDropDownIcon />}
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
                        {((filteredRows ?? commandes) as Array<any> ?? []).slice().sort(getComparator(order, 'jourRetrait')).map((row) => (
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
                                        startDecorator={
                                            ({
                                                Paid: <CheckRoundedIcon />,
                                                Refunded: <AutorenewRoundedIcon />,
                                                Cancelled: <BlockIcon />,
                                            } as Record<string, React.ReactNode>)[row.statut] ?? undefined
                                        }
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
                                                console.log("client", client);
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