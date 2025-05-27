import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  LinearProgress,
  Option,
  Select,
  Stack,
  Table,
  Tooltip,
  Typography,
} from "@mui/joy";
import CenterContent from "../../../components/layout/CenterContent";
import { useQuery } from "@tanstack/react-query";
import { getCommandesClient } from "../../../api/commandes.api";
import dayjs from "dayjs";
import { getDisplayPrice } from "../../../utils/products.utils";
import { useParams } from "react-router";
import { useState } from "react";
import {
  getOrderStatusIcon,
  getOrderStatusText,
} from "../../../utils/order.utils";
import { enableCache } from "../../../AppProviders";
import { commandeStatusList } from "../../../types/commandes";

const OrdersPage = () => {
  const { idCommande } = useParams<{ idCommande: string }>();
  const [open, setOpen] = useState<number | undefined>(
    idCommande ? +idCommande : undefined
  );
  const [orderStatusFilter, setOrderStatusFilter] = useState<string | null>(
    null
  );

  const { data: orders, isFetching } = useQuery({
    queryKey: ["orders"],
    queryFn: getCommandesClient,
    ...enableCache(),
  });

  const filteredOrders = orders
    ?.filter(
      (order) =>
        order.statut === orderStatusFilter || orderStatusFilter === null
    )
    ?.sort((a, b) => dayjs(b.dateHeureRetrait).diff(a.dateHeureRetrait));

  return (
    <CenterContent>
      <LinearProgress
        sx={{
          position: "absolute",
          width: "100%",
          top: 0,
          left: 0,
          display: isFetching ? "block" : "none",
        }}
      />
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography level="h1">Mes commandes</Typography>
        <Select
          placeholder="Status"
          value={orderStatusFilter}
          onChange={(_e, newValue) => setOrderStatusFilter(newValue)}
        >
          <Option value={null}>
            <i>Tous</i>
          </Option>
          {commandeStatusList.map((status) => (
            <Option key={status} value={status}>
              {getOrderStatusText(status)}
            </Option>
          ))}
        </Select>
      </Stack>
      <AccordionGroup>
        {filteredOrders?.length ? (
          filteredOrders?.map((order) => (
            <Accordion
              key={order.idCommande}
              expanded={open === order.idCommande}
              onChange={() =>
                setOpen(
                  open === order.idCommande ? undefined : order.idCommande
                )
              }
            >
              <AccordionSummary sx={{ justifyContent: "flex-start" }}>
                <Stack direction={"row"} gap={1}>
                  <Tooltip
                    placement="right"
                    variant="solid"
                    title={getOrderStatusText(order.statut)}
                  >
                    {getOrderStatusIcon(order.statut)}
                  </Tooltip>
                  {`Commande N°${order.idCommande} (retrait le ${dayjs(
                    order.dateHeureRetrait
                  ).format("DD/MM/YYYY [à] HH[h]")})`}
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                <Typography level="h4">{`Total : ${order.panier.totalCost}€`}</Typography>
                <Table sx={{ "& thead th:nth-child(1)": { width: "40%" } }}>
                  <thead>
                    <tr>
                      <th>Produit</th>
                      <th>Quantité</th>
                      <th>Prix unitaire</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.panier.lignes.map((product) => (
                      <tr key={product.idProduit}>
                        <td>{product.nom}</td>
                        <td>{product.quantite}</td>
                        <td>{getDisplayPrice(product)}€</td>
                        <td>{product.quantite * getDisplayPrice(product)}€</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <Typography>Aucune commande</Typography>
        )}
      </AccordionGroup>
    </CenterContent>
  );
};

export default OrdersPage;
