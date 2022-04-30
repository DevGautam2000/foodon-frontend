import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "./Card";

export default function GridView({ products }) {
  return (
    <Box sx={{ flexGrow: 1, padding: "1rem 20rem" }}>
      <Grid
        container
        spacing={{ xs: 2, md: 4 }}
        columns={{ xs: 4, sm: 4, md: 12 }}
      >
        {products?.map((product, index) => (
          <Card product={product} key={index} />
        ))}
      </Grid>
    </Box>
  );
}
