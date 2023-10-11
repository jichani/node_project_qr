const joinBtn = document.querySelector(".join");
const loginBtn = document.querySelector(".login");
const userIdInput = document.getElementById("userId");
const userPasswordInput = document.getElementById("userPassword");

const msgAlert = (position, message, type) => {
  const Toast = Swal.mixin({
    toast: true,
    position: position,
    showConfirmButton: false,
    timer: 2000,
  })
  Toast.fire({ title: message, icon: type })
};

const loginFetch = async () => {
  const userId = userIdInput.value;
  const userPassword = userPasswordInput.value;


  if (!userId || !userPassword) {
    msgAlert("bottom", "모든 필드를 채워주세요.", "error");
  };

  const response = await fetch("/api/login", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      userId: userId,
      userPassword: userPassword,
    })
  })
  const result = await response.json();

  console.log(result);

  if (response.status === 200) {
    localStorage.setItem("accessToken", result.accessToken);
    msgAlert("center", "로그인 성공", "success");
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  } else {
    msgAlert("bottom", result.status, "error");
  }
};

loginBtn.addEventListener('click', loginFetch);

joinBtn.addEventListener('click', () => window.location.href = "/join");