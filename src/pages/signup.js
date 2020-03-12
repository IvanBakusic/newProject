import React from "react"
import { navigate } from "gatsby"
import Layout from "../components/layout/layout"
import "../components/modules/logReg.css"
import {
  signupSubmit,
  removeTakenUsername,
  clearPictureWarning,
} from "../components/actions/actions"

const SignUp = () => {
  return (
    <Layout>
      <div
        id="pageContent"
        style={{ height: "120vh" }}
        onLoad={removeSearchBar()}
      >
        <h1>Sign up</h1>
        <SignupInputs />
        <button className="homeButton" onClick={() => navigate("/")}>
          Home feed
        </button>
      </div>
    </Layout>
  )
}

const SignupInputs = () => {
  return (
    <div className="logRegDiv">
      <label id="takenUsername">Username is taken!</label>
      <label id="failPasswords">Passwords do not match!</label>
      <input
        id="signupUsername"
        placeholder="Enter username"
        onClick={removeTakenUsername}
        onKeyUp={enter}
      ></input>
      <input
        id="signupPassword1"
        placeholder="Enter password"
        type="password"
        onClick={removeTakenUsername}
        onKeyUp={enter}
      ></input>
      <input
        id="signupPassword2"
        placeholder="Repeat password"
        type="password"
        onClick={removeTakenUsername}
        onKeyUp={enter}
      ></input>
      <input
        id="signupPicture"
        type="file"
        onClick={clearPictureWarning}
      ></input>
      <label id="signupServerPicture">
        If you're not accessing page locally, put picture's link :)
      </label>
      <input
        id="notServerPicture"
        placeholder="Picture link"
        onKeyUp={enter}
        onClick={clearPictureWarning}
      ></input>
      <button id="signupSubmit" onClick={signupSubmit}>
        Submit
      </button>
      <label id="needPicture">Put some image :)</label>
    </div>
  )
}

function enter(e) {
  if (e.keyCode === 13) document.getElementById("signupSubmit").click()
}

function removeSearchBar() {
  setTimeout(() => {
    document.getElementById("searchBar").style.display = "none"
  }, 100)
}

export default SignUp
