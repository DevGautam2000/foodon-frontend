import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { theme } from "../Theme/ThemeProvider";
import { ThemeProvider } from "@mui/material/styles";
import Copyright from "../components/Copyright";
import { useAction } from "../state/actions/index.action";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";

export default function SignIn() {
  const navigate = useNavigate();
  const { signin } = useAction();
  const auth = useSelector((state) => state.auth);

  const [message, setmessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("error");
  let isMounted = React.useRef(true);
  React.useEffect(() => {
    const effect = () => {
      isMounted.current = false;
      if (auth.authenticated) navigate("/");
    };
    return effect();
    // eslint-disable-next-line
  }, [auth.authenticated]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const user = {
      email: data.get("email"),
      password: data.get("password"),
    };

    if (!user.email || !user.password) {
      setmessage(() => "Invalid input.");
      setOpen(() => true);
      setSeverity(() => "error");
      setTimeout(() => {
        setOpen(() => false);
      }, 2000);

      return;
    }

    signin(user).then((d) => {
      if (!auth.token) {
        setmessage(() => auth.message);
        setOpen(() => true);
        setSeverity(() => "error");
        setTimeout(() => {
          setOpen(() => false);
        }, 2000);
      }
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={1000}
      >
        <Alert severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: "15vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" style={{ color: "#d23f57" }}>
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              style={{ background: "#d23f57" }}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
