const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteBtn = document.querySelectorAll("#deleteCommentBtn");

const addComment = (text) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const span2 = document.createElement("span");
  span2.innerText = "❌";
  span2.dataset.id = commentId;
  span2.dataset.videoid = videoContainer.dataset.id;
  span2.id = "newDeleteCommentBtn";
  span2.className = "video__comment-delete";

  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);

  const newDeleteCommentBtn = document.querySelector("#newDeleteCommentBtn");
  newDeleteCommentBtn.addEventListener("click", handleClick);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;

  if (text == "") {
    return;
  }
  const { status } = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    }, // request에 추가할 수 있는 정보, Express에게 json을 보내고 있다고 알림
    body: JSON.stringify({ text }),
  });
  textarea.value = "";
  if (status === 201) {
    addComment(text);
  }
};

const handleClick = async (event) => {
  const { id, videoid } = event.target.dataset;
  const response = await fetch(`/api/videos/${videoid}/comments/${id}/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, videoid }),
  });
  if (response.status === 200) {
    event.target.parentNode.remove();
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
if (deleteBtn)
  deleteBtn.forEach((btn) => btn.addEventListener("click", handleClick));
