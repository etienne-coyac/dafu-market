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
import Checkbox from '@mui/joy/Checkbox';
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
//import { getCommandes } from "../../../api/commandes.api";
import { useNavigate } from 'react-router-dom';

const rows = [
    {
        idCommande: 'INV-1234',
        jourRetrait: 'Feb 3, 2023',
        heureDebRetrait: '10:00',
        status: 'PAYE',
        produits: [
            { id: 1, name: 'Product 1', quantity: 2 },
            { id: 2, name: 'Product 2', quantity: 1 },
        ],
        montantTotal: 100,
        customer: {
            nomClient: 'Ryhe',
            prenomClient: 'Olivia',
            emailClient: 'olivia@email.com',
            adrLivrClient: '123 Main St, City, Country',
        },
    },
    {
        idCommande: 'INV-5678',
        jourRetrait: 'Feb 3, 2023',
        heureDebRetrait: '23:00',
        status: 'REMBOURSE',
        produits: [
            { id: 3, name: 'Product 3', quantity: 1 },
            { id: 4, name: 'Product 4', quantity: 2 },
        ],
        montantTotal: 150,
        customer: {
            nomClient: 'Smith',
            prenomClient: 'John',
            emailClient: '',
            adrLivrClient: '456 Elm St, City, Country',
        },
    },
];

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

function RowMenu() {
    return (
        <Dropdown>
            <MenuButton
                slots={{ root: IconButton }}
                slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
            >
                <MoreHorizRoundedIcon />
            </MenuButton>
            <Menu size="sm" sx={{ minWidth: 140 }}>
                <MenuItem>Mettre en préparation</MenuItem>
                <MenuItem>Finaliser la commande</MenuItem>
                <Divider />
                <MenuItem color="danger">Supprimer</MenuItem>
            </Menu>
        </Dropdown>
    );
}
function DashboardPrepa() {
    const navigate = useNavigate();

    //const { data: commandes, isFetching } = useQuery({
    //    queryKey: ["commandes"],
    //    queryFn: getCommandes,
    //});

    const [order, setOrder] = React.useState<Order>('asc');
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [open, setOpen] = React.useState(false);
    const [searchFilter, setSearchFilter] = React.useState<string | null>(null);
    const [statusFilter, setStatusFilter] = React.useState<string | null>(null);
    const [customerFilter, setCustomerFilter] = React.useState<string | null>(null);
    const [filteredRows, setFilteredRows] = React.useState<typeof rows | null>(null);

    const renderFilters = () => (
        <React.Fragment>
            <FormControl size="sm">
                <FormLabel>Status</FormLabel>
                <Select
                    size="sm"
                    placeholder="Filter by status"
                    value={statusFilter ?? ""}
                    slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
                    onChange={(_, newValue) => {
                        setStatusFilter(typeof newValue === "string" && newValue !== "" ? newValue : null);
                    }}
                >
                    <Option value="">All</Option>
                    <Option value="pending">Commander</Option>
                    <Option value="refunded">A préparer</Option>
                    <Option value="cancelled">A retirer</Option>
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
                    {(filteredRows ?? rows)
                        .slice()
                        .sort(getComparator(order, "idCommande"))
                        .map((row) => (
                            <Option key={row.idCommande} value={row.customer.nomClient}>
                                {row.customer.nomClient} {row.customer.prenomClient}
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
                    const filteredRows = rows.filter((row) => {
                        const searchMatch = searchFilter ? row.idCommande.toLowerCase().includes(searchFilter.toLowerCase()) : true;
                        const customerMatch = customerFilter ? row.customer.nomClient.toLowerCase() === customerFilter.toLowerCase() : true;
                        const statusMatch = statusFilter ? row.status.toLowerCase() === statusFilter.toLowerCase() : true;
                        return customerMatch && statusMatch && searchMatch;
                    });
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
                        {(filteredRows ?? rows).slice().sort(getComparator(order, 'jourRetrait')).map((row) => (
                            <tr key={`${row.idCommande}`}>
                                <td>
                                    <Typography level="body-xs">{row.idCommande}</Typography>
                                </td>
                                <td>
                                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                        <div>
                                            <Typography level="body-xs">{row.jourRetrait}</Typography>
                                            <Typography level="body-xs">{row.heureDebRetrait}</Typography>
                                        </div>
                                    </Box>
                                </td>
                                <td>
                                    <Chip
                                        variant="soft"
                                        size="sm"
                                        startDecorator={
                                            {
                                                Paid: <CheckRoundedIcon />,
                                                Refunded: <AutorenewRoundedIcon />,
                                                Cancelled: <BlockIcon />,
                                            }[row.status]
                                        }
                                        color={
                                            {
                                                Paid: 'success',
                                                Refunded: 'neutral',
                                                Cancelled: 'danger',
                                            }[row.status] as ColorPaletteProp
                                        }
                                    >
                                        {row.status}
                                    </Chip>
                                </td>
                                <td>
                                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                        <div>
                                            <Typography level="body-xs">{row.customer.nomClient} {row.customer.prenomClient}</Typography>
                                            <Typography level="body-xs">{row.customer.emailClient}</Typography>
                                            <Typography level="body-xs">{row.customer.adrLivrClient}</Typography>
                                        </div>
                                    </Box>
                                </td>
                                <td>
                                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                        <Link
                                            component="button"
                                            color="primary"
                                            onClick={() => navigate(row.idCommande)}>
                                            Voir les détails
                                        </Link>
                                        <RowMenu />
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