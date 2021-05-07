import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import ListItemText from "@material-ui/core/ListItemText"
import Avatar from "@material-ui/core/Avatar"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "auto",
    height: "100vh",
    paddingBottom: theme.spacing(2),
    borderRight: "1px solid rgba(0, 0, 0, 0.12)",
  },
  userAvatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginBottom: theme.spacing(1),
  },
  botanist: {
    padding: theme.spacing(4, 0, 3),
    backgroundColor: theme.palette.background.default,
  },
}))

export default function UsersList() {
  const classes = useStyles()
  const [selectUser, setSelectUser] = useState()

  const handleSelectUser = (e, index) => {
    setSelectUser(index)
  }

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid
          item
          container
          direction="column"
          alignItems="center"
          xs={12}
          className={classes.botanist}
        >
          <Avatar className={classes.userAvatar}>B</Avatar>
          <Typography variant="h5" color="textPrimary" gutterBottom>
            Botanist
          </Typography>
        </Grid>
        <Divider />
        <Grid item xs={12}>
          <List>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((e) => (
              <ListItem
                button
                key={e}
                value={e}
                selected={e === selectUser}
                onClick={(event) => {
                  handleSelectUser(event, e)
                }}
              >
                <ListItemAvatar>
                  <Avatar>{e}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={e} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </div>
  )
}
