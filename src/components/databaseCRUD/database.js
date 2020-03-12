import { setDefaultValues } from "./defaultDatabase"
import { login, updateUserInfo, getUserId } from "../actions/actions"

var users = []
var comments = []
var posts = []
var postUserBookmark = []

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
  if (typeof document !== "undefined") {
    adjustHeader()
    setTimeout(() => {
      setBookmarks()
    }, 500)
  }
}

function setBookmarks() {
  let posts = document.getElementsByClassName("post")
  removeBookmarks(posts)
  if (login) {
    putUserBookmarks(posts)
  }
}

function removeBookmarks(posts) {
  for (let i = 0; i < posts.length; i++) {
    let bookmarkIcon = posts[i].children[3].children[0].children[0]
    bookmarkIcon.classList.remove("fa-bookmark")
    bookmarkIcon.classList.add("fa-bookmark-o")
  }
}

function putUserBookmarks(posts) {
  let userID = getUserId(loggedUser)
  for (let i = 0; i < posts.length; i++) {
    let postID = posts[i].getAttribute("id")
    let isBookmarked = false
    postUserBookmark.forEach(element => {
      if (element.postID == postID && element.userID == userID)
        isBookmarked = true
    })
    if (isBookmarked) {
      let bookmarkIcon = posts[i].children[3].children[0].children[0]
      bookmarkIcon.classList.remove("fa-bookmark-o")
      bookmarkIcon.classList.add("fa-bookmark")
    }
  }
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
    } else {
      if (login) {
        document.getElementById("user-icon").style.display = "block"
        document.getElementById("logRegButtons").style.display = "none"
        document.getElementById("searchBar").style.marginLeft = "0em"
        document.getElementById("content").style.gridTemplateColumns = "70% 30%"
        document.getElementById("loggedInProfile").style.display = "block"

        let userObject = users.find(user => user.fullname == loggedUser)
        if (typeof userObject !== "undefined") updateUserInfo(userObject)

        let postIcons = document.getElementsByClassName("postIcons")
        for (let i = 0; i < postIcons.length; i++)
          postIcons[i].style.display = "flex"

        let inputComments = document.getElementsByClassName("inputComment")
        for (let i = 0; i < inputComments.length; i++)
          inputComments[i].style.display = "flex"
      } else {
        document.getElementById("user-icon").style.display = "none"
        document.getElementById("logRegButtons").style.display = "flex"
        document.getElementById("searchBar").style.marginLeft = "10em"
        document.getElementById("content").style.gridTemplateColumns = "100%"
        document.getElementById("loggedInProfile").style.display = "none"
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

function updateBookmarksTable(object, action) {
  if (action === "add") {
    postUserBookmark.unshift(object)
  } else {
    let indexToDelete = -1
    postUserBookmark.forEach((element, iterator) => {
      if (element.postID == object.postID && element.userID == object.userID) {
        indexToDelete = iterator
      }
    })
    if (indexToDelete !== -1) postUserBookmark.splice(indexToDelete, 1)
  }
}

export {
  buildDatabase,
  users,
  comments,
  posts,
  postUserBookmark,
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
  updateBookmarksTable,
}
