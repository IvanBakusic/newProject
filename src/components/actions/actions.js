import { navigate } from "gatsby"
import {
  users,
  comments,
  posts,
  deletePost,
  addUserToDatabase,
  addCommentToDatabase,
  updateLoggedUser,
  loggedUser,
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
} from "../databaseCRUD/database"

import nwtPicture from "../../images/backgroundNatureNWT.jpg"
import denisPicture from "../../images/djDenis1.png"
import risitas from "../../images/risitas.jpg"

var login = false

function filterSearch() {
  let atLeastOne = false
  let searchContent = document
    .querySelector("#searchBar input")
    .value.trim()
    .toLowerCase()
  let allposts = document.getElementsByClassName("post")
  for (let i = 0; i < allposts.length; i++) {
    let destination = allposts[i]
      .querySelector(".postLocation")
      .innerText.trim()
      .toLowerCase()
    if (destination.includes(searchContent)) {
      atLeastOne = true
      allposts[i].style.display = "block"
    } else allposts[i].style.display = "none"
  }
  displayNoFilteredPostsMessage(atLeastOne)
}

function displayNoFilteredPostsMessage(atLeastOne) {
  if (!atLeastOne) {
    document.getElementById("pageContent").style.height = "100vh"
    document.getElementById("noPostsFound").style.display = "inline"
  } else {
    document.getElementById("pageContent").style.height = "auto"
    document.getElementById("noPostsFound").style.display = "none"
  }
}

function displayUserMenu() {
  let userIcon = document.getElementById("user-icon")
  let userMenu = document.getElementById("user-icon-content")
  let displayStyle = getComputedStyle(userMenu, null).display
  if (displayStyle === "none") {
    userMenu.style.display = "flex"
    userIcon.classList.remove("fa-user-o")
    userIcon.classList.add("fa-user")
  } else if (displayStyle === "flex") {
    userMenu.style.display = "none"
    userIcon.classList.remove("fa-user")
    userIcon.classList.add("fa-user-o")
  }
}

function signupSubmit(e) {
  let user
  if (checkSignupFields(e)) {
    let picture = selectPicture()
    if (picture) {
      user = addNewUser(picture, e)
      login = true
      updateElements(user)
    } else {
      return
    }
  }
}

function addNewUser(picture, e) {
  let id = lastUserId
  if (id) {
    let parent = e.target.parentElement
    let user = {
      id: id + 1,
      fullname: parent.children[2].value.trim(),
      picture: picture,
      password: parent.children[3].value.trim(),
      likes: 0,
      comments: 0,
      bookmarks: 0,
    }
    addUserToDatabase(user)
    return user
  } else return
}

function getLastId(entity) {
  switch (entity) {
    case "user":
      return users[0].id
    case "comment":
      return comments[0].id
    case "post":
      return posts[0].id
    default:
      return null
  }
}

function selectPicture() {
  let rawPicture = document.getElementById("signupPicture").value
  rawPicture = rawPicture.replace(/C:\\fakepath\\/, "")
  let linkPictureElement = document.getElementById("notServerPicture")
  if (rawPicture === "" && linkPictureElement.value.trim() === "") {
    linkPictureElement.value = ""
    linkPictureElement.style.backgroundColor = "red"
    document.getElementById("signupPicture").style.backgroundColor = "red"
    linkPictureElement.placeholder = "Put some image :)"
    return null
  }
  if (linkPictureElement.value.trim() === "") {
    let user = {
      picture: rawPicture,
    }
    let checkLocalPicture = getUserPicture(user)
    if (!checkLocalPicture) {
      return null
    } else return checkLocalPicture
  }
  if (rawPicture === "") return linkPictureElement.value.trim()
  if (rawPicture !== "" && linkPictureElement.value.trim() !== "")
    return linkPictureElement.value.trim()
}

function loginSubmit() {
  let user = checkLoginFields()
  if (typeof user !== "undefined") {
    login = true
    updateElements(user)
  }
}

function checkSignupFields(e) {
  let doesExist
  if (checkAllInputs(e, 0)) doesExist = checkIfUserExists(e)
  else return 0

  if (doesExist) {
    checkAllInputs(e, 1)
    let userInput = document.getElementById("signupUsername")
    userInput.placeholder = "Username already exists"
    userInput.style.background = "red"

    return 0
  }
  if (!checkPasswords()) return 0

  return 1
}

