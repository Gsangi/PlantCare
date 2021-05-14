import React, { useState } from "react"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import ChatBox from "../components/ChatBox"
import MainNavigation from "../navigations/MainNavigation"
import UsersList from "../components/UsersList"
import UserInfo from "../components/UserInfo"

const drawerWidth = 480

const useStyles = makeStyles((theme) => ({
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

  const handleUserInfoOpen = () => {
    setShowUserInfo(true)
  }

  const handleUserInfoClose = () => {
    setShowUserInfo(false)
  }

  return (
    <MainNavigation>
      <Grid container>
        <Grid id="users-list" item xs={12} sm={3}>
          <UsersList />
        </Grid>
        <Grid
          id="chat-box"
          item
          xs={12}
          sm={9}
        >
          <ChatBox onShowInfo={handleUserInfoOpen} showInfo={showUserInfo} width={drawerWidth}/>
        </Grid>
        <UserInfo showDrawer={showUserInfo} onClose={handleUserInfoClose} width={drawerWidth} />
      </Grid>
    </MainNavigation>
  )
}

export default Home
