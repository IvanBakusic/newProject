import React from "react"
import "./post.css"
import { users, comments } from "../databaseCRUD/database"
import {
  removePost,
  addNewComment,
  updateBookmark,
  updateLike,
  setUserInfo,
} from "../actions/actions"
import { navigate } from "gatsby"

const Post = ({ postObject }) => {
  let user = extractUser(postObject.userID)
  let comments = extractComments(postObject.id)

  let userPost = {
    user: user,
    post: postObject,
    comments: comments,
  }

  if (userPost.user !== null) {
    return (
      <div className="post" id={postObject.id}>
        <button className="removePost" onClick={removePost}>
          Remove
        </button>
        <PostUser userPost={userPost} />
        <PostPicture postPicture={userPost.post.picture} />
        <PostIcons likes={userPost.post.numberOfLikes} />
        <Description description={userPost.post.description} />
        <hr style={{ width: "93%" }} />
        <InsertComment />
        <Comments comments={userPost.comments} />
      </div>
    )
  } else return null
}

const PostUser = ({ userPost }) => {
  return (
    <div className="postUser">
      <div className="postUserImage">
        <img src={userPost.user.picture} alt="profile.jpg" />
      </div>
      <span className="postUserInfo">
        <label className="postUsername" onClick={showUserInfo}>
          {userPost.user.fullname}
        </label>
        <label className="postLocation">{userPost.post.location}</label>
      </span>
    </div>
  )
}

const PostPicture = ({ postPicture }) => {
  return (
    <div className="postPicture">
      <img src={postPicture} alt="postPicture.jpg" />
    </div>
  )
}

const Description = ({ description }) => {
  return <p className="postDescription">{description}</p>
}

const PostIcons = ({ likes }) => {
  return (
    <div className="postIcons">
      <span className="postLeftIcons">
        <i className="fa fa-bookmark-o" onClick={clickBookmark}></i>
        <i className="fa fa-comment-o" onClick={clickComment}></i>
      </span>
      <label className="likes">Likes: {likes}</label>
      <i className="fa fa-heart-o" onClick={clickLike}></i>
    </div>
  )
}

const InsertComment = () => {
  return (
    <div className="inputComment">
      <input placeholder="Post a comment" onKeyUp={clickPostComment}></input>
      <button onClick={postComment}>Post</button>
    </div>
  )
}

const Comments = ({ comments }) => {
  if (comments !== null) {
    return (
      <div className="postComments">
        {comments.map(combined => (
          <div className="comment" key={combined.comment.id}>
            <label className="commentUsername" onClick={showUserInfo}>
              {combined.user.fullname + ":"}
            </label>
            <label className="commentUser">{combined.comment.content}</label>
          </div>
        ))}
      </div>
    )
  } else return null
}

function extractUser(userID) {
  let user = users.filter(user => user.id === userID)
  if (user.length !== 0) return user[0]
  else return null
}

function extractComments(idPost) {
  let filteredComments = comments.filter(comment => comment.postID == idPost)
  if (filteredComments.length > 0) {
    let commentsAndUsers = []

    filteredComments.forEach(comment => {
      let user = users.filter(user => user.id === comment.userID)
      if (user.length !== 0) {
        let combined = {
          comment: comment,
          user: user[0],
        }
        commentsAndUsers.push(combined)
      }
    })

    return commentsAndUsers
  } else return null
}

function clickComment(e) {
  let post = e.target.parentElement.parentElement.parentElement
  post.children[6].children[0].focus()
}

function clickPostComment(e) {
  if (e.keyCode === 13) {
    e.target.parentElement.children[1].click()
  }
}

function postComment(e) {
  let input = e.target.parentElement.children[0]
  let text = input.value.trim()
  if (text !== "") {
    let post = e.target.parentElement.parentElement
    addNewComment(text, post)

    let link = "/#" + post.getAttribute("id")
    navigate(link)
  }
  input.value = ""
}

function clickBookmark(e) {
  let bookmark = e.target
  updateBookmark(bookmark)
}

function clickLike(e) {
  let like = e.target
  updateLike(like)
}

function showUserInfo(e) {
  setUserInfo(e.target.innerText)
  document.getElementById("userInfo").style.display = "block"
}

export default Post
