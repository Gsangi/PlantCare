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

  async function addUser(phone) {
    let { data: user } = await leafyIslandServerApi({
      method: "GET",
      url: `/customer/wati/user/${phone}`,
    })
    if (!user) {
      setNotfound(phone)
      return
    }
    setUsers((prevUsers) => [...prevUsers, user])
  }

  const value = { users, notFound, addUser }
  return <Context.Provider value={value}>{children}</Context.Provider>
}
