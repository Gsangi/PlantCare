import React, { useContext } from "react"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import Drawer from "@material-ui/core/Drawer"
import Button from "@material-ui/core/Button"
import SettingsIcon from "@material-ui/icons/Settings"
import EcoIcon from "@material-ui/icons/Eco"
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles"
import { Context as AuthContext } from "../Context/AuthContext"

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Poppins"],
  },
  palette: {
    primary: { main: "#258c60" },
  },
})

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: theme.spacing(7) + 1,
  },
}))

function Home() {
  const classes = useStyles()

  const { state, SignOut } = useContext(AuthContext)
  return (
    <Box>
      <ThemeProvider theme={theme}>
        <Drawer
          variant="permanent"
          className={classes.drawer}
          color="primary"
        >
          <EcoIcon />
        </Drawer>
      </ThemeProvider>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          SignOut(state.username)
          console.log("Sign Out!")
        }}
      >
        Sign Out
      </Button>
    </Box>
  )
}

export default Home
