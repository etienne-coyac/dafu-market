import * as React from "react";
import Drawer from "@mui/joy/Drawer";
import Button from "@mui/joy/Button";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Divider from "@mui/joy/Divider";
import Stack from "@mui/joy/Stack";
import Sheet from "@mui/joy/Sheet";

import {
  Close,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Menu as MenuIcon,
} from "@mui/icons-material";
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
} from "@mui/joy";
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
import GrassIcon from "@mui/icons-material/Grass";
import { useNavigate } from "react-router";

const sections = [
  {
    name: "Fruits et Légumes",
    url: "fruits-et-legumes",
    icon: <GrassIcon />,
    categories: [
      { name: "Fruits frais", url: "fruits-frais" },
      { name: "Légumes frais", url: "legumes-frais" },
      { name: "Fruits exotiques", url: "fruits-exotiques" },
      { name: "Légumes bio", url: "legumes-bio" },
      { name: "Herbes aromatiques", url: "herbes-aromatiques" },
    ],
  },
  {
    name: "Viandes et Poissons",
    url: "viandes-et-poissons",
    icon: <RestaurantIcon />,
    categories: [
      { name: "Boucherie", url: "boucherie" },
      { name: "Volaille", url: "volaille" },
      { name: "Poissonnerie", url: "poissonnerie" },
      { name: "Traiteur de la mer", url: "traiteur-de-la-mer" },
      { name: "Charcuterie", url: "charcuterie" },
    ],
  },
  {
    name: "Produits Laitiers",
    url: "produits-laitiers",
    icon: <LocalCafeIcon />,
    categories: [
      { name: "Lait", url: "lait" },
      { name: "Fromages", url: "fromages" },
      { name: "Yaourts", url: "yaourts" },
      { name: "Beurres et Crèmes", url: "beurres-et-cremes" },
      { name: "Desserts lactés", url: "desserts-lactes" },
    ],
  },
  {
    name: "Boulangerie et Pâtisserie",
    url: "boulangerie-et-patisserie",
    icon: <BakeryDiningIcon />,
    categories: [
      { name: "Pains", url: "pains" },
      { name: "Viennoiseries", url: "viennoiseries" },
      { name: "Gâteaux à partager", url: "gateaux-a-partager" },
      { name: "Tartes", url: "tartes" },
      { name: "Pâtisseries individuelles", url: "patisseries-individuelles" },
    ],
  },
  {
    name: "Épicerie Salée",
    url: "epicerie-salee",
    icon: <LocalDiningIcon />,
    categories: [
      { name: "Pâtes", url: "pates" },
      { name: "Riz et céréales", url: "riz-et-cereales" },
      { name: "Conserves", url: "conserves" },
      { name: "Sauces", url: "sauces" },
      { name: "Soupes", url: "soupes" },
    ],
  },
  {
    name: "Épicerie Sucrée",
    url: "epicerie-sucree",
    icon: <CakeIcon />,
    categories: [
      { name: "Biscuits et gâteaux", url: "biscuits-et-gateaux" },
      { name: "Chocolats et confiseries", url: "chocolats-et-confiseries" },
      { name: "Pâtes à tartiner", url: "pates-a-tartiner" },
      { name: "Céréales petit-déjeuner", url: "cereales-petit-dejeuner" },
      { name: "Sucres et édulcorants", url: "sucres-et-edulcorants" },
    ],
  },
  {
    name: "Boissons",
    url: "boissons",
    icon: <LocalBarIcon />,
    categories: [
      { name: "Eaux", url: "eaux" },
      { name: "Jus de fruits", url: "jus-de-fruits" },
      { name: "Sodas", url: "sodas" },
      { name: "Bières", url: "bieres" },
      { name: "Vins et spiritueux", url: "vins-et-spiritueux" },
    ],
  },
  {
    name: "Surgelés",
    url: "surgeles",
    icon: <AcUnitIcon />,
    categories: [
      { name: "Légumes surgelés", url: "legumes-surgeles" },
      { name: "Plats cuisinés", url: "plats-cuisines" },
      { name: "Pizzas et tartes", url: "pizzas-et-tartes" },
      { name: "Glaces et desserts", url: "glaces-et-desserts" },
      { name: "Viandes et poissons", url: "viandes-et-poissons" },
    ],
  },
  {
    name: "Hygiène et Beauté",
    url: "hygiene-et-beaute",
    icon: <SpaIcon />,
    categories: [
      { name: "Soins du corps", url: "soins-du-corps" },
      { name: "Soins du visage", url: "soins-du-visage" },
      { name: "Hygiène bucco-dentaire", url: "hygiene-bucco-dentaire" },
      { name: "Produits capillaires", url: "produits-capillaires" },
      { name: "Parfums", url: "parfums" },
    ],
  },
  {
    name: "Entretien de la Maison",
    url: "entretien-de-la-maison",
    icon: <CleaningServicesIcon />,
    categories: [
      { name: "Produits ménagers", url: "produits-menagers" },
      { name: "Lessive et adoucissants", url: "lessive-et-adoucissants" },
      { name: "Nettoyants multi-usages", url: "nettoyants-multi-usages" },
      { name: "Sacs poubelle", url: "sacs-poubelle" },
      {
        name: "Papier toilette et essuie-tout",
        url: "papier-toilette-et-essuie-tout",
      },
    ],
  },
  {
    name: "Bébé",
    url: "bebe",
    icon: <ChildFriendlyIcon />,
    categories: [
      { name: "Couches et culottes", url: "couches-et-culottes" },
      { name: "Toilette et soins", url: "toilette-et-soins" },
      { name: "Alimentation bébé", url: "alimentation-bebe" },
      { name: "Poussettes et sièges auto", url: "poussettes-et-sieges-auto" },
      { name: "Jouets pour bébé", url: "jouets-pour-bebe" },
    ],
  },
  {
    name: "Animalerie",
    url: "animalerie",
    icon: <PetsIcon />,
    categories: [
      { name: "Alimentation pour chats", url: "alimentation-pour-chats" },
      { name: "Alimentation pour chiens", url: "alimentation-pour-chiens" },
      { name: "Accessoires pour animaux", url: "accessoires-pour-animaux" },
      { name: "Produits pour rongeurs", url: "produits-pour-rongeurs" },
      { name: "Produits pour poissons", url: "produits-pour-poissons" },
    ],
  },
];

