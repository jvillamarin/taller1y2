const userNameField = document.getElementById("user");
const commentField = document.getElementById("comment");
const formComments = document.getElementById("formComments");
const contentComments = document.querySelector(".content-comments");
const sectionComments = document.querySelector(".comments");
let inputComment;

class Comment {
  constructor(comment, user) {
    this.comment = comment;
    this.user = user;
    this.date = `${new Date().getDate()} / ${
      new Date().getMonth() + 1
    } / ${new Date().getFullYear()}  `;
  }

  addComment() {
    let comments = JSON.parse(localStorage.getItem("comments")) || [];

    comments.push(new Comment(this.comment, this.user));
    localStorage.setItem("comments", JSON.stringify(comments));
  }

  editComment(index, newComment) {
    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments[index].comment = newComment;
    comments[index].fecha = new Date().toLocaleString();
    localStorage.setItem("comments", JSON.stringify(comments));
  }

  deleteComment(index) {
    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.splice(index, 1);
    localStorage.setItem("comments", JSON.stringify(comments));
  }

  static showComment() {
    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    let htmlComment = "";    

    for (let i = 0; i < comments.length; i++) {      

      htmlComment += `<div class="card">
        <div class="card-header bg-transparent "><h4>${comments[i].user}</h4><h3>${comments[i].date}</h3></div>
        <div class="content-body">
          <div class="card-body text-success"> 
            <input class="comment-input" type="text" name="" id="" readonly value="${comments[i].comment}">
          </div>
          <div class="card-footer">
            <button class="btn btn-primary edit" id="${i}">Edit</button>
            <button class="btn border-danger delete" id="${i}">Delete</button>
          </div>
        </div>  
      </div>`;
    }
    contentComments.innerHTML = htmlComment;
    inputComment = document.querySelectorAll(".comment-input");
  }
}

formComments.addEventListener("submit", (e) => {
  e.preventDefault();
  addComment();
  sectionComments.scrollIntoView({ behavior: "smooth", block: "start" });
});

function addComment() {
  let comment = new Comment(commentField.value, userNameField.value);
  comment.addComment();
  Comment.showComment();
  formComments.reset();
}

function editComment(index) {
  inputComment[index].removeAttribute("readonly");
  inputComment[index].focus();
}


function save(index) {
  let newComment = inputComment[index].value;

  let comment = new Comment("", "");
  comment.editComment(index, newComment);
  Comment.showComment();
}

function deleteComment(index) {
  let comment = new Comment("", "");
  comment.deleteComment(index);
  Comment.showComment();
}

// getting delete button or edit button with id attribute

contentComments.addEventListener("click", (e) => {
  e.preventDefault();

  // change button value 
  if (e.target.innerText === "Edit") {
    e.target.innerText = "Save";    
    editComment(e.target.getAttribute("id"));
  } else if (e.target.innerText === "Save") {
    save(e.target.getAttribute("id"));
  } else if (e.target.innerText === "Delete") {
    deleteComment(e.target.getAttribute("id"));
  } else {
    return null;
  }
});


Comment.showComment(contentComments);

