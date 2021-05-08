import CreateContext from "./Context"
import leafyIslandServerApi from "../api/leafyIslandServerApi"

function usersReducer(state, action) {
  switch (action.type) {
    case "ADD_USER": {
      return [...state, action.payload]
    }
  }
}

function addUser(dispatch) {
  return async (phone) => {
    try {
      let { data: user } = await leafyIslandServerApi({
        method: "GET",
        url: `/customer/wati/user/${phone}`,
      })
      dispatch({
        type: "ADD_USER",
        payload: user,
      })
    } catch (e) {
      console.error(e)
    }
  }
}

export const { Context, Provider } = CreateContext(usersReducer, [addUser], [])
