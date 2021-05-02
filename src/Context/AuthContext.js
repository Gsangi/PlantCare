import CreateContext from "./Context"
import { SignInAuth, SignOutAuth } from "../Modules/AwsCogitoAuth"

const reducer = (state, action) => {
  switch (action.type) {
    case "sign-in": {
      return {
        ...action.payload,
        username: action.payload.idToken.payload.email,
      }
    }
    case "sign-out": {
      let d = { ...state }
      delete d.idToken
      return d
    }
    case "error": {
      return {
        code: action.payload.code,
        username: action.payload.username,
      }
    }
  }
}

const SignIn = (dispatch) => async (username, password) => {
  try {
    let d = await SignInAuth(username, password)
    dispatch({
      type: "sign-in",
      payload: {
        idToken: d.idToken,
      },
    })
  } catch (e) {
    console.log(e)
    dispatch({
      type: "error",
      payload: { code: e.code, username },
    })
  }
}

const SignOut = (dispatch) => (username) => {
  SignOutAuth(username)
  dispatch({
    type: "sign-out",
    payload: [username],
  })
}

export const { Context, Provider } = CreateContext(
  reducer,
  { SignIn, SignOut },
  {}
)
