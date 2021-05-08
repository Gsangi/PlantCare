import CreateContext from "./Context"
import leafyIslandServerApi from "../api/leafyIslandServerApi"

function usersReducer(state, { type, payload }) {
  switch (type) {
    case "ADD_USER": {
      return { notFound: NaN, users: [...state.users, payload] }
    }
    case "USER_NOT_FOUND": {
      return { notFound: payload, users: [...state.users] }
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
      if (!user) {
        dispatch({
          type: "USER_NOT_FOUND",
          payload: phone,
        })
        return
      }
      dispatch({
        type: "ADD_USER",
        payload: user,
      })
    } catch (e) {
      console.error(e)
    }
  }
}

export const { Context, Provider } = CreateContext(
  usersReducer,
  { addUser },
  { notFound: NaN, users: [] }
)
