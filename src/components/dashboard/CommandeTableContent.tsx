import Table from "@mui/joy/Table";
import IconButton from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";

import Row from "./Row";
import { getComparator } from "../../utils/sortUtils";

import type { OrderType } from "../../types/order";
import type { CommandeType } from "../../types/commandes";
import type { Dispatch, SetStateAction } from "react";
import { Warning } from "@mui/icons-material";

interface CommandeTableContentProps {
  readonly order: OrderType;
  readonly setOrder: (o: OrderType) => void;
  readonly prioriteEtat: boolean;
  readonly setPrioriteEtat: Dispatch<SetStateAction<boolean>>;
  readonly commandes: CommandeType[];
  readonly clientMap: any;
}

function CommandeTableContent(props: CommandeTableContentProps) {
  const {
    order,
    setOrder,
    prioriteEtat,
    setPrioriteEtat,
    commandes,
    clientMap,
  } = props;
  return (
    <Table aria-label="Commandes">
      <thead>
        <tr>
          <th style={{ width: 40 }}>
            <IconButton
              size="sm"
              color="danger"
              onClick={() => setPrioriteEtat((f) => !f)}
              variant={prioriteEtat ? "solid" : "outlined"}
            >
              <Warning />
            </IconButton>
          </th>
          <th style={{ width: 35 }}>N°</th>
          <th>Client</th>
          <th>
            <Link
              underline="none"
              color="primary"
              component="button"
              onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
              sx={{
                fontWeight: "lg",
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                "& svg": {
                  transition: "transform 0.3s ease",
                  transform:
                    order === "desc" ? "rotate(0deg)" : "rotate(180deg)",
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
        {commandes
          ?.slice()
          .sort(getComparator(order, "dateHeureRetrait"))
          .map((row) => (
            <Row key={row.idCommande} row={row} clientMap={clientMap} />
          ))}
      </tbody>
    </Table>
  );
}

export default CommandeTableContent;
