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
    maxWidth: "85%",
  },
  userMsg: {
    backgroundColor: "#FCEF87",
  },
  marginL: {
    marginLeft: theme.spacing(2),
  },
}))

export default function MessageBox({ message }) {
  const classes = useStyles()
  const [sent, setSent] = useState(message.sent)

  setTimeout(() => {
    setSent(true)
    message.markSent()
  }, 2000)

  return (
    <Grid item container justify={message.sender === "me" ? "flex-end" : "flex-start"}>
      <Paper
        elevation={0}
        className={clsx(classes.root, { [classes.userMsg]: message.sender !== "me" })}
      >
        <Typography>{message.msg}</Typography>
        <Grid
          item
          container
          justify="flex-end"
          direction={message.sender !== "me" ? "row-reverse" : "row"}
          alignItems="center"
        >
          <Typography variant="caption" color="textSecondary">
            {message.time.format("H:mm")}
          </Typography>
          {message.sender === "me" &&
            (!sent ? (
              <CircularProgress size={20} className={classes.marginL} />
            ) : (
              <CheckIcon color="primary" fontSize={"small"} className={classes.marginL} />
            ))}
        </Grid>
      </Paper>
    </Grid>
  )
}