export default function Menu() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [selectedSection, setSelectedSection] = React.useState<
    (typeof sections)[number] | undefined
  >();

  const handleLinkClick = (url: string) => {
    navigate(url);
    setOpen(false);
    window.scrollTo(0, 0);
  };
  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="neutral"
        startDecorator={<MenuIcon />}
        onClick={() => setOpen(true)}
      >
        Menu
      </Button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{
          content: {
            sx: {
              width: "auto",
              height: "auto",
              maxHeight: "100dvh",
              bgcolor: "transparent",
              p: 3,
              boxShadow: "none",
            },
          },
        }}
      >
        <Sheet
          sx={{
            borderRadius: "md",
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            height: "100%",
            overflow: "auto",
            transitionDuration: ".4s",
          }}
        >
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <DialogTitle sx={{ fontWeight: "bold" }}>
              {selectedSection?.name || "Toutes les catégories"}
            </DialogTitle>
            <IconButton onClick={() => setOpen((oldValue) => !oldValue)}>
              <Close />
            </IconButton>
          </Stack>
          <Divider />
          <DialogContent>
            <Stack direction={"row"}>
              <List
                sx={{
                  '& [role="button"]': {
                    borderRadius: "8px",
                  },
                  display: {
                    xs: selectedSection ? "none" : "block",
                    sm: "block",
                  },
                }}
              >
                {sections.map((section) => (
                  <ListItem key={section.name}>
                    <ListItemButton
                      selected={section.name === selectedSection?.name}
                      onClick={() => setSelectedSection(section)}
                    >
                      <ListItemDecorator>{section.icon}</ListItemDecorator>
                      <ListItemContent>{section.name}</ListItemContent>
                      <KeyboardArrowRight />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              {selectedSection && (
                <List
                  sx={{
                    '& [role="button"]': {
                      borderRadius: "8px",
                    },
                  }}
                >
                  <ListItem sx={{ display: { sm: "none" } }}>
                    <ListItemButton
                      onClick={() => setSelectedSection(undefined)}
                      color="neutral"
                      variant="soft"
                    >
                      <KeyboardArrowLeft />
                      <ListItemContent>
                        <i>Retour</i>
                      </ListItemContent>
                    </ListItemButton>
                  </ListItem>
                  {selectedSection.categories.map((cat) => (
                    <ListItem key={cat.name}>
                      <ListItemButton
                        onClick={() =>
                          handleLinkClick(
                            `produits/${selectedSection.url}/${cat.url}`
                          )
                        }
                      >
                        <ListItemContent>{cat.name}</ListItemContent>
                        <KeyboardArrowRight />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              )}
            </Stack>
          </DialogContent>
        </Sheet>
      </Drawer>
    </React.Fragment>
  );
}
