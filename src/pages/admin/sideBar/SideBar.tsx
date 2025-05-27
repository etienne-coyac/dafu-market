import GlobalStyles from "@mui/joy/GlobalStyles";
import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { Link } from "react-router";
import getAdminIcon from "../../../utils/tmp/adminToIcon";

export default function Sidebar() {
  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: "fixed", md: "sticky" },
        transform: {
          xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
          md: "none",
        },
        transition: "transform 0.4s, width 0.4s",
        zIndex: 10000,
        height: "100dvh",
        width: "var(--Sidebar-width)",
        top: 0,
        p: 2,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Sidebar-width": "220px",
            [theme.breakpoints.up("lg")]: {
              "--Sidebar-width": "240px",
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: "fixed",
          zIndex: 9998,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          opacity: "var(--SideNavigation-slideIn)",
          backgroundColor: "var(--joy-palette-background-backdrop)",
          transition: "opacity 0.4s",
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
            lg: "translateX(-100%)",
          },
        }}
      />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Typography level="title-lg">Admin</Typography>
      </Box>
      <Box
        sx={{
          minHeight: 0,
          overflow: "hidden auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            "--List-nestedInsetStart": "30px",
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
          }}
        >
          <ListItem>
            <ListItemButton role="menuitem" component={Link} to="/admin/import">
              <ListItemDecorator>{getAdminIcon("import")}</ListItemDecorator>
              <ListItemContent>
                <Typography level="title-sm">Importation</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton
              role="menuitem"
              component={Link}
              to="/admin/forecast"
              disabled
            >
              {getAdminIcon("forecast")}
              <ListItemContent>
                <Typography level="title-sm">Prévisions de stock</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            {getAdminIcon("statistiques")}
            <ListItemContent>
              <Typography level="title-sm">Statistiques</Typography>
            </ListItemContent>
          </ListItem>

          <ListItem nested>
            <List sx={{ gap: 0.5 }}>
              <ListItem>
                <ListItemButton
                  role="menuitem"
                  component={Link}
                  to="/admin/efficaciteSysteme"
                  disabled
                >
                  {getAdminIcon("efficacite")}
                  <ListItemContent>
                    <Typography level="title-sm">
                      Efficacité des sytèmes
                    </Typography>
                  </ListItemContent>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton
                  role="menuitem"
                  component={Link}
                  to="/admin/statistiques"
                >
                  {getAdminIcon("editer")}
                  <ListItemContent>
                    <Typography level="title-sm">
                      Visualiser les statistiques
                    </Typography>
                  </ListItemContent>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton
                  role="menuitem"
                  component={Link}
                  to="/admin/parametrerAlgorithme"
                  disabled
                >
                  {getAdminIcon("algorithme")}
                  <ListItemContent>
                    <Typography level="title-sm">
                      Paramétrer l'algorithme de recommandation
                    </Typography>
                  </ListItemContent>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton
                  role="menuitem"
                  component={Link}
                  to="/admin/consulterProfils"
                  disabled
                >
                  {getAdminIcon("consulter")}
                  <ListItemContent>
                    <Typography level="title-sm">
                      Consultation des profils
                    </Typography>
                  </ListItemContent>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton
                  role="menuitem"
                  component={Link}
                  to="/admin/habitudesProfils"
                  disabled
                >
                  {getAdminIcon("habitudes")}
                  <ListItemContent>
                    <Typography level="title-sm">
                      Habitudes des profils
                    </Typography>
                  </ListItemContent>
                </ListItemButton>
              </ListItem>
            </List>
          </ListItem>
        </List>
      </Box>
    </Sheet>
  );
}
