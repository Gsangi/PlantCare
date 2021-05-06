import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Avatar from "@material-ui/core/Avatar"
import Typography from "@material-ui/core/Typography"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"

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
}))

export default function UserInfo() {
  const classes = useStyles()
  const [openDialog, setOpenDialog] = useState(false)
  const [order, setOrder] = useState()

  const handleDialogClose = () => {
    setOpenDialog(false)
  }

  const handleShowOrderDetails = () => {
    setOpenDialog(true)
  }

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item container direction="column" alignItems="center" className={classes.userProfile}>
          <Avatar className={classes.userAvatar}>U</Avatar>
          <Typography variant="h5" color="textPrimary" gutterBottom>
            User
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <List>
            {["#3423-LI", "#5323-LI", "#5438-LI"].map((e) => (
              <ListItem button onClick={handleShowOrderDetails} key={e}>
                <ListItemText inset primary={e} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Order</DialogTitle>
      </Dialog>
    </div>
  )
}
