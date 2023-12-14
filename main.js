const toastContainer = document.createElement("div");
toastContainer.classList.add("toast-container");
document.body.appendChild(toastContainer);

function showToast(message, duration = 3000, type = "success") {
  const toast = document.createElement("div");

  toast.classList.add("toast");
  toast.innerHTML = message;
  toast.classList.add(type);

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = 1;
  }, 200); // 200ms sau khi bấm nút, toast sẽ hiện lên mượt mà

  setTimeout(() => {
    toast.style.opacity = 0; // hành vi tạo sự biến mất của toast mượt mà nhưng ko gỡ hẳn toast đi
    setTimeout(() => {
      toastContainer.removeChild(toast); // hành vi gỡ hoàn toàn toast đi, đặt 3000ms để toast mượt mà biến mất
    }, 3000);
  }, duration); // duration là thời gian tồn tại của toast
}

const handleClick = () => {
  showToast("Hello, this is a success toast message!", 3000, "success");
};

const handleClickError = () => {
  showToast("Hello, this is a error toast message!", 3000, "error");
};

const handleClickWarning = () => {
  showToast("Hello, this is a error toast message!", 3000, "warning");
};
