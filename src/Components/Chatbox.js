/* eslint-disable react/jsx-key */
import React, { useState } from "react"
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import InputBase from "@material-ui/core/InputBase"
import Divider from "@material-ui/core/Divider"
import { makeStyles } from "@material-ui/core/styles"
import SendIcon from "@material-ui/icons/Send"

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "30px 80px",
    padding: "10px 8px",
    display: "flex",
    width: 400,
    height: 600,
    backgroundColor: "#dfdfdf",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  messagesList: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "inherit",
  },
  messageMe: {
    backgroundColor: "white",
    padding: "10px",
    margin: "10px",
    marginLeft: "50px",
  },
  messageSender: {
    backgroundColor: "#FCEF87",
    padding: "10px",
    margin: "10px",
    marginRight: "50px",
  },
  sendMessageBox: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    alignSelf: "flex-end",
    width: "100%",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}))

class Message {
  constructor(msg, time, me) {
    this.msg = msg
    this.time = time
    this.me = me
  }
}

function Chatbox() {
  const classes = useStyles()

  const [messages, setMessages] = useState([])
  const [inputText, setInputText] = useState("")

  const inputhandler = (event) => {
    if (inputText == "") {
      return
    }
    event.preventDefault()
    console.log(inputText)
    const date = new Date()
    let msg = new Message(inputText, date, true)
    setInputText("")
    setMessages([...messages, msg])
  }
  const senderSim = () => {
    const date = new Date()
    let msg = new Message("Hey I'm SEDSEX", date, false)
    setMessages([...messages, msg])
  }

  return (
    <Paper className={classes.root}>
      <Paper elevation={0} className={classes.messagesList}>
        {[...messages].map((m) =>
          m.me ? (
            <Paper elevation={0} className={classes.messageMe}>
              <Typography>{m.msg}</Typography>
            </Paper>
          ) : (
            <Paper elevation={0} className={classes.messageSender}>
              <Typography>{m.msg}</Typography>
            </Paper>
          )
        )}
      </Paper>
      <Paper component="form" className={classes.sendMessageBox}>
        <Button
          variant="contained"
          color="primary"
          onClick={senderSim}
        >
          Sender
        </Button>
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
          aria-label="directions"
          onClick={inputhandler}
          type="submit"
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </Paper>
  )
}

export default Chatbox
