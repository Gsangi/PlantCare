import React from "react"
import Signin from "./Components/Signin"
import dashboard from "./Components/dashboard.js"
import Chatbox from "./Components/Chatbox"
import "./Styles/app.scss"
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Chatbox />
    </div>
  )
}

export default App
