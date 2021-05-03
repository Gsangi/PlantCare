import React from "react"
import { useLocation, Link } from "react-router-dom"
import Box from "@material-ui/core/Box"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItem"
import Drawer from "@material-ui/core/Drawer"
import Divider from "@material-ui/core/Divider"
import EcoIcon from "@material-ui/icons/Eco"
import HomeIcon from "@material-ui/icons/Home"
import { makeStyles } from "@material-ui/core/styles"

const drawerWidth = "auto"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
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

export default function MainNavigation({ children }) {
  const classes = useStyles()
  const location = useLocation()

  return (
    <div className={classes.root}>
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
          </ListItem>
        </List>
      </Drawer>
      {children}
    </div>
  )
}
