import EqualizerIcon from "@mui/icons-material/Equalizer";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import RecommendIcon from "@mui/icons-material/Recommend";
import AreaChartIcon from "@mui/icons-material/AreaChart";
import { Percent } from "@mui/icons-material";

export const nameToUrl = (name: string) =>
  name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // remove special chars
    .trim()
    .replace(/\s+/g, "-"); // spaces to dashes

export const getAdminIcon = (name: string) => {
  switch (nameToUrl(name)) {
    case "import":
      return <ImportExportIcon />;
    case "forecast":
      return <AreaChartIcon />;
    case "statistiques":
      return <EqualizerIcon />;
    case "efficacite":
      return <AutoGraphIcon />;
    case "editer":
      return <Percent />;
    case "algorithme":
      return <RecommendIcon />;
    case "consulter":
      return <PersonSearchIcon />;
    case "habitudes":
      return <LocationSearchingIcon />;
    default:
      return null;
  }
};

export default getAdminIcon;
