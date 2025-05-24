import * as React from 'react';
import Sheet from '@mui/joy/Sheet';

import { getCommandes, getCommandesNow } from "../../../api/commandes.api";
import { useQuery, useQueries } from '@tanstack/react-query';
import { getClientById } from '../../../api/clients.api';
import { useState } from 'react';
import CommandeTableContent from '../../../components/dashboard/CommandeTableContent';



function DashboardPrepa() {

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

    React.useEffect(() => {
        setFilteredRows(Array.isArray(commandes) ? commandes : []);
    }, [commandes]);

    return (
        <Sheet>
            <CommandeTableContent
                order={order}
                setOrder={setOrder}
                prioriteEtat={prioriteEtat}
                setPrioriteEtat={setPrioriteEtat}
                commandes={Array.isArray(commandes) ? commandes : []}
                commandesNow={Array.isArray(commandesNow) ? commandesNow : []}
                filteredRows={filteredRows ?? []}
                setFilteredRows={setFilteredRows}
                clientMap={clientMap}
            />
        </Sheet>
    );

}

export default DashboardPrepa;

