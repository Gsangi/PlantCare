import React, { createContext, useEffect, useState } from "react"
import { io } from "socket.io-client"
import moment from "moment"
import leafyIslandServerApi from "../api/leafyIslandServerApi"
import Message from "../model/Message"

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
          let msg = new Message(
            message.id,
            message.text,
            moment.unix(message.timestamp / 1000),
            message.senderName,
            true
          )
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

  const getMessages = () => {
    return async (phone, pageNumber, pageSize = 50) => {
      let { data } = leafyIslandServerApi({
        method: "GET",
        url: `/wati/messages/${phone}`,
        params: {
          pageSize,
          pageNumber,
        },
      })
    }
  }

  const sendMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message])
  }

  const selectUser = (user) => {
    setUser(user)
  }

  const value = { user, messages, selectUser, sendMessage }

  return <Context.Provider value={value}>{children}</Context.Provider>
}
