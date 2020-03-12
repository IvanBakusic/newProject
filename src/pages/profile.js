import React from "react"
import { navigate, Link } from "gatsby"
import Layout from "../components/layout/layout"
import "../components/modules/profile.css"
import { profileCheckHeader, setProfile } from "../components/actions/actions"
import { DeleteAccountMessage, ChangeAccountData } from "."
import LoggedInProfile from "../components/indexComponents/loggedInProfile"
import { posts, postUserBookmark } from "../components/databaseCRUD/database"

const Profile = () => {
  return (
    <Layout>
      <div id="pageContent" onLoad={adjustProfile()}>
        <h1>Profilno ime</h1>
        <button className="homeButton" onClick={() => navigate("/")}>
          Home feed
        </button>
        <BasicProfileInfo />
        <Bookmarks />
      </div>
      <LoggedInProfile />
      <DeleteAccountMessage />
      <ChangeAccountData />
    </Layout>
  )
}

const BasicProfileInfo = () => {
  return (
    <div id="basicProfileInfo">
      <label id="userInfoUsername"></label>
      <div id="userInfoGrid">
        <i className="fa fa-bookmark-o" style={{ color: "blue" }}></i>
        <i className="fa fa-comment-o" style={{ color: "green" }}></i>
        <i className="fa fa-heart-o" style={{ color: "red" }}></i>
        <label></label>
        <label></label>
        <label></label>
      </div>
    </div>
  )
}

const Bookmarks = () => {
  /*<div id="bookmarksDiv">
        <h1>Bookmarks</h1>
        <h2>This user hasn't bookmarked any post.</h2>
      </div>*/
  return (
    <div id="bookmarksDiv">
      <h1>Bookmarks</h1>
      <div id="userBookmarks">
        {/*ove ID-eve ne hardkodirat*/}
        <Link to="/#2">test</Link>
        <Link to="/#1">tesasdsadast</Link>
        <Link to="/#0">test</Link>
      </div>
    </div>
  )
}

function adjustProfile() {
  if (typeof document !== "undefined") {
    setTimeout(() => {
      document.getElementById("searchBar").style.display = "none"
      profileCheckHeader()
      setProfile()
    }, 10)
  }
}

export default Profile

/*

stranica profila

slika imena, bookmarks --> popis na profilu na koje moze kliknit --> nova relacija
--> klikne i ode na index page na taj post

za sifre stavit type="password"





*/
