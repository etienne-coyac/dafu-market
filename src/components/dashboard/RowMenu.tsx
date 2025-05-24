import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import IconButton from '@mui/joy/IconButton';
import { useMutation } from '@tanstack/react-query';
import { patchCommandeStart, patchCommandeEnd } from '../../api/commandes.api';
import type { RowMenuProps } from '../../types/rowMenuProps';

function RowMenu({ idCommande, status }: Readonly<RowMenuProps>) {
    const mutationStart = useMutation({
        mutationFn: (id: string) => patchCommandeStart(id),
        onSuccess: (data) => {
            console.log("Commande mise en préparation :", data);
        },
    });

    const mutationEnd = useMutation({
        mutationFn: (id: string) => patchCommandeEnd(id),
        onSuccess: (data) => {
            console.log("Commande finalisée :", data);
        },
    });
    return (
        <Dropdown>
            <MenuButton
                slots={{ root: IconButton }}
                slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
            >
                ⋮
            </MenuButton>

            <Menu size="sm" sx={{ minWidth: 140 }}>
                {status === 'PAYE' && (
                    <MenuItem
                        component="button"
                        onClick={() => mutationStart.mutate(idCommande)}
                    >
                        Mettre en préparation
                    </MenuItem>
                )}

                {status === 'EN_PREPARATION' && (
                    <MenuItem
                        component="button"
                        onClick={() => mutationEnd.mutate(idCommande)}
                    >
                        Finaliser la commande
                    </MenuItem>
                )}

                {status === 'PRET' && (
                    <MenuItem
                        color="danger"
                        component="button"
                        onClick={() => {
                            // logique de suppression ici
                        }}
                    >
                        Supprimer
                    </MenuItem>
                )}
            </Menu>
        </Dropdown>
    );
}
export default RowMenu;
