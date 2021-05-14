import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Avatar from "@material-ui/core/Avatar"
import Typography from "@material-ui/core/Typography"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Drawer from "@material-ui/core/Drawer"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import { useMessages } from "../context/MessagesContext"
import Divider from "@material-ui/core/Divider"
import Grid from "@material-ui/core/Grid"

const useStyles = makeStyles((theme) => ({
  root: {},
  userProfile: {
    padding: theme.spacing(4, 0, 3),
    backgroundColor: theme.palette.background.default,
  },
  userAvatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginBottom: theme.spacing(1),
  },
  drawer: {
    width: (props) => props.width,
    flexShrink: 0,
  },
  drawerPaper: {
    width: (props) => props.width,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
}))

export default function UserInfo({ showDrawer, onClose, width }) {
  const classes = useStyles({ width })
  const { user } = useMessages()

  if (!user) return <div />

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={showDrawer}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
      <Divider />
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.userProfile}
      >
        <Avatar className={classes.userAvatar}>{user.name[0].toUpperCase()}</Avatar>
        <Typography variant="h5" color="textPrimary" gutterBottom>
          {user.name}
        </Typography>
      </Grid>
      <Divider />
      <List>
        {["#3423-LI", "#5323-LI", "#5438-LI"].map((e) => (
          <ListItem button key={e}>
            <ListItemText inset primary={e} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}
