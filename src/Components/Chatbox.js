import React, { useState } from "react"

function Chatbox() {
  const [message, setmessage] = useState("")

  //   const onclickhandler = () => {

  //   };

  const inputhandler = (event) => {
    const inputText = event.target.value
    setmessage(inputText)
  }

  return (
    <div>
      <ul>
        <li>
          <h2>{message}</h2>
        </li>
      </ul>
      <input type="text" name="" onChange={inputhandler} id="" />
      <button onClick={() => setmessage("")}>Submit</button>
    </div>
  )
}

export default Chatbox
