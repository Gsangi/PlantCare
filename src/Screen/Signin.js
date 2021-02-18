import React, { useContext, useEffect, useState } from "react"
import {
  Box,
  Button,
  Typography,
  TextField,
  CircularProgress,
  Tooltip,
} from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { ThemeProvider } from "@material-ui/core/styles"
import { Redirect } from "react-router-dom"
import { Context as AuthContext } from "../Context/AuthContext"
import "../Styles/_Signin.scss"
import { useStyles, theme, titleTheme } from "../Styles/SignInStyles"

const Signin = () => {
  const classes = useStyles()

  const { state, SignIn } = useContext(AuthContext)

  const [userName, setUserName] = useState("")
  const [pass, setPass] = useState("")
  const [emptyUsername, setEmptyUsername] = useState(false)
  const [emptyPass, setEmptyPass] = useState(false)
  const [signInProgress, setSignInProgress] = useState(false)

  useEffect(() => {
    if (state.code) {
      setSignInProgress(false)
      console.log("in UseEffect")
    }
  }, [state])

  const passHandler = (e) => {
    e.preventDefault()
    setPass(e.target.value)
  }

  const emailHandler = (e) => {
    e.preventDefault()
    setUserName(e.target.value)
  }

  const formSubmit = (e) => {
    e.preventDefault()
    console.log("Clicked")
    setEmptyPass(false)
    setEmptyUsername(false)
    if (userName.length > 0 && pass.length > 0) {
      setSignInProgress(true)
      SignIn(userName, pass)
    } else if (userName.length > 0) {
      setEmptyPass(true)
    } else if (pass.length > 0) {
      setEmptyUsername(true)
    } else {
      setEmptyPass(true)
      setEmptyUsername(true)
    }
  }

  return (
    <Box display="flex">
      {state.idToken && <Redirect to="/" />}
      <ThemeProvider theme={theme}>
        <Box display="flex" className="upperleft section">
          <img className="up" src="./img/Path 65.png" alt="" />
          <img
            className="down"
            src="./img/animatedsignin.svg"
            alt=""
          />
        </Box>
        <Box className="middle section" color="text.primary">
          <ThemeProvider theme={titleTheme}>
            <Typography variant="h4" className={classes.title}>
              Leafy Island
            </Typography>
          </ThemeProvider>
          {emptyUsername ? (
            <TextField
              error
              autoFocus
              label="Username"
              defaultValue={userName}
              variant="outlined"
              onChange={emailHandler}
            />
          ) : (
            <TextField
              autoFocus
              label="Username"
              variant="outlined"
              onChange={emailHandler}
            />
          )}
          <br />
          {emptyPass ? (
            <TextField
              error
              type="password"
              label="Password"
              defaultValue={pass}
              variant="outlined"
              onChange={passHandler}
            />
          ) : (
            <TextField
              type="password"
              label="Password"
              variant="outlined"
              onChange={passHandler}
            />
          )}
          <br />
          <Tooltip
            title="Sign In"
            placement="left"
            enterDelay={4000}
            // leaveDelay={200}
          >
            <ThemeProvider theme={theme}>
              <Box
                display="flex"
                flexDirection="column"
                position="relative"
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={formSubmit}
                  disabled={signInProgress}
                  // onSubmit={formSubmit}
                >
                  Sign in
                </Button>
                {signInProgress && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
                {state.code && (
                  <Alert
                    severity="error"
                    variant="standard"
                    className={classes.alertDialog}
                  >
                    Incorrect Username or Password
                  </Alert>
                )}
              </Box>
            </ThemeProvider>
          </Tooltip>
        </Box>
        <div className="upperright section">
          <img src="./img/Path 41.png" alt="" />
        </div>
      </ThemeProvider>
    </Box>
  )
}

export default Signin
