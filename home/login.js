function handleLogin(event) {
  event.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    alert("✅ Đăng nhập thành công!");
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    window.location.href = "/qwe/index.html";
  } else {
    alert("❌ Sai tên đăng nhập hoặc mật khẩu!");
  }
}

function handleRegister(event) {
  event.preventDefault();

  const fullname = document.getElementById('fullname').value.trim();
  const email = document.getElementById('email').value.trim();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (password !== confirmPassword) {
    alert("❌ Mật khẩu xác nhận không khớp!");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const isExist = users.some(user => user.username === username || user.email === email);
  if (isExist) {
    alert("⚠️ Tên đăng nhập hoặc email đã tồn tại!");
    return;
  }

  const newUser = { fullname, email, username, password };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  alert("✅ Đăng ký thành công!");
  window.location.href = "../login/dangnhap.html";
}
