import axios from "axios"

export default axios.create({
  baseURL:
    process.env.LEAFY_ISLAND_SERVER_BASE_URL || process.env.REACT_APP_LEAFY_ISLAND_SERVER_BASE_URL,
})
