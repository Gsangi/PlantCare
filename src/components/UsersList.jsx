import React, { useRef, useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import ListItemText from "@material-ui/core/ListItemText"
import Avatar from "@material-ui/core/Avatar"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import AddIcon from "@material-ui/icons/Add"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContentText from "@material-ui/core/DialogContentText"
import TextField from "@material-ui/core/TextField"
import InputAdornment from "@material-ui/core/InputAdornment"
import Skeleton from "@material-ui/lab/Skeleton"
import IconButton from "@material-ui/core/IconButton"
import Button from "@material-ui/core/Button"
import Snackbar from "@material-ui/core/Snackbar"
import CloseIcon from "@material-ui/icons/Close"
import { useUsers } from "../context/UsersContext"
import { useMessages } from "../context/MessagesContext"

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
  const { users, notFound, alreadyPresentUser, addUser } = useUsers()
  const { user: selectUser, selectUser: setSelectUser } = useMessages()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const phoneRef = useRef()

  useEffect(() => {
    setSnackbarOpen(!!notFound)
  }, [notFound])

  useEffect(() => {
    setSelectUser(users[alreadyPresentUser])
  }, [alreadyPresentUser])

  const handleSelectUser = (e, user) => {
    setSelectUser(user)
  }

  const handleAddNewUser = async () => {
    setError(false)
    setLoading(true)
    setDialogOpen(false)
    try {
      await addUser(phoneRef.current.value)
    } catch (e) {
      console.log(e)
      setError(true)
    }
    setLoading(false)
  }

  const handleDialogOpen = () => {
    setDialogOpen(true)
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return
    setSnackbarOpen(false)
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
            {users.map((e) => (
              <ListItem
                button
                key={e.phone}
                value={e.phone}
                selected={e === selectUser}
                onClick={(event) => {
                  handleSelectUser(event, e)
                }}
              >
                <ListItemAvatar>
                  <Avatar>{e.name[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={e.name} />
              </ListItem>
            ))}
            {loading && (
              <ListItem>
                <ListItemAvatar>
                  <Skeleton variant="circle" width={40} height={40} />
                </ListItemAvatar>
                <ListItemText primary={<Skeleton variant="text" />} />
              </ListItem>
            )}
            <Divider />
            <ListItem button onClick={handleDialogOpen}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Add  Customer" />
            </ListItem>
          </List>
        </Grid>
      </Grid>
      <Dialog open={dialogOpen} onClose={handleDialogClose} aria-labelledby="enter-phone-dialog">
        <DialogTitle id="enter-number-dialog">Add customer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add customer and start chat. Please enter customer phone.
          </DialogContentText>
          <TextField
            autoFocus
            label="Phone"
            margin="dense"
            id="phone"
            type="tel"
            pattern="[0-9]{3} [0-9]{3} [0-9]{4}"
            maxLength="12"
            fullWidth
            inputRef={phoneRef}
            InputProps={{
              startAdornment: <InputAdornment position="start">+91</InputAdornment>,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddNewUser} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={snackbarOpen || error}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={error ? "Something went wrong" : `${notFound} not found`}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleSnackbarClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  )
}
