import React from "react"
import { useLocation, Link } from "react-router-dom"
import Paper from "@material-ui/core/Paper"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItem"
import Drawer from "@material-ui/core/Drawer"
import Divider from "@material-ui/core/Divider"
import EcoIcon from "@material-ui/icons/Eco"
import HomeIcon from "@material-ui/icons/Home"
import { makeStyles } from "@material-ui/core/styles"

const drawerWidth = 80

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
  drawerItem: {
    justifyContent: "center",
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
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}))

export default function MainNavigation({ children }) {
  const classes = useStyles()
  const location = useLocation()

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar}>
          <EcoIcon fontSize="large" color="primary" />
        </div>
        <Divider />
        <List>
          <ListItem button component={Link} to="/">
            <ListItemIcon className={classes.drawerItem}>
              <HomeIcon color={location.pathname === "/" ? "secondary" : "action"} />
            </ListItemIcon>
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>{children}</main>
    </div>
  )
}
