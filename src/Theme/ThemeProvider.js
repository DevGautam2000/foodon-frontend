import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import { Switch } from "@mui/material";

var mode = "light";
export const theme = createTheme({
  palette: {
    mode: mode,
    primary: {
      main: "#d23f57",
    },
    secondary: {
      main: green[500],
    },
  },
});

const GreenSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#333",
    "&:hover": {
      backgroundColor: alpha("#333", theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#333",
  },
}));

function ThemeSwitch() {
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    if (checked) mode = "dark";
  }, [checked]);

  const handleChange = (event) => {
    setChecked(event.target.checked);

    if (checked) mode = "dark";
  };
  return (
    <div>
      <GreenSwitch
        checked={checked}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
    </div>
  );
}

export default ThemeSwitch;
