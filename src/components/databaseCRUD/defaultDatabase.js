function setDefaultValues(users, comments, posts) {
  setDefaultUsers(users)
  setDefaultPosts(posts)
  setDefaulfComments(comments)
}

function setDefaultUsers(users) {
  let user = {
    id: 2,
    fullname: "Ivan Bakušić",
    picture: "https://i.ibb.co/vstpXcb/Barbossa.jpg",
    password: "123",
    likes: 10,
    comments: 23,
    bookmarks: 7,
  }
  users.push(user)

  user = {
    id: 1,
    fullname: "Gibbs",
    picture: "https://i.ibb.co/4gLF90f/Gibbs.png",
    password: "abc",
    likes: 111,
    comments: 23,
    bookmarks: 1,
  }
  users.push(user)

  user = {
    id: 0,
    fullname: "Davy Jones",
    picture: "https://i.ibb.co/F63ztPV/Jones.jpg",
    password: "a1b2c3",
    likes: 666,
    comments: 69,
    bookmarks: 4,
  }
  users.push(user)
}

function setDefaultPosts(posts) {
  let post = {
    id: 2,
    location: "Dubrovnik",
    picture:
      "https://i.ibb.co/4KKPM9v/photo-1414862625453-d87604a607e4-ixlib-rb-1-2.jpg",
    numberOfLikes: 102,
    description: "Beautiful place! Do not come at summer, traffic jam :/",
    userID: 0,
  }
  posts.push(post)

  post = {
    id: 1,
    location: "Podstrana",
    picture: "https://i.ibb.co/Y7QYb7b/20191227-105548-2.jpg",
    numberOfLikes: 1009,
    description:
      "Lovely place. It has all you need, river, mountain, forrest, ...",
    userID: 2,
  }
  posts.push(post)

  post = {
    id: 0,
    location: "Mosor",
    picture:
      "https://i.ibb.co/4VV84mw/Hiking-Mosor-Mountain-Split-Croatia-And-why-you-don-t-need-to-take-a-tour-1.jpg",
    numberOfLikes: 88,
    description: "Vicious mountain Mosor! Very tired, but it's worth it!",
    userID: 1,
  }
  posts.push(post)
}

function setDefaulfComments(comments) {
  let comment = {
    id: 5,
    content: "Beautiful scenery, hopefully going there next month :)",
    userID: 1,
    postID: 0,
  }
  comments.push(comment)

  comment = {
    id: 4,
    content: "Gotta put random comment, eh?",
    userID: 0,
    postID: 0,
  }
  comments.push(comment)

  comment = {
    id: 3,
    content: "Such a great picture!",
    userID: 0,
    postID: 1,
  }
  comments.push(comment)

  comment = {
    id: 2,
    content: "Props to you for taking that great picture.",
    userID: 0,
    postID: 2,
  }
  comments.push(comment)

  comment = {
    id: 1,
    content: "When did you take trip to there? xD",
    userID: 2,
    postID: 1,
  }
  comments.push(comment)

  comment = {
    id: 0,
    content: "Very nice!",
    userID: 2,
    postID: 2,
  }
  comments.push(comment)
}

export { setDefaultValues }
