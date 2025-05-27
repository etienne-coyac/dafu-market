import Table from '@mui/joy/Table';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';

import Row from './Row';
import { getComparator } from '../../utils/sortUtils';

import type { OrderType } from '../../types/order';

interface CommandeTableContentProps {
    readonly order: OrderType;
    readonly setOrder: (o: OrderType) => void;
    readonly prioriteEtat: boolean;
    readonly setPrioriteEtat: (p: boolean) => void;
    readonly commandes: readonly any[];
    readonly commandesNow: readonly any[];
    readonly filteredRows: readonly any[];
    readonly setFilteredRows: (rows: any[]) => void;
    readonly clientMap: any;
}

function CommandeTableContent({
    order,
    setOrder,
    prioriteEtat,
    setPrioriteEtat,
    commandes,
    commandesNow,
    filteredRows,
    setFilteredRows,
    clientMap,
}: CommandeTableContentProps) {



    return (
        <Table
            aria-label="Commandes">
            <thead>
                <tr>
                    <th style={{ width: 40 }}>
                        <IconButton
                            size="sm"
                            onClick={() => {
                                const newEtat = !prioriteEtat;
                                setPrioriteEtat(newEtat);
                                const selectedCommandes = newEtat ? commandesNow : commandes;
                                setFilteredRows(
                                    Array.isArray(selectedCommandes)
                                        ? selectedCommandes.slice()
                                        : []
                                );
                            }}
                            style={{
                                border: '1px solid #ccc',
                                backgroundColor: prioriteEtat ? '#ff4d4f' : 'white',
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
                                <path
                                    d="M1 21H23L12 2L1 21Z"
                                    fill={prioriteEtat ? 'white' : '#ff4d4f'}
                                    stroke={prioriteEtat ? 'white' : '#ff4d4f'}
                                    strokeWidth="1.5"
                                />
                                <line
                                    x1="12"
                                    y1="8"
                                    x2="12"
                                    y2="13"
                                    stroke={prioriteEtat ? '#ff4d4f' : 'white'}
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                                <circle
                                    cx="12"
                                    cy="17"
                                    r="1"
                                    fill={prioriteEtat ? '#ff4d4f' : 'white'}
                                />
                            </svg>
                        </IconButton>
                    </th>
                    <th style={{ width: 35 }}>N°</th>
                    <th>Client</th>
                    <th>
                        <Link
                            underline="none"
                            color="primary"
                            component="button"
                            onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
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
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {filteredRows?.slice().sort(getComparator(order, 'dateHeureRetrait')).map((row) => (
                    <Row key={row.name} row={row} clientMap={clientMap} />
                ))}
            </tbody>
        </Table >
    );
}

export default CommandeTableContent;