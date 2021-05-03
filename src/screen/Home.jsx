import React, { useContext } from "react"
import { Link } from "react-router-dom"
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import Divider from "@material-ui/core/Divider"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import EcoIcon from "@material-ui/icons/Eco"
import HomeIcon from "@material-ui/icons/Home"
import ChatBox from "../components/ChatBox"
import MainNavigation from "../navigations/MainNavigation"
import UsersList from "../components/UsersList"

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
      <Grid container>
        <Grid id="users-list" item xs={12} sm={4}>
          <UsersList />
        </Grid>
        <Grid id="chat-box" item xs={12} sm={4}>
          <ChatBox />
        </Grid>
        <Grid id="info-box" item xs={12} sm={4}></Grid>
      </Grid>
    </MainNavigation>
  )
}

export default Home
