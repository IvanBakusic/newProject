import React from "react"
import Layout from "../components/layout/layout"
import Post from "../components/indexComponents/post"
import { buildDatabase, posts } from "../components/databaseCRUD/database"
import LoggedInProfile from "../components/indexComponents/loggedInProfile"
import "../components/modules/index.css"
import {
  logOut,
  deleteUserAccount,
  switchChangeDivs,
  newUsername,
  newPassword,
  newPicture,
  newPost,
  minimizeUserContent,
} from "../components/actions/actions"
import { navigate } from "gatsby"

const mainPage = () => {
  return (
    <Layout>
      <div id="pageContent" onLoad={buildDatabase()}>
        <h1>Travel experience</h1>
        <NoPostsFound />
        <div id="content">
          <div id="posts">
            <NewPost />
            <NewPostForm />
            {posts.map(post => (
              <Post postObject={post} key={post.id} />
            ))}
          </div>
          <LoggedInProfile />
          <DeleteAccountMessage />
          <ChangeAccountData />
          <UserInfo />
        </div>
      </div>
    </Layout>
  )
}

const NewPost = () => {
  return (
    <div id="newPost" onClick={displayPostForm}>
      <label>Make a post</label>
      <i className="fa fa-plus"></i>
    </div>
  )
}

const NewPostForm = () => {
  return (
    <div id="newPostForm">
      <label>Make a post</label>
      <i className="fa fa-close" onClick={clearInputs} />
      <input
        id="newPostLocation"
        placeholder="Enter location"
        onKeyUp={clickSubmit}
      ></input>
      <input id="newPostPictureLocal" type="file"></input>
      <input
        id="newPostPictureUrl"
        placeholder="Picture url"
        onKeyUp={clickSubmit}
      ></input>
      <textarea
        id="newPostDescription"
        placeholder="Put some description"
        onKeyUp={clickSubmit}
      ></textarea>
      <button onClick={newPost}>Submit</button>
    </div>
  )
}

const NoPostsFound = () => {
  return <label id="noPostsFound">No posts found</label>
}

const DeleteAccountMessage = () => {
  return (
    <div id="deleteAccountMessage">
      <label>Do you really want to delete account?</label>
      <div className="deleteButtons">
        <button className="cancelButton" onClick={putDisplayNone}>
          Cancel
        </button>
        <button className="acceptButton" onClick={deleteAccount}>
          Accept
        </button>
      </div>
    </div>
  )
}

const ChangeAccountData = () => {
  return (
    <div id="changeAccountData">
      <i className="fa fa-close" onClick={() => switchChangeDivs("Exit")} />
      <div id="changeUsername">
        <label>Change username</label>
        <input placeholder="Enter new username" onKeyUp={clickSubmit}></input>
        <button onClick={newUsername}>Submit</button>
      </div>
      <div id="changePassword" style={{ display: "none" }}>
        <label>Change password</label>
        <input placeholder="Enter new password" onKeyUp={clickSubmit}></input>
        <button onClick={newPassword}>Submit</button>
      </div>
      <div id="changePicture">
        <label>Change picture</label>
        <input id="changePictureLocal" type="file"></input>
        <input
          id="changePictureUrl"
          placeholder="Picture url"
          onKeyUp={clickSubmit}
        ></input>
        <button onClick={newPicture}>Submit</button>
      </div>
    </div>
  )
}

const UserInfo = () => {
  return (
    <div id="userInfo">
      <i className="fa fa-close" onClick={hideUserInfo}></i>
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

function clickSubmit(e) {
  if (e.keyCode === 13) {
    let parent = e.target.parentElement
    parent.querySelector("button").click()
  }
}

function putDisplayNone() {
  document.getElementById("deleteAccountMessage").style.display = "none"
}

function deleteAccount() {
  navigate("/")
  putDisplayNone()
  minimizeUserContent()
  setTimeout(() => {
    deleteUserAccount()
    logOut()
  }, 100)
}

function clearInputs() {
  document.getElementById("newPostLocation").value = ""
  document.getElementById("newPostPictureLocal").value = ""
  document.getElementById("newPostPictureUrl").value = ""
  document.getElementById("newPostDescription").value = ""
  document.getElementById("newPostForm").style.display = "none"
}

function displayPostForm() {
  minimizeUserContent()
  document.getElementById("newPostForm").style.display = "flex"
}

function hideUserInfo() {
  document.getElementById("userInfo").style.display = "none"
}
export default mainPage
export { DeleteAccountMessage, LoggedInProfile, ChangeAccountData }
