import GrassIcon from "@mui/icons-material/Grass";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import BakeryDiningIcon from "@mui/icons-material/BakeryDining";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import CakeIcon from "@mui/icons-material/Cake";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import SpaIcon from "@mui/icons-material/Spa";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";
import PetsIcon from "@mui/icons-material/Pets";
import KebabDiningIcon from '@mui/icons-material/KebabDining';
import KitchenIcon from '@mui/icons-material/Kitchen';
import BreakfastDiningIcon from '@mui/icons-material/BreakfastDining';

export const nameToUrl = (name: string) =>
  name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // remove special chars
    .trim()
    .replace(/\s+/g, "-"); // spaces to dashes
export const getSectionIcon = (name: string) => {
  switch (nameToUrl(name)) {
    case "fruits-et-legumes":
      return <GrassIcon />;
    case "viandes-et-poissons":
      return <RestaurantIcon />;
    case "produits-laitiers":
      return <LocalCafeIcon />;
    case "boulangerie-et-patisserie":
      return <BakeryDiningIcon />;
    case "epicerie-salee":
      return <LocalDiningIcon />;
    case "epicerie-sucree":
      return <CakeIcon />;
    case "boissons":
      return <LocalBarIcon />;
    case "surgeles":
      return <AcUnitIcon />;
    case "hygiene":
      return <SpaIcon />;
    case "entretien-et-nettoyage":
      return <CleaningServicesIcon />;
    case "bebe":
      return <ChildFriendlyIcon />;
    case "animalerie":
      return <PetsIcon />;
    case "charcuterie-et-traiteur":
      return <KebabDiningIcon />;
    case "cremerie-et-produits-laitiers":
      return <KitchenIcon />;
    case "pains-et-patisseries":
      return <BreakfastDiningIcon />;
    default:
      return null;
  }
};

export default getSectionIcon;
