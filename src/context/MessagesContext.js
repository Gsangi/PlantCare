import React, { createContext, useEffect, useState } from "react"
import { io } from "socket.io-client"
import moment from "moment"
import leafyIslandServerApi from "../api/leafyIslandServerApi"
import Message from "../model/Message"
import BroadcastMessage from "../model/BroadcastMessage"

const socket = io(process.env.REACT_APP_LEAFY_ISLAND_SERVER_BASE_URL)

const Context = createContext()

export function useMessages() {
  return React.useContext(Context)
}

export const Provider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const setMsg = (message) => {
      if (user) {
        if (user.phone.toString() === message.waId.toString() && message.type === "text") {
          let msg = new Message(message)
          setMessages([...messages, msg])
          console.log(socket.id)
        }
      }
    }
    socket.on("receive:message", setMsg)
    return () => {
      socket.off("receive:message", setMsg)
    }
  })

  const getMessages = async (phone, pageNumber, pageSize = 100) => {
    let {
      data: {
        messages: { items },
      },
    } = await leafyIslandServerApi({
      method: "GET",
      url: `/wati/messages/${phone}`,
      params: {
        pageSize,
        pageNumber,
      },
    })
    let allMessagesArray = []
    for (let i = 99; i >= 0; i--) {
      try {
        let msg
        console.log(typeof items[i].type)
        if (typeof items[i].type !== "string") msg = new BroadcastMessage(items[i])
        else msg = new Message(items[i])
        allMessagesArray.push(msg)
      } catch (e) {
        console.log(e)
      }
    }
    setMessages([...messages, ...allMessagesArray])
  }

  const sendMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message])
  }

  const selectUser = (user) => {
    setUser(user)
    setMessages([])
  }

  const value = { user, messages, selectUser, sendMessage, getMessages }

  return <Context.Provider value={value}>{children}</Context.Provider>
}
