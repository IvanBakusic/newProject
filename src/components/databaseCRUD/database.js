import { setDefaultValues } from "./defaultDatabase"
import { login } from "../actions/actions"

var users = []
var comments = []
var posts = []

var lastPostId = -1
var lastUserId = -1
//var lastCommentId => if there's gonna be delete option for comments
var loggedUser = null

//Used to determine if it's first time loading
var firstCall = true

function buildDatabase() {
  if (firstCall === true) {
    setDefaultValues(users, comments, posts)
    firstCall = false
    setLastIds()
  }
  if (typeof document !== "undefined") adjustHeader()
}

function adjustHeader() {
  setTimeout(() => {
    let header = document.getElementById("header")
    let pageContent = document.getElementById("pageContent")
    if (window.innerWidth <= 830) {
      if (login) {
        header.style.display = "flex"
        pageContent.style.marginTop = "2em"
      } else {
        pageContent.style.marginTop = "4.5em"
        header.style.display = "grid"
      }
    }
  }, 0)
}

function setLastIds() {
  lastPostId = posts[0].id
  lastUserId = users[0].id
}

function deletePost(postID) {
  let indexToDelete = -1
  posts.forEach((post, iterator) => {
    if (post.id == postID) indexToDelete = iterator
  })

  if (indexToDelete > -1) {
    posts.splice(indexToDelete, 1)
    document.getElementById("headerLeaf").click()
  }
}

function addUserToDatabase(user) {
  users.unshift(user)
  lastUserId += 1
}

function addCommentToDatabase(comment) {
  comments.unshift(comment)
}

function updateLoggedUser(username) {
  loggedUser = username
}

function putNewUsername(newUsername) {
  let usersIndex = -1
  users.forEach((user, iterator) => {
    if (user.fullname == loggedUser) usersIndex = iterator
  })
  users[usersIndex].fullname = newUsername
  return users[usersIndex]
}

function putNewPassword(newPassword) {
  let usersIndex = -1
  users.forEach((user, iterator) => {
    if (user.fullname == loggedUser) usersIndex = iterator
  })
  users[usersIndex].password = newPassword
}

function putNewPicture(newPicture) {
  let usersIndex = -1
  users.forEach((user, iterator) => {
    if (user.fullname == loggedUser) usersIndex = iterator
  })
  users[usersIndex].picture = newPicture
  return users[usersIndex]
}

function updateUserLikes(offset) {
  let usersIndex = -1
  users.forEach((user, iterator) => {
    if (user.fullname == loggedUser) usersIndex = iterator
  })
  users[usersIndex].likes += offset
}

function updateUserComments(offset) {
  let usersIndex = -1
  users.forEach((user, iterator) => {
    if (user.fullname == loggedUser) usersIndex = iterator
  })
  users[usersIndex].comments += offset
}

function updateUserBookmarks(offset) {
  let usersIndex = -1
  users.forEach((user, iterator) => {
    if (user.fullname == loggedUser) usersIndex = iterator
  })
  users[usersIndex].bookmarks += offset
}

function updatePostLikes(offset, postID) {
  let postIndex = -1
  posts.forEach((post, iterator) => {
    if (post.id == postID) postIndex = iterator
  })
  posts[postIndex].numberOfLikes += offset
}

function addNewPost(newPost) {
  posts.unshift(newPost)
  lastPostId += 1
}

export {
  buildDatabase,
  users,
  comments,
  posts,
  loggedUser,
  deletePost,
  addUserToDatabase,
  addCommentToDatabase,
  updateLoggedUser,
  putNewUsername,
  putNewPassword,
  putNewPicture,
  updateUserLikes,
  updateUserComments,
  updateUserBookmarks,
  updatePostLikes,
  addNewPost,
  lastPostId,
  lastUserId,
}
