import React, { useContext } from "react"
import Signin from "./Screen/Signin"
import Home from "./Screen/Home"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom"
import {
  Context as AuthContext,
  Provider as AuthProvider,
} from "./Context/AuthContext"
import ChatBox from "./Components/ChatBox"

export default function App() {
  return (
    <AuthProvider>
      <ChatBox />
      {/*<Router>*/}
      {/*  <Switch>*/}
      {/*    <Route exact path="/">*/}
      {/*      {state.idToken ? <Home /> : <Redirect to="/signin" />}*/}
      {/*    </Route>*/}
      {/*    <Route path="/signin">*/}
      {/*      <Signin />*/}
      {/*    </Route>*/}
      {/*  </Switch>*/}
      {/*</Router>*/}
    </AuthProvider>
  )
}
