import { Card, Sheet, Stack, Typography } from "@mui/joy";
import { useQuery } from "@tanstack/react-query";
import { getStats } from "../../../api/stats.api";

const Stats = () => {
  const { data: stats } = useQuery({
    queryKey: ["stats"],
    queryFn: getStats,
  });

  return (
    <Stack gap={1}>
      <Typography level="h2">Statistiques</Typography>
      <Stack>
        <Typography level="h4">
          Moyenne de prix de commande (par magasin)
        </Typography>
        <Stack direction={"row"} gap={1}>
          {stats?.map((stat) => (
            <Card key={stat.idMagasin}>
              <Sheet>
                <Stack gap={1}>
                  <Typography level="h1">{stat.moyenne.toFixed(2)}€</Typography>
                  <Typography>Magasin {stat.nomMagasin}</Typography>
                </Stack>
              </Sheet>
            </Card>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Stats;
