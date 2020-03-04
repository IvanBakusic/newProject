import React from "react"
import "../indexComponents/loggedInProfile.css"

const LoggedInProfile = () => {
  //<button id="logOutContent">Log out</button> ovo stavit u dropdown menu user-icon-a
  return (
    <div id="loggedInProfile">
      <BasicInfo />
      <Partaking />
    </div>
  )
}

const BasicInfo = () => {
  return (
    <div className="postUser">
      <div className="postUserImage">
        <img src="https://i.ibb.co/vstpXcb/Barbossa.jpg" alt="profile.jpg" />
      </div>
      <label className="postUsernameInfo"></label>
    </div>
  )
}

const Partaking = () => {
  return (
    <span id="partaking">
      <label id="userLikes">Likes: 1234</label>
      <label id="userComments">Comments: 123123</label>
      <label id="userBookmarks">Bookmarks: 123</label>
    </span>
  )
}

export default LoggedInProfile
