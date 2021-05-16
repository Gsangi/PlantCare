import React from "react"
import Grid from "@material-ui/core/Grid"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1, 0),
  },
  card: {
    backgroundColor: "#ecfeff",
  },
}))

const MessageStatusBox = React.forwardRef(({ chatStatus }, ref) => {
  const classes = useStyles()

  return (
    <Grid item container justify="center" alignItems="center" className={classes.root} ref={ref}>
      <Card elevation={0} className={classes.card}>
        <CardContent>
          <Typography>{chatStatus.eventDescription}</Typography>
          <Typography variant="caption">{chatStatus.created.format("H:mm")}</Typography>
        </CardContent>
      </Card>
    </Grid>
  )
})

export default MessageStatusBox
