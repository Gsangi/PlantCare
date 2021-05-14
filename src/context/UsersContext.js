import leafyIslandServerApi from "../api/leafyIslandServerApi"
import { createContext, useContext, useState } from "react"
import useLocalStorage from "../hooks/useLocalStorage"

const Context = createContext()

export function useUsers() {
  return useContext(Context)
}

export function Provider({ children }) {
  const [users, setUsers] = useLocalStorage("users", [])
  const [notFound, setNotfound] = useState(NaN)
  const [alreadyPresentUser, setAlreadyPresentUser] = useState(NaN)

  async function addUser(phone) {
    for (let u in users)
      if (users.hasOwnProperty(u))
        if (users[u].phone.toString() === `91${phone}`) {
          setAlreadyPresentUser(Number(u))
          return
        }
    let { data: user } = await leafyIslandServerApi({
      method: "GET",
      url: `/customer/wati/user/${phone}`,
    })
    if (!user) {
      setNotfound(phone)
      return
    }
    setNotfound(NaN)
    setAlreadyPresentUser(NaN)
    setUsers((prevUsers) => [...prevUsers, user])
  }

  const value = { users, notFound, alreadyPresentUser, addUser }
  return <Context.Provider value={value}>{children}</Context.Provider>
}
