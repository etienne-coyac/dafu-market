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

import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getSections } from "../../../api/sections.api";
import type { SectionType } from "../../../types/sections";
import getSectionIcon, { nameToUrl } from "../../../utils/tmp/sectionToIcon";

export default function Menu() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [selectedSection, setSelectedSection] = React.useState<
    SectionType | undefined
  >();

  const { data: sections } = useQuery({
    queryKey: ["sections"],
    queryFn: getSections,
  });

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
              {selectedSection?.nomRayon ?? "Toutes les catégories"}
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
                {sections?.map((section) => (
                  <ListItem key={section.nomRayon}>
                    <ListItemButton
                      selected={section.nomRayon === selectedSection?.nomRayon}
                      onClick={() => setSelectedSection(section)}
                    >
                      <ListItemDecorator>
                        {getSectionIcon(section.nomRayon)}
                      </ListItemDecorator>
                      <ListItemContent>{section.nomRayon}</ListItemContent>
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
                    <ListItem key={cat.nomCategorie}>
                      <ListItemButton
                        onClick={() =>
                          handleLinkClick(
                            `r/${nameToUrl(
                              selectedSection.nomRayon
                            )}/${nameToUrl(cat.nomCategorie)}`
                          )
                        }
                      >
                        <ListItemContent>{cat.nomCategorie}</ListItemContent>
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
