import React from "react"
import { Link } from "react-router-dom"

const dashboard = () => {
  return (
    <div>
      <h1>hey there this is second page</h1>
      <button>
        <Link to="/Signin"> sign out</Link>
      </button>
    </div>
  )
}

export default dashboard
