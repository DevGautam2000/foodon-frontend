import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import GridView from "./Gridview";
import Copyright from "./Copyright";
import { useSelector } from "react-redux";
import { useAction } from "../state/actions/index.action";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      className="tabs_tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  const { getProducts } = useAction();

  React.useEffect(() => {
    getProducts();
    // eslint-disable-next-line
  }, []);

  const scrollHandler = () => {
    const displacement = window.innerHeight - (16 / 100) * window.innerHeight; //this means windowHeight - 16% of viewport
    window.scrollBy(0, window.scrollY > 0 ? 0 : displacement);
  };

  const products = useSelector((state) => state?.products?.products?.[0]);
  const { breakfast, lunch, dinner } = { ...products };

  return (
    <>
      <Box sx={{ width: "100%", height: "90vh" }} className="tabs">
        <Box
          sx={{
            mt: "20px",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="tabs switcher"
            textColor="secondary"
            indicatorColor="secondary"
          >
            <Tab label="Breakfast" {...a11yProps(0)} onClick={scrollHandler} />
            <Tab label="Lunch" {...a11yProps(1)} onClick={scrollHandler} />
            <Tab label="Dinner" {...a11yProps(2)} onClick={scrollHandler} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <GridView products={breakfast} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <GridView products={lunch} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <GridView products={dinner} />
        </TabPanel>

        <Copyright />
      </Box>
    </>
  );
}
