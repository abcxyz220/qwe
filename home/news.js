
const modal = document.getElementById('team-modal');
const openBtn = document.getElementById('open-team-modal');
const closeBtn = document.querySelector('.close-button');
// Hàm mở modal
function showModal() {
  modal.style.display = 'block';
  // Ghi nhớ rằng modal đã mở
  sessionStorage.setItem('teamModalShown', 'true');
}
// Hàm đóng modal
function hideModal() {
  modal.style.display = 'none';
}
// Sự kiện click nút mở modal
openBtn.addEventListener('click', function(e) {
  e.preventDefault();
  if (!sessionStorage.getItem('teamModalShown')) {
    showModal();
  }
});
// Sự kiện click nút đóng modal
closeBtn.addEventListener('click', hideModal);
// Click ngoài vùng modal để đóng
window.addEventListener('click', function(e) {
  if (e.target === modal) {
    hideModal();
  }
});
// Ngăn modal tự hiển thị lại khi quay lại (Back)
window.addEventListener('pageshow', function(event) {
  if (sessionStorage.getItem('teamModalShown')) {
    modal.style.display = 'none';
  }
});