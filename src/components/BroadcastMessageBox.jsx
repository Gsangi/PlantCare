import React from "react"
import Grid from "@material-ui/core/Grid"
import { Card, CardHeader, makeStyles } from "@material-ui/core"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1, 0),
  },
  card: {
    width: "60%",
    backgroundColor: "#e7e7e7",
  },
  title: {
    fontSize: 14,
  },
  message: {
    whiteSpace: "pre-line",
  },
}))

const BroadcastMessageBox = React.forwardRef(({ broadcastMessage }, ref) => {
  const classes = useStyles()

  return (
    <Grid item container justify="center" alignItems="center" className={classes.root} ref={ref}>
      <Card elevation={0} className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            {broadcastMessage.eventDescription.substring(
              broadcastMessage.eventDescription.indexOf('"') + 1,
              broadcastMessage.eventDescription.lastIndexOf('"')
            )}
          </Typography>
          <Typography className={classes.message}>{`${broadcastMessage.finalText}`}</Typography>
          <Typography variant="caption">{broadcastMessage.created.format("H:mm")}</Typography>
        </CardContent>
      </Card>
    </Grid>
  )
})

export default BroadcastMessageBox
