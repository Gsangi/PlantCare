import React, { useContext, useState } from "react"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import Divider from "@material-ui/core/Divider"
import ChatBox from "../components/ChatBox"
import MainNavigation from "../navigations/MainNavigation"
import UsersList from "../components/UsersList"
import UserInfo from "../components/UserInfo"

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
  const [showUserInfo, setShowUserInfo] = useState(false)

  return (
    <MainNavigation>
      <Grid container>
        <Grid id="users-list" item xs={12} sm={3}>
          <UsersList />
        </Grid>
        <Grid id="chat-box" item xs={12} sm={6}>
          <ChatBox />
        </Grid>
        <Grid id="info-box" item xs={12} sm={3}>
          <UserInfo />
        </Grid>
      </Grid>
    </MainNavigation>
  )
}

export default Home