function checkIfUserExists(e) {
  let parent = e.target.parentElement
  let usernameInput = parent.children[2]

  let foundUsers = users.find(
    user =>
      user.fullname.toLowerCase() === usernameInput.value.trim().toLowerCase()
  )
  if (typeof foundUsers !== "undefined") return true
  return false
}

function checkAllInputs(e, call) {
  let parent = e.target.parentElement
  let usernameInput = parent.children[2]
  let password1 = parent.children[3]
  let password2 = parent.children[4]

  if (
    usernameInput.value.trim() === "" ||
    password1.value.trim() === "" ||
    password2.value.trim() === "" ||
    call === 1
  ) {
    usernameInput.value = ""
    password1.value = ""
    password2.value = ""
    return false
  }
  return true
}

function checkPasswords() {
  let pass1 = document.getElementById("signupPassword1").value.trim()
  let pass2 = document.getElementById("signupPassword2").value.trim()
  if (pass1 !== pass2) {
    let signRepeatPassword = document.getElementById("signupPassword2")
    signRepeatPassword.style.backgroundColor = "red"
    signRepeatPassword.value = ""
    signRepeatPassword.placeholder = "Passwords do not match"
    return 0
  } else return 1
}

function checkLoginFields() {
  let username = document
    .getElementById("loginUsername")
    .value.trim()
    .toLowerCase()
  let user = checkUser(username)
  if (user === null) {
    resetInputs()
    let loginUser = document.getElementById("loginUsername")
    let loginPassword = document.getElementById("loginPassword")
    loginUser.style.backgroundColor = "red"
    loginUser.placeholder = "Wrong username"
    loginPassword.style.backgroundColor = "red"
    loginPassword.placeholder = "or password"
  } else {
    return user
  }
}

function updateElements(user) {
  if (login) {
    navigate("/")
    setTimeout(() => {
      document.getElementById("logRegButtons").style.display = "none"
      document.getElementById("user-icon").style.display = "block"
      document.getElementById("searchBar").style.marginLeft = "0em"

      let postIcons = document.getElementsByClassName("postIcons")
      for (let i = 0; i < postIcons.length; i++)
        postIcons[i].style.display = "flex"

      let inputComments = document.getElementsByClassName("inputComment")
      for (let i = 0; i < inputComments.length; i++)
        inputComments[i].style.display = "flex"

      updateUserInfo(user)
    }, 500)
  } else {
    document.getElementById("logRegButtons").style.display = "inline-block"
    document.getElementById("user-icon").style.display = "none"
    document.getElementById("searchBar").style.marginLeft = "9em"

    let postIcons = document.getElementsByClassName("postIcons")
    for (let i = 0; i < postIcons.length; i++)
      postIcons[i].style.display = "none"

    let inputComments = document.getElementsByClassName("inputComment")
    for (let i = 0; i < inputComments.length; i++)
      inputComments[i].style.display = "none"

    updateLoggedUser(null)
  }

  updatePostRemovalButtons()
}

function checkUser(username) {
  let user = users.filter(
    user => user.fullname.trim().toLowerCase() === username
  )
  if (user.length === 0) return null
  else {
    let passwordInput = document.getElementById("loginPassword").value.trim()
    if (passwordInput === user[0].password) return user[0]
    else return null
  }
}

function resetInputs() {
  document.getElementById("loginUsername").value = ""
  document.getElementById("loginPassword").value = ""
}

function removeWarning() {
  let loginUser = document.getElementById("loginUsername")
  let loginPassword = document.getElementById("loginPassword")
  loginUser.style.backgroundColor = "rgb(196, 195, 195)"
  loginUser.placeholder = "Enter username"
  loginPassword.style.backgroundColor = "rgb(196, 195, 195)"
  loginPassword.placeholder = "Enter password"
}

