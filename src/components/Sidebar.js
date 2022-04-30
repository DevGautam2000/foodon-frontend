import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { useNavigate } from "react-router-dom";
import Copyright from "./Copyright";

function Sidebar({ toggleDrawer, drawerState }) {
  const navigate = useNavigate();
  const list = (anchor) => (
    <>
      <Box
        sx={{
          width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
          position: "relative",
        }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          <Box
            sx={{
              height: 30,
            }}
          />
          {[
            { n: "Orders", I: <LocalShippingIcon />, L: "/orders" },
            { n: "Cart", I: <ShoppingCartIcon />, L: "/cart" },
            // { n: "Support", I: <SupportAgentIcon />, L: "/support" },
          ].map(({ n, I, L }) => (
            <span key={n}>
              <Box
                sx={{
                  height: 20,
                }}
              />
              <ListItem
                button
                key={n}
                onClick={() => {
                  navigate(L);
                }}
              >
                <ListItemIcon style={{ color: "#d23f57" }}>{I}</ListItemIcon>
                <ListItemText primary={n} />
              </ListItem>
            </span>
          ))}
          <Box
            sx={{
              height: 20,
            }}
          />
          <Divider />
        </List>
      </Box>

      <ListItem sx={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
        <Copyright style={{ width: "100%", margin: "0  auto" }} />
      </ListItem>
    </>
  );
  return (
    <Drawer
      anchor="left"
      open={drawerState.left}
      onClose={toggleDrawer("left", false)}
    >
      {list("left")}
    </Drawer>
  );
}

export default Sidebar;
