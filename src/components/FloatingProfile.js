import * as React from "react";
import List from "@mui/material/List";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { store } from "../state/store.state";
import { Stack } from "@mui/material";

export default function FloatingProfile() {
  const { auth } = store.getState();
  return (
    <List
      className="floatingprofile__main"
      sx={{
        width: "260px",
        maxWidth: 260,
        bgcolor: "background.paper",
        minHeight: "5vh",
        paddingTop: "20px",
      }}
    >
      <Stack>
        <Avatar
          alt={`${auth.user.firstName}`}
          src=" "
          sx={{ width: "60px", height: "60px", margin: "0 auto" }}
        />
        <Stack />

        <Typography
          sx={{ display: "inline", mt: 2 }}
          component="span"
          variant="body2"
          color="text.primary"
        >
          {auth.token ? `${auth.user.firstName} ${auth.user.lastName}` : null}
        </Typography>
        <Typography
          sx={{ display: "inline", fontSize: "0.7rem", mb: 2 }}
          component="span"
          variant="body2"
          color="text.primary"
        >
          India
        </Typography>
        {/* <Divider />
        <Typography
          sx={{
            display: "inline",
            fontSize: "0.7rem",
            mt: 2,
            textAlign: "left",
            padding: "0 1rem",
          }}
          color="text.primary"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          consequuntur quisquam illum et est, molestiae quibusdam ratione
          voluptatum! Maxime ea dolor, unde non repellat culpa ipsam error!
          Nostrum, quasi obcaecati!
        </Typography> */}
      </Stack>
    </List>
  );
}
