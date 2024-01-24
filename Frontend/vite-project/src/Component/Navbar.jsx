import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { Debounce } from "../Optimization/Debounce";
import {
  AppBar,
  Toolbar,
  Button,
  Avatar,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Container,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useProductContext } from "../Context/ProductContext";
import { useLocation } from "react-router-dom";

const BASE_URL = "http://localhost:5000";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("locationnn", location.pathname);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { setProduct, fetchData } = useProductContext();
  const auth = JSON.parse(localStorage.getItem("user"));
  const storedUser = auth?.name;

  const pages = [
    { label: "Products", route: "/" },
    { label: "Add Products", route: "/products" },
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const deBounceHandleSearch = Debounce(async (searchText) => {
    console.log("searchTextttt", searchText);
    if (searchText.trim() !== "") {
      const searchResult = await fetch(
        `${BASE_URL}/search/${searchText.toLowerCase()}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await searchResult.json();
      if (data.length > 0) {
        setProduct(data);
      } else {
        setProduct([]);
      }
    } else {
      fetchData();
    }
  }, 500);

  const logOut = () => {
    if (window.confirm("Do you really want to logout?")) {
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Link to={"/"}>
            <img
              className="logo"
              src="https://imgs.search.brave.com/yDzrfOyLNYvv5oC73I5-RWGgSAsDz84QNwNrno1cAPA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9taXJv/Lm1lZGl1bS5jb20v/djIvMSo1RDlvWUJk/NThweWpNa1ZfNS16/WFhRLmpwZWc"
              alt="image"
              style={{ height: "50px", width: "auto", marginRight: "20px" }}
            />
          </Link>

          <div
            style={{
              flexGrow: 1,
              display: {
                xs: "none",
                md: "flex",
              },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.label}
                color="inherit"
                component={Link}
                to={page.route}
              >
                {page.label}
              </Button>
            ))}
          </div>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                  <Button color="inherit" component={Link} to={page.route}>
                    {page.label}
                  </Button>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {location.pathname === "/" ? (
            <Search
              onChange={(e) => deBounceHandleSearch(e.target.value)}
              sx={{ mr: 8 }}
            >
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          ) : (
            ""
          )}

          <Box sx={{ flexGrow: 0 }}>
            {auth ? (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={storedUser} src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
            ) : (
              <>
                <Button color="inherit" component={Link} to={"/register"}>
                  SignUp
                </Button>
                <Button color="inherit" component={Link} to={"/login"}>
                  Login
                </Button>
              </>
            )}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {auth && (
                <div>
                  <MenuItem>
                    <Typography textAlign="center">{storedUser}</Typography>
                  </MenuItem>
                  <MenuItem key="Logout" onClick={logOut}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </div>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
