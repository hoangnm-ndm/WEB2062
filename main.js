const toastContainer = document.createElement("div");
toastContainer.classList.add("toast-container");
document.body.appendChild(toastContainer);

function showToast(message, duration = 5000, type = "success") {
  const toast = document.createElement("div");

  toast.classList.add("toast");
  toast.innerHTML = `<div class="message-wrap">
  <div class="message">${message}</div> <button class="closeBtn">x</button>
  </div>`;
  toast.classList.add(type);

  toastContainer.appendChild(toast);
  function closeToast() {
    toast.style.opacity = 0;
    setTimeout(() => {
      toast.remove();
    }, 1000);
  }

  const closeBtn = toast.querySelector(".closeBtn");
  closeBtn.classList.add(`btn-${type}`);
  console.log(closeBtn);
  closeBtn.onclick = closeToast;

  setTimeout(() => {
    toast.style.opacity = 1;
  }, 200);

  setTimeout(() => {
    closeToast();
  }, duration);
}

const handleClick = () => {
  showToast("Hello, this is a success toast message!", 5000, "success");
};

const handleClickError = () => {
  showToast("Hello, this is a error toast message!", 5000, "error");
};

const handleClickWarning = () => {
  showToast("Hello, this is a error toast message!", 5000, "warning");
};
