import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Avatar from "@material-ui/core/Avatar"
import Typography from "@material-ui/core/Typography"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Drawer from "@material-ui/core/Drawer"
import Divider from "@material-ui/core/Divider"
import Grid from "@material-ui/core/Grid"
import Tooltip from "@material-ui/core/Tooltip"
import Skeleton from "@material-ui/lab/Skeleton"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import { useMessages } from "../context/MessagesContext"
import phoneFormat from "../utils/phoneFormat"
import { AppBar, Dialog, DialogContent, DialogTitle, Slide } from "@material-ui/core"
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"

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
  orderList: {
    overflowY: "scroll",
  },
  orderInfoAppBar: {
    position: "relative",
  },
  orderInfoTitle: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function UserInfo({ showDrawer, onClose, width }) {
  const classes = useStyles({ width })
  const { user, orders, loadingOrder, errorLoading, getOrders } = useMessages()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectOrder, setSelectOrder] = useState(-1)

  useEffect(() => {
    if (user) getOrders(user.customer_id)
  }, [user])

  const handleOrderClick = (el, index) => {
    setSelectOrder(index)
    setDialogOpen(true)
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
  }

  if (!user) return <div />

  return (
    <>
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
          <Typography color="textSecondary">{`${phoneFormat(user.phone)} - ( ${
            user.customer_id
          } )`}</Typography>
        </Grid>
        <Divider />

        <List className={classes.orderList}>
          {loadingOrder ? (
            <ListItem>
              <ListItemText primary={<Skeleton variant="text" />} />
            </ListItem>
          ) : (
            orders.map((order, index) => (
              <Tooltip
                title={
                  order.order_number + " " + (order.cancelled_at ? "canceled" : order.shipment_status)
                }
                key={order.order_number}
              >
                <ListItem button onClick={(el) => handleOrderClick(el, index)}>
                  <ListItemText
                    inset
                    primary={order.order_number}
                    primaryTypographyProps={{
                      style: { textDecoration: order.cancelled_at ? "line-through" : "none" },
                    }}
                    secondary={order.cancelled_at ? "canceled" : order.shipment_status}
                  />
                </ListItem>
              </Tooltip>
            ))
          )}
        </List>
      </Drawer>
      {selectOrder >= 0 && (
        <Dialog
          open={dialogOpen}
          onClose={handleDialogClose}
          fullScreen
          TransitionComponent={Transition}
        >
          <AppBar className={classes.orderInfoAppBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleDialogClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.orderInfoTitle}>
                {orders[selectOrder].order_number}
              </Typography>
            </Toolbar>
          </AppBar>
          <List>
            {orders[selectOrder].line_items.map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={item.title} secondary={`qty: ${item.quantity}`} />
              </ListItem>
            ))}
          </List>
        </Dialog>
      )}
    </>
  )
}
