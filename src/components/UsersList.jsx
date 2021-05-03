import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import Avatar from "@material-ui/core/Avatar"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "30%",
  },
}))

export default function UsersList() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {/*<List>*/}
      {/*  {Array(20).map((e) => (*/}
      {/*    <ListItem button key={e}>*/}
      {/*      <ListItemIcon>*/}
      {/*        <Avatar />*/}
      {/*      </ListItemIcon>*/}
      {/*    </ListItem>*/}
      {/*  ))}*/}
      {/*</List>*/}
      HOla ka sapola
    </div>
  )
}
