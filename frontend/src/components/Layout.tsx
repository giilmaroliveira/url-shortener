import { Outlet, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");

  const hideMenu = location.pathname === "/login";

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Box>
      {!hideMenu && isAuthenticated && (
        <AppBar position="static" sx={{ mb: 4 }}>
          <Toolbar>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/my-urls">
                My URLs
              </Button>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      )}
      <Outlet />
    </Box>
  );
};

export default Layout;
