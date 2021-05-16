import React, { useState } from "react"
import clsx from "clsx"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import CircularProgress from "@material-ui/core/CircularProgress"
import { makeStyles } from "@material-ui/core"
import CheckIcon from "@material-ui/icons/Check"

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    maxWidth: "65%",
  },
  userMsg: {
    backgroundColor: "#FCEF87",
  },
  marginL: {
    marginLeft: theme.spacing(2),
  },
  messageText: {
    whiteSpace: "pre-wrap",
    overflowWrap: "anywhere",
  },
}))

const MessageBox = React.forwardRef(({ message }, ref) => {
  const classes = useStyles()
  const [sent, setSent] = useState(message.statusString === "SENT")

  setTimeout(() => {
    setSent(true)
    message.changeStatus("SENT")
  }, 2000)

  return (
    <Grid item container justify={message.owner ? "flex-end" : "flex-start"} ref={ref}>
      <Paper elevation={0} className={clsx(classes.root, { [classes.userMsg]: !message.owner })}>
        <Typography className={classes.messageText}>{message.text}</Typography>
        <Grid
          item
          container
          justify="flex-end"
          direction={!message.owner ? "row-reverse" : "row"}
          alignItems="center"
        >
          <Typography variant="caption" color="textSecondary">
            {message.timestamp.format("H:mm")}
          </Typography>
          {message.owner &&
            (!sent ? (
              <CircularProgress size={20} className={classes.marginL} />
            ) : (
              <CheckIcon color="primary" fontSize={"small"} className={classes.marginL} />
            ))}
        </Grid>
      </Paper>
    </Grid>
  )
})

export default MessageBox
