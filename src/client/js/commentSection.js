const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;

  if (text == "") {
    return;
  }
  await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    }, // request에 추가할 수 있는 정보, Express에게 json을 보내고 있다고 알림
    body: JSON.stringify({ text }),
  });
  textarea.value = "";
  window.location.reload();
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
