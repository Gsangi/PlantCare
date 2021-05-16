import React, { createContext, useEffect, useState } from "react"
import { io } from "socket.io-client"
import moment from "moment"
import leafyIslandServerApi from "../api/leafyIslandServerApi"
import Message from "../model/Message"
import BroadcastMessage from "../model/BroadcastMessage"

const socket = io("http://localhost:5000")

socket.on("connect", () => {
  console.log("Connected to socket.io server instance id:", socket.id)
})

const Context = createContext()

export function useMessages() {
  return React.useContext(Context)
}

export const Provider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [messages, setMessages] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setMessages([])
  }, [user])

  useEffect(() => {
    if (!user) return
    setLoading(true)
    setError(false)
    getMessages(user.phone, pageNumber)
      .then((arr) => {
        setMessages((prevState) => [...prevState, ...arr])
        setHasMore(arr.length > 0)
        setLoading(false)
      })
      .catch((e) => {
        setError(true)
      })
  }, [user, pageNumber])

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
      url: `/api/wati/message/${phone}`,
      params: {
        pageSize,
        pageNumber,
      },
    })
    let allMessagesArray = []
    for (let item of items) {
      try {
        let msg
        if (typeof item.type !== "string") msg = new BroadcastMessage(item)
        else msg = new Message(item)
        allMessagesArray.push(msg)
      } catch (e) {
        console.log(e)
      }
    }
    return allMessagesArray
  }

  const sendMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message])
  }

  const value = {
    user,
    messages,
    loading,
    error,
    pageNumber,
    hasMore,
    setUser,
    setPageNumber,
    sendMessage,
    getMessages,
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}
