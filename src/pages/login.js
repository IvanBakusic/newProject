import React from "react"
import { navigate } from "gatsby"
import Layout from "../components/layout/layout"
import { loginSubmit, removeWarning } from "../components/actions/actions"

const Login = () => {
  return (
    <Layout>
      <div
        id="pageContent"
        style={{ height: "100vh" }}
        onLoad={removeSearchBar()}
      >
        <h1>Login</h1>
        <LoginInputs />
        <button className="homeButton" onClick={() => navigate("/")}>
          Home feed
        </button>
      </div>
    </Layout>
  )
}

const LoginInputs = () => {
  return (
    <div className="logRegDiv">
      <label id="failLogin">Wrong username or password!</label>
      <input
        id="loginUsername"
        placeholder="Enter username"
        onClick={removeWarning}
        onKeyUp={enter}
      ></input>
      <input
        id="loginPassword"
        placeholder="Enter password"
        type="password"
        onClick={removeWarning}
        onKeyUp={enter}
      ></input>
      <button id="loginSubmit" onClick={loginSubmit}>
        Submit
      </button>
    </div>
  )
}

function enter(e) {
  if (e.keyCode === 13) document.getElementById("loginSubmit").click()
}

function removeSearchBar() {
  setTimeout(() => {
    document.getElementById("searchBar").style.display = "none"
  }, 100)
}

export default Login
