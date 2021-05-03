import React, { useState } from "react"
import Paper from "@material-ui/core/Paper"
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import InputBase from "@material-ui/core/InputBase"
import Grid from "@material-ui/core/Grid"
import Divider from "@material-ui/core/Divider"
import { makeStyles } from "@material-ui/core/styles"
import SendIcon from "@material-ui/icons/Send"

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    height: 600,
    backgroundColor: "#dfdfdf"
  },
  messageMe: {
    backgroundColor: "white",
    padding: theme.spacing(1),
    margin: theme.spacing(1)
  },
  messageSender: {
    backgroundColor: "#FCEF87",
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    marginRight: "50px"
  },
  sendMessageBox: {
    display: "flex",
    alignItems: "center",
    alignSelf: "flex-end",
    width: "100%"
  },
  messageContainer: {
    backgroundColor: "inherit"
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  }
}))

class Message {
  constructor(msg, time, me) {
    this.msg = msg
    this.time = time
    this.me = me
  }
}

function ChatBox() {
  const classes = useStyles()

  const [messages, setMessages] = useState([])
  const [inputText, setInputText] = useState("")

  const handleSendMessage = (event) => {
    event.preventDefault()
    if (!inputText) return
    console.log(inputText)
    const date = new Date()
    let msg = new Message(inputText, date, true)
    setInputText("")
    setMessages([...messages, msg])
  }

  const handleOpenEmoticons = () => {
    console.log("Open Emoticon!")
  }

  return (
    <Paper
      className={classes.root}
      component={Grid}
      container
      direction="column"
      justify="space-between"
    >
      <Grid
        item
        container
        direction="column"
        component={Paper}
        elevation={0}
        className={classes.messageContainer}
      >
        {[...messages].map((m) =>
          m.me ? (
            <Grid item container justify="flex-end">
              <Paper elevation={0} className={classes.messageMe}>
                <Typography>{m.msg}</Typography>
              </Paper>
            </Grid>
          ) : (
            <Grid item container justify="flex-end">
              <Paper elevation={0} className={classes.messageSender}>
                <Typography>{m.msg}</Typography>
              </Paper>
            </Grid>
          )
        )}
      </Grid>
      <Grid item>
        <Paper component="form" className={classes.sendMessageBox}>
          <IconButton
            color="primary"
            type="button"
            className={classes.iconButton}
            onClick={handleOpenEmoticons}
          >
            <InsertEmoticonIcon />
          </IconButton>
          <Divider className={classes.divider} orientation="vertical" />
          <InputBase
            className={classes.input}
            placeholder="Send Message"
            inputProps={{ "aria-label": "send message" }}
            value={inputText}
            onChange={(v) => {
              setInputText(v.target.value)
            }}
          />
          <Divider className={classes.divider} orientation="vertical" />
          <IconButton
            color="primary"
            className={classes.iconButton}
            onClick={handleSendMessage}
            type="submit"
          >
            <SendIcon />
          </IconButton>
        </Paper>
      </Grid>
    </Paper>
  )
}

export default ChatBox
