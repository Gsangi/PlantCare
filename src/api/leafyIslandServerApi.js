import axios from "axios"

const {
  NODE_ENV,
  LEAFY_ISLAND_SERVER_BASE_URL,
  REACT_APP_LEAFY_ISLAND_SERVER_BASE_URL,
} = process.env

export default axios.create({
  baseURL:
    NODE_ENV === "dev" ? REACT_APP_LEAFY_ISLAND_SERVER_BASE_URL : LEAFY_ISLAND_SERVER_BASE_URL,
})
