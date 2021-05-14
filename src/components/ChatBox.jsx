import React, { useCallback, useEffect, useRef, useState } from "react"
import moment from "moment"
import Paper from "@material-ui/core/Paper"
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon"
import Typography from "@material-ui/core/Typography"
import InputBase from "@material-ui/core/InputBase"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Grid from "@material-ui/core/Grid"
import Divider from "@material-ui/core/Divider"
import TextareaAutosize from "@material-ui/core/TextareaAutosize"
import { makeStyles } from "@material-ui/core/styles"
import SendIcon from "@material-ui/icons/Send"
import GetAppIcon from "@material-ui/icons/GetApp"
import Avatar from "@material-ui/core/Avatar"
import MessageBox from "./MessageBox"
import Message from "../model/Message"
import { useMessages } from "../context/MessagesContext"
import clsx from "clsx"
import Button from "@material-ui/core/Button"
import { Tooltip } from "@material-ui/core"
import MessageStatusBox from "./MessageStatusBox"
import BroadcastMessageBox from "./BroadcastMessageBox"

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.background.default,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: 0,
  },
  rootShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: (props) => props.width,
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
    whiteSpace: "pre-wrap",
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  userName: {
    flexGrow: 1,
  },
}))

function ChatBox({ showInfo, onShowInfo, width }) {
  const classes = useStyles({ width })
  const { user, messages, sendMessage, getMessages } = useMessages()
  const [inputText, setInputText] = useState("")
  let newMessageRef = useRef()

  useEffect(() => {
    if (newMessageRef && user) newMessageRef.scrollIntoView({ behavior: "auto" })
  }, [messages])

  const lastMessageRef = useCallback((node) => {})

  const handleSendMessage = (event) => {
    event.preventDefault()
    if (!inputText) return
    const date = moment()
    let msg = new Message(0, "text", inputText, date, true, user.phone.toString(), null, "LOADING")
    setInputText("")
    sendMessage(msg)
  }

  const handleOpenEmoticons = () => {
    console.log("Open Emoticon!")
    const date = moment()
  }

  const handleLoadOldChats = () => {
    getMessages(user.phone, 1)
  }

  if (!user) return <div className={classes.root} />

  return (
    <div
      className={clsx(classes.root, {
        [classes.rootShift]: showInfo,
      })}
    >
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={onShowInfo}>
            <Avatar>{user.name[0]}</Avatar>
          </IconButton>
          <Typography variant="h6" className={classes.userName}>
            {user.name}
          </Typography>
          <Tooltip title={"Load old chat"}>
            <IconButton color="inherit" onClick={handleLoadOldChats}>
              <GetAppIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Paper elevation={0} square className={classes.chat} component={Grid} container>
        <Grid item container direction="column" justify="flex-end" wrap="nowrap">
          {messages.map((message, index) => {
            if (message.type === undefined) {
              return <BroadcastMessageBox broadcastMessage={message} key={index} />
            }
            if (typeof message.type !== "string") {
              return <MessageStatusBox chatStatus={message} key={index} />
            }
            if (messages.length === index - 1) {
              return <MessageBox ref={lastMessageRef} key={index} message={message} />
            } else {
              return <MessageBox key={index} message={message} />
            }
          })}
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
            console.log(v.target)
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
