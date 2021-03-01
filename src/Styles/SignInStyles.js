import { makeStyles, createMuiTheme } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  wholepage: {
    display: "flex",
  },
  upperleft: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    position: "relative",
    height: "100vh",
  },
  imgs: {
    position: "absolute",
    left: "0",
    height: "50%",
  },
  up: { top: "0" },
  down: {
    bottom: "0",
    zIndex: 50,
  },
  upperright: {
    flex: 1,
    position: "relative",
  },
  uImgs: {
    position: "relative",
    right: "0",
    top: "0",
    bottom: "0",
    height: "100%",
  },
  middle: {
    zIndex: 100,
    flex: 2,
    alignSelf: "center",
    display: "flex",
    flexDirection: "column",
    padding: "0rem 25rem",
  },
  title: {
    textAlign: "center",
    padding: "1rem",
  },
  form: {
    display: "contents",
  },
  buttonProgress: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 555555555,
    margin: "auto",
  },
  alertDialog: {
    position: "absolute",
    marginTop: "3rem",
    left: 0,
    right: 0,
  },
}))

const theme = createMuiTheme({
  palette: {
    primary: { main: "#258c60" },
  },
})

const titleTheme = createMuiTheme({
  typography: {
    fontFamily: ["Poppins Bold"],
  },
})

export { useStyles, theme, titleTheme }
