document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector(".search-bar input");

    const products = [
        "iPhone 16 Pro Max 1TB | Chính hãng VN/A",
        "Samsung Galaxy Z Fold6 12GB 1TB | Chính hãng VN/A",
        "OPPO FIND N5 | Chính hãng VN/A",
        "Xiaomi 15 Ultra 5G 16GB 1TB | Chính hãng VN/A",
        "TECNO CAMON 40 Pro 8GB 256GB | Chính hãng VN/A"
    ];

    function performSearch() {
        let query = searchInput.value.toLowerCase();
        let results = products.filter(product => product.toLowerCase().includes(query));

        if (results.length > 0) {
            alert("Kết quả tìm kiếm:\n" + results.join("\n"));
        } else {
            alert("Không tìm thấy sản phẩm phù hợp.");
        }

        // Xóa nội dung ô tìm kiếm sau khi alert đóng lại
        searchInput.value = "";
    }

    searchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            performSearch();
        }
    });
});


let currentIndex = 0;
    
    function showSlide(index) {
        const slides = document.querySelector('.slides');
        const totalSlides = document.querySelectorAll('.slide').length;
        if (index >= totalSlides) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = totalSlides - 1;
        } else {
            currentIndex = index;
        }
        slides.style.transform = `translateX(${-currentIndex * 100}%)`;
    }

    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function autoSlide() {
        nextSlide();
    }

    // Thiết lập slider tự động chạy mỗi 3 giây
    setInterval(autoSlide, 3500);


    // Hiện nút khi cuộn xuống
window.onscroll = function () {
  const btn = document.getElementById("scrollBtn");
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
};

// Cuộn lên đầu trang khi bấm
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

