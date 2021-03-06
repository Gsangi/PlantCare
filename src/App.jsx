import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core"
import { Provider as AuthProvider } from "./context/AuthContext"
import { Provider as UserProvider } from "./context/UsersContext"
import { Provider as MessageProvider } from "./context/MessagesContext"
import PrivateRoute from "./routes/PrivateRoute"
import Home from "./screen/Home"

const theme = createMuiTheme({
  typography: {
    h1: {
      fontFamily: ["Poppins"],
    },
    h2: {
      fontFamily: ["Poppins"],
    },
    h3: {
      fontFamily: ["Poppins"],
    },
    h4: {
      fontFamily: ["Poppins"],
    },
  },
  palette: {
    primary: { main: "#258c60" },
    secondary: { main: "#3D92A6" },
  },
})

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <MessageProvider>
            <CssBaseline />
            <ThemeProvider theme={theme}>
              <PrivateRoute exact path="/" component={Home} />
            </ThemeProvider>
          </MessageProvider>
        </UserProvider>
      </AuthProvider>
    </Router>
  )
}