function updateUserInfo(user) {
  let picture = getUserPicture(user)
  let userInfoElement = document.getElementById("loggedInProfile")
  if (picture) userInfoElement.querySelector("img").src = picture
  else userInfoElement.querySelector("img").src = user.picture
  userInfoElement.querySelector(".postUsernameInfo").innerText = user.fullname
  userInfoElement.querySelector("#userLikes").innerText = "Likes: " + user.likes
  userInfoElement.querySelector("#userComments").innerText =
    "Comments: " + user.comments
  userInfoElement.querySelector("#userBookmarks").innerText =
    "Bookmarks: " + user.bookmarks
  userInfoElement.style.display = "block"

  updateLoggedUser(user.fullname)

  //add space for user info (right side of the page)
  document.getElementById("content").style.gridTemplateColumns = "70% 30%"

  //new post functionality
  document.getElementById("newPost").style.display = "flex"
}

function getUserPicture(user) {
  if (!user.picture.includes("http")) {
    switch (user.picture) {
      case "risitas.jpg":
        return risitas
      case "backgroundNatureNWT.jpg":
        return nwtPicture
      case "djDenis1.png":
        return denisPicture
      default:
        return null
    }
  } else return null
}

function logOut() {
  login = false
  let userIcon = document.getElementById("user-icon")
  userIcon.click()
  userIcon.style.display = "none"
  document.getElementById("logRegButtons").style.display = "inline"
  document.getElementById("loggedInProfile").style.display = "none"

  document.getElementById("content").style.gridTemplateColumns = "100%"

  document.getElementById("newPost").style.display = "none"

  updateElements("nebitno")
  switchChangeDivs("logout")
  document.getElementById("user-icon-content").style.display = "none"

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
  }, 100)
}

function deleteUserAccount() {
  let username = document.querySelector("#loggedInProfile .postUsernameInfo")
    .innerText
  let indexToDelete = -1
  users.forEach((user, iterator) => {
    if (user.fullname == username) indexToDelete = iterator
  })

  if (indexToDelete > -1) users.splice(indexToDelete, 1)
}

function updatePostRemovalButtons() {
  setTimeout(() => {
    if (login) {
      let posts = document.getElementsByClassName("post")
      let loggedUser = document.querySelector(
        "#loggedInProfile .postUsernameInfo"
      ).innerText

      for (let i = 0; i < posts.length; i++) {
        let authorOfPost = posts[i].querySelector(".postUsername").innerText
        if (authorOfPost === loggedUser) {
          posts[i].children[0].style.display = "inline-block"
        }
      }
    } else {
      let buttons = document.getElementsByClassName("removePost")
      for (let i = 0; i < buttons.length; i++) buttons[i].style.display = "none"
    }
  }, 500)
}

function removePost(e) {
  let postID = e.target.parentElement.getAttribute("id")
  deletePost(postID)
}

function removeTakenUsername() {
  let signUsername = document.getElementById("signupUsername")
  signUsername.style.backgroundColor = "rgb(196, 195, 195)"
  signUsername.placeholder = "Enter username"

  let signRepeatPassword = document.getElementById("signupPassword2")
  signRepeatPassword.style.backgroundColor = "rgb(196, 195, 195)"
  signRepeatPassword.placeholder = "Repeat password"
}

function clearPictureWarning() {
  let urlPicture = document.getElementById("notServerPicture")
  let localPicture = document.getElementById("signupPicture")
  localPicture.style.backgroundColor = "transparent"
  urlPicture.placeholder = "Picture link"
  urlPicture.style.backgroundColor = "white"
}

function addNewComment(text, post) {
  let postID = parseInt(post.getAttribute("id"), 10)
  let userID = getUserId(
    document.querySelector("#loggedInProfile .postUsernameInfo").innerText
  )
  let id = getLastId("comment")

  let comment = {
    id: id + 1,
    content: text,
    userID: userID,
    postID: postID,
  }
  addCommentToDatabase(comment)
  let numberOfComments = document.getElementById("userComments")
  let number = numberOfComments.innerText.match(/\d+/)[0]
  number = parseInt(number, 10)
  ++number
  numberOfComments.innerText = "Comments: " + number

  updateUserComments(1)
}

function getUserId(username) {
  let user = users.find(user => user.fullname === username)
  return user.id
}

function updateBookmark(bookmark) {
  if (bookmark.classList.contains("fa-bookmark-o")) {
    bookmark.classList.remove("fa-bookmark-o")
    bookmark.classList.add("fa-bookmark")
    updateBookmarkNumber(1)
  } else {
    bookmark.classList.remove("fa-bookmark")
    bookmark.classList.add("fa-bookmark-o")
    updateBookmarkNumber(-1)
  }
}

