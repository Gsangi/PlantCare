import React, { useCallback, useEffect, useRef, useState } from "react"
import moment from "moment"
import clsx from "clsx"
import Paper from "@material-ui/core/Paper"
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon"
import Typography from "@material-ui/core/Typography"
import InputBase from "@material-ui/core/InputBase"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Grid from "@material-ui/core/Grid"
import Divider from "@material-ui/core/Divider"
import Avatar from "@material-ui/core/Avatar"
import Tooltip from "@material-ui/core/Tooltip"
import CircularProgress from "@material-ui/core/CircularProgress"
import { makeStyles } from "@material-ui/core/styles"
import SendIcon from "@material-ui/icons/Send"
import GetAppIcon from "@material-ui/icons/GetApp"
import ReplayIcon from "@material-ui/icons/Replay"
import MessageBox from "./MessageBox"
import { useMessages } from "../context/MessagesContext"
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
  const {
    user,
    messages,
    pageNumber,
    loading,
    error,
    hasMore,
    setPageNumber,
    sendMessage,
    getMessages,
  } = useMessages()
  const [inputText, setInputText] = useState("")
  let newMessageRef = useRef()
  let middleMessageRef = useRef()
  let observer = useRef()

  /**
   * OnHold for next update
   * @type {(function(*))|*}
   */
  // useEffect(() => {
  //   if (newMessageRef && user && pageNumber === 1)
  //     newMessageRef.scrollIntoView({ behavior: "auto" })
  //   // if (middleMessageRef && user && pageNumber !== 1)
  //   //   middleMessageRef.scrollIntoView({ behavior: "auto" })
  // }, [messages])

  let lastMessageRef = useCallback(
    (node) => {
      if (loading) return
      if (observer.current) {
        observer.current.disconnect()
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevValue) => prevValue + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, hasMore]
  )

  const handleSendMessage = (event) => {
    event.preventDefault()
    if (!inputText) return
    const date = moment()
    // let msg = new Message({0, "text", inputText, date, true, user.phone.toString(), null, "LOADING"})
    // setInputText("")
    // sendMessage(msg)
  }

  const handleOpenEmoticons = () => {
    console.log("Open Emoticon!")
    const date = moment()
  }

  const handleLoadOldChats = () => {
    getMessages(user.phone, pageNumber)
    setPageNumber((prevState) => prevState + 1)
  }

  const handleLoadMoreChats = () => {
    console.log(pageNumber)
    getMessages(user.phone, pageNumber)
    setPageNumber((prevState) => prevState + 1)
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
        <Grid item container direction="column-reverse" justify="flex-end" wrap="nowrap">
          <div
            style={{ float: "left", clear: "both" }}
            ref={(el) => {
              newMessageRef = el
            }}
          />
          {messages.map((message, index) => {
            let bool = index === messages.length - 1
            if (message.type === undefined) {
              return (
                <BroadcastMessageBox
                  ref={bool ? lastMessageRef : undefined}
                  broadcastMessage={message}
                  key={index}
                />
              )
            }
            if (typeof message.type !== "string") {
              return (
                <MessageStatusBox
                  ref={bool ? lastMessageRef : undefined}
                  chatStatus={message}
                  key={index}
                />
              )
            }
            return (
              <MessageBox ref={bool ? lastMessageRef : undefined} key={index} message={message} />
            )
          })}
          {loading && (
            <Grid item container justify="center" alignItems="center">
              <CircularProgress size={25} />
            </Grid>
          )}
          {error && (
            <Grid item container justify="center" alignItems="center">
              <IconButton>
                <ReplayIcon />
              </IconButton>
            </Grid>
          )}
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
