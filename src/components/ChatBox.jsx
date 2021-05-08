import React, { useEffect, useRef, useState } from "react"
import moment from "moment"
import Paper from "@material-ui/core/Paper"
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon"
import Typography from "@material-ui/core/Typography"
import InputBase from "@material-ui/core/InputBase"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import Grid from "@material-ui/core/Grid"
import Divider from "@material-ui/core/Divider"
import { makeStyles } from "@material-ui/core/styles"
import SendIcon from "@material-ui/icons/Send"
import Avatar from "@material-ui/core/Avatar"
import MessageBox from "./MessageBox"
import Message from "../model/Message"

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.background.default,
  },
  chat: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.default,
    flex: "1 1 auto",
    minHeight: "0px",
    overflowY: "auto",
  },
  sendMessageBox: {
    display: "flex",
    padding: theme.spacing(0.5),
    alignItems: "center",
    margin: theme.spacing(1),
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
  title: {
    flexGrow: 1,
  },
}))

function ChatBox() {
  const classes = useStyles()

  const [messages, setMessages] = useState([])
  const [inputText, setInputText] = useState("")
  let newMessageRef = useRef()

  useEffect(() => {
    if (newMessageRef) newMessageRef.scrollIntoView({ behavior: "auto" })
  }, [messages])

  const handleSendMessage = (event) => {
    event.preventDefault()
    if (!inputText) return
    const date = moment()
    let msg = new Message(0, inputText, date, "me")
    console.log(msg)
    setInputText("")
    setMessages([...messages, msg])
  }

  const handleOpenEmoticons = () => {
    console.log("Open Emoticon!")
    const date = moment()
    let msg = new Message(0, "Sample User msg", date, "user")
    setMessages([...messages, msg])
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Avatar>U</Avatar>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            User
          </Typography>
        </Toolbar>
      </AppBar>
      <Paper elevation={0} square className={classes.chat} component={Grid} container>
        <Grid item container direction="column" justify="flex-end" wrap="nowrap">
          {[...messages].map((message, index) => (
            <MessageBox key={index} message={message} />
          ))}
          <div
            style={{ float: "left", clear: "both" }}
            ref={(el) => {
              newMessageRef = el
            }}
          />
        </Grid>
      </Paper>
      <Paper variant="outlined" component="form" className={classes.sendMessageBox}>
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
          multiline
          rowsMax={4}
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
    </div>
  )
}

export default ChatBox
