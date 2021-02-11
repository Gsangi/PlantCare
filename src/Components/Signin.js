import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Link, useParams } from "react-router-dom";

const Signin = () => {
  let { home } = useParams();
  return (
    <div className="wholepage">
      <div className="upperleft section">
        <img className="up" src="./img/Path 65.png" alt="" />
        <img className="down" src="./img/undraw_plans_y8ru.svg" alt="" />
      </div>

      <div className="middle section">
        <h1>Leafy Island</h1>
        <TextField label="Email *" variant="outlined" />
        <br />
        <TextField label="Password *" variant="outlined" />
        <br />
        <Button variant="contained" color="primary">
          Sign up{home}
        </Button>
      </div>

      <div className="upperright section">
        <img src="./img/Path 41.png" alt="" />
      </div>
    </div>
  );
};

export default Signin;
