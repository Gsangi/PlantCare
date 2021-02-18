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

console.log("App.js")

function App() {
  const { state } = useContext(AuthContext)
  console.log("App.js: ", state)
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {state.idToken ? <Home /> : <Redirect to="/signin" />}
        </Route>
        <Route path="/signin">
          <Signin />
        </Route>
      </Switch>
    </Router>
  )
}

// eslint-disable-next-line react/display-name
export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
)
