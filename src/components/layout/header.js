import React from "react"
import { navigate, Link } from "gatsby"
import {
  filterSearch,
  displayUserMenu,
  logOut,
  changeUsername,
  changePassword,
  changePicture,
  switchChangeDivs,
} from "../actions/actions"

const Header = () => {
  return (
    <div id="header">
      <Link to="/">
        <i id="headerLeaf" className="fa fa-leaf"></i>
      </Link>
      <SearchBar />
      <LogRegButtons />
      <i id="user-icon" className="fa fa-user-o" onClick={displayUserMenu}></i>
      <UserIconContent />
    </div>
  )
}

const SearchBar = () => {
  return (
    <div id="searchBar">
      <input
        type="text"
        placeholder="Search travels"
        onKeyUp={filterSearch}
      ></input>
    </div>
  )
}

const LogRegButtons = () => {
  return (
    <div id="logRegButtons">
      <button id="signUpButton" onClick={() => navigateToOtherPage("/signup")}>
        Sign up
      </button>
      <button id="loginButton" onClick={() => navigateToOtherPage("/login")}>
        Login
      </button>
    </div>
  )
}

const UserIconContent = () => {
  return (
    <div id="user-icon-content">
      <label onClick={changeUsername}>Change username</label>
      <hr style={{ color: "black", width: "90%" }} />
      <label onClick={changePassword}>Change password</label>
      <hr style={{ color: "black", width: "90%" }} />
      <label onClick={changePicture}>Change picture</label>
      <hr style={{ color: "black", width: "90%" }} />
      <label id="deleteAccount" onClick={deleteAccountErrorPrevention}>
        DELETE ACCOUNT
      </label>
      <hr style={{ color: "black", width: "90%" }} />
      <label onClick={logOut}>Log out</label>
    </div>
  )
}

function deleteAccountErrorPrevention() {
  document.getElementById("user-icon").click()
  document.getElementById("deleteAccountMessage").style.display = "block"
  switchChangeDivs("deleteAccount")
}

function navigateToOtherPage(page) {
  navigate(page)
}
export default Header