function updateLike(like) {
  let postLikes = like.parentElement.children[1]

  if (like.classList.contains("fa-heart-o")) {
    like.classList.remove("fa-heart-o")
    like.classList.add("fa-heart")
    updateLikeNumber(1, postLikes)
  } else {
    like.classList.remove("fa-heart")
    like.classList.add("fa-heart-o")
    updateLikeNumber(-1, postLikes)
  }
}

function updateBookmarkNumber(offset) {
  let numberOfBookmarks = document.getElementById("userBookmarks")
  let number = numberOfBookmarks.innerText.match(/\d+/)[0]
  number = parseInt(number, 10)
  number = number + offset
  numberOfBookmarks.innerText = "Bookmarks: " + number

  updateUserBookmarks(offset)
}

function updateLikeNumber(offset, postLikes) {
  let numberOfLikes = document.getElementById("userLikes")
  let number = numberOfLikes.innerText.match(/\d+/)[0]
  number = parseInt(number, 10)
  number = number + offset
  numberOfLikes.innerText = "Likes: " + number

  let postLikeNumber = postLikes.innerText.match(/\d+/)[0]
  postLikeNumber = parseInt(postLikeNumber, 10)
  postLikeNumber = postLikeNumber + offset
  postLikes.innerText = "Likes: " + postLikeNumber

  updateUserLikes(offset)

  let postId = postLikes.parentElement.parentElement.getAttribute("id")
  updatePostLikes(offset, postId)
}

function changeUsername() {
  clearAllChanges()
  switchChangeDivs("username")
}

function changePassword() {
  clearAllChanges()
  switchChangeDivs("password")
}

function changePicture() {
  clearAllChanges()
  switchChangeDivs("picture")
}

function clearAllChanges() {
  document.getElementById("user-icon").click()
  document.querySelector("#changeUsername input").value = ""
  document.querySelector("#changePassword input").value = ""
  document.getElementById("changePictureLocal").value = ""
  document.getElementById("changePictureUrl").value = ""
}

function switchChangeDivs(dataToChange) {
  let usernameDiv = document.getElementById("changeUsername")
  let passwordDiv = document.getElementById("changePassword")
  let pictureDiv = document.getElementById("changePicture")
  let parentDiv = usernameDiv.parentElement

  switch (dataToChange) {
    case "username":
      parentDiv.style.display = "block"
      usernameDiv.style.display = "flex"
      passwordDiv.style.display = "none"
      pictureDiv.style.display = "none"
      break
    case "password":
      parentDiv.style.display = "block"
      usernameDiv.style.display = "none"
      passwordDiv.style.display = "flex"
      pictureDiv.style.display = "none"
      break
    case "picture":
      parentDiv.style.display = "block"
      usernameDiv.style.display = "none"
      passwordDiv.style.display = "none"
      pictureDiv.style.display = "flex"
      break
    case "logout":
      clearAllChanges()
      parentDiv.style.display = "none"
      usernameDiv.style.display = "none"
      passwordDiv.style.display = "none"
      pictureDiv.style.display = "none"
      break
    default:
      clearAllChanges()
      parentDiv.style.display = "none"
      usernameDiv.style.display = "none"
      passwordDiv.style.display = "none"
      pictureDiv.style.display = "none"
      document.getElementById("user-icon").click()
      break
  }
}

function newUsername() {
  let textInput = document.querySelector("#changeUsername input")
  let username = textInput.value.trim()
  if (username !== "") {
    if (!checkIfUsernameExists(username)) {
      let userObject = putNewUsername(username)
      document.querySelector("#changeAccountData .fa-close").click()
      updateUserInfo(userObject)
      document.getElementById("headerLeaf").click()
    }
  } else textInput.value = ""
}

function newPassword() {
  let textInput = document.querySelector("#changePassword input")
  let password = textInput.value.trim()
  if (password !== "") {
    putNewPassword(password)
    document.querySelector("#changeAccountData .fa-close").click()
  } else textInput.value = ""
}

