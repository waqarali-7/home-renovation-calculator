import { styled, Box, Toolbar, Typography } from "@mui/material";
import MuiAppBar, { AppBarProps } from "@mui/material/AppBar";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

export default function CommonHeader() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="absolute">
        <Toolbar>
          <Typography component="div" variant="h5" sx={{ flexGrow: 1 }}>
            Home Renovation Estimation Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
