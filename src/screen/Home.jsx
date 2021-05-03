import React, { useContext } from "react"
import { Link } from "react-router-dom"
import Box from "@material-ui/core/Box"
import { makeStyles } from "@material-ui/core/styles"
import ChatBox from "../components/ChatBox"
import MainNavigation from "../navigations/MainNavigation"
import Drawer from "@material-ui/core/Drawer"
import Divider from "@material-ui/core/Divider"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import EcoIcon from "@material-ui/icons/Eco"
import HomeIcon from "@material-ui/icons/Home"

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  logo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "inherit",
  },
}))

function Home() {
  const classes = useStyles()

  return (
    <MainNavigation>
      <Drawer
        variant="permanent"
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        color="primary"
      >
        <div className={classes.toolbar}>
          <EcoIcon fontSize="large" color="primary" />
        </div>
        <Divider />
        <List>
          <ListItem button component={Link} to="/">
            <ListItemIcon>
              <HomeIcon color={location.pathname === "/" ? "secondary" : "action"} />
            </ListItemIcon>
            <ListItemText primary={"hola"} />
          </ListItem>
        </List>
      </Drawer>
      <ChatBox />
    </MainNavigation>
  )
}

export default Home