function newPicture() {
  let localPicture = document.getElementById("changePictureLocal")
  let urlPicture = document.getElementById("changePictureUrl")

  if (localPicture.value.trim() === "" && urlPicture.value.trim() === "") {
    localPicture.value = ""
    urlPicture.value = ""
    return
  }
  if (localPicture.value.trim() !== "") {
    let rawPicture = localPicture.value.trim().replace(/C:\\fakepath\\/, "")
    let user = {
      picture: rawPicture,
    }
    let ifHardcodedPicture = getUserPicture(user)
    if (ifHardcodedPicture) {
      let userObject = putNewPicture(ifHardcodedPicture)
      document.querySelector("#changeAccountData .fa-close").click()
      updateUserInfo(userObject)
      document.getElementById("headerLeaf").click()
      return
    } else {
      localPicture.value = ""
      urlPicture.value = ""
      return
    }
  }
  if (urlPicture.value.trim() !== "") {
    let userObject = putNewPicture(urlPicture.value.trim())
    document.querySelector("#changeAccountData .fa-close").click()
    document.getElementById("headerLeaf").click()
    updateUserInfo(userObject)
  }
}

function checkIfUsernameExists(username) {
  let foundUsers = []
  foundUsers = users.find(
    user => user.fullname.toLowerCase() === username.toLowerCase()
  )
  if (typeof foundUsers == "undefined") return false
  return true
}

function newPost() {
  let location = document.getElementById("newPostLocation")
  let pictureLocal = document.getElementById("newPostPictureLocal")
  let pictureUrl = document.getElementById("newPostPictureUrl")
  let description = document.getElementById("newPostDescription")

  if (
    location.value.trim() !== "" &&
    description.value.trim() !== "" &&
    (pictureLocal.value.trim() !== "" || pictureUrl.value.trim() !== "")
  ) {
    if (pictureLocal.value.trim() !== "") {
      let user = {
        picture: pictureLocal.value.trim().replace(/C:\\fakepath\\/, ""),
      }
      let doesPicExists = getUserPicture(user)
      if (doesPicExists) {
        let trimmedLocation = location.value.trim()
        let trimmedDescription = description.value.trim()
        proceedWithNewPost(doesPicExists, trimmedLocation, trimmedDescription)
        return
      } else return
    } else {
      let trimmedPicture = pictureUrl.value.trim()
      let trimmedLocation = location.value.trim()
      let trimmedDescription = description.value.trim()
      proceedWithNewPost(trimmedPicture, trimmedLocation, trimmedDescription)
    }
  }
}

function proceedWithNewPost(picture, location, description) {
  let newPost = {
    id: lastPostId + 1,
    location: location,
    picture: picture,
    numberOfLikes: 0,
    description: description,
    userID: getUserId(loggedUser),
  }

  addNewPost(newPost)

  document.querySelector("#newPostForm .fa-close").click()
  navigate("/")
  setTimeout(() => {
    let post = document.getElementById(`${newPost.id}`)
    post.children[0].style.display = "inline-block"
    post.children[3].style.display = "flex"
    post.children[6].style.display = "flex"
  }, 200)
}

function minimizeUserContent() {
  let userIcon = document.getElementById("user-icon")
  if (userIcon.classList.contains("fa-user")) userIcon.click()
}

function setUserInfo(rawUsername) {
  let username = rawUsername.replace(":", "")
  let userObject = users.find(user => user.fullname == username)
  document.getElementById("userInfoUsername").innerText = userObject.fullname
  document.getElementById("userInfoGrid").children[3].innerText =
    userObject.bookmarks
  document.getElementById("userInfoGrid").children[4].innerText =
    userObject.comments
  document.getElementById("userInfoGrid").children[5].innerText =
    userObject.likes
}

export {
  filterSearch,
  signupSubmit,
  loginSubmit,
  displayUserMenu,
  removeWarning,
  logOut,
  deleteUserAccount,
  removePost,
  removeTakenUsername,
  addNewComment,
  updateBookmark,
  updateLike,
  changeUsername,
  changePassword,
  changePicture,
  switchChangeDivs,
  newUsername,
  newPassword,
  newPicture,
  newPost,
  minimizeUserContent,
  setUserInfo,
  login,
  clearPictureWarning,
}
