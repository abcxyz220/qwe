<script>
  document.querySelector("form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData
      });

      if (response.ok) {
        alert("Gửi liên hệ thành công!");
        form.reset();
      } else {
        alert("Đã xảy ra lỗi. Vui lòng thử lại sau.");
      }
    } catch (error) {
      console.error("Lỗi gửi form:", error);
      alert("Không thể gửi thông tin. Kiểm tra kết nối mạng.");
    }
  });
</script>
