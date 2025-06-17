function placeOrder() {
  const name = document.getElementById("fullname").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();

  const payment = document.querySelector('input[name="pttt"]:checked');
  const delivery = document.querySelector('input[name="ptgh"]:checked');

  // Ẩn thông báo lỗi thẻ
  document.getElementById("cardNumberError").classList.add("hidden");
  document.getElementById("cardExpiryError").classList.add("hidden");
  document.getElementById("cardCVVError").classList.add("hidden");

  // ❌ Kiểm tra giỏ hàng
  const cartItems = document.querySelectorAll("#cart-items .border-b");
  if (cartItems.length === 0) {
    alert("⚠️ Giỏ hàng đang trống. Vui lòng thêm sản phẩm trước khi đặt hàng.");
    return;
  }

  // Kiểm tra thông tin bắt buộc
  if (!name || !phone || !address) {
    alert("⚠️ Vui lòng nhập đầy đủ các thông tin bắt buộc có dấu * trước khi đặt hàng.");
    return;
  }

  if (!payment) {
    alert("⚠️ Vui lòng chọn phương thức thanh toán.");
    return;
  }

  if (!delivery) {
    alert("⚠️ Vui lòng chọn phương thức giao hàng.");
    return;
  }

  // Nếu chọn thanh toán qua thẻ
  if (payment.value === "card") {
    const cardNumber = document.getElementById("cardNumber").value.trim();
    const cardExpiry = document.getElementById("cardExpiry").value.trim();
    const cardCVV = document.getElementById("cardCVV").value.trim();
    let isValid = true;

    if (!/^\d{12}$/.test(cardNumber)) {
      document.getElementById("cardNumberError").classList.remove("hidden");
      isValid = false;
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardExpiry)) {
      document.getElementById("cardExpiryError").textContent = "Hạn thẻ phải đúng định dạng MM/YY (vd: 08/27).";
      document.getElementById("cardExpiryError").classList.remove("hidden");
      isValid = false;
    }

    if (!/^\d{3}$/.test(cardCVV)) {
      document.getElementById("cardCVVError").textContent = "Mã CVV phải gồm 3 chữ số.";
      document.getElementById("cardCVVError").classList.remove("hidden");
      isValid = false;
    }

    if (!isValid) {
      return;
    }
  }

  alert("✅ Đặt hàng thành công! Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi.");
}


// Xóa sản phẩm khỏi giỏ hàng
function removeItem(button) {
  const item = button.closest(".border-b");
  item.remove();

  const cartItems = document.getElementById("cart-items");
  const remainingItems = cartItems.querySelectorAll(".border-b");

  if (remainingItems.length === 0) {
    cartItems.innerHTML = `<p class="text-center text-gray-500 py-4">🛒 Giỏ hàng của bạn đang trống.</p>`;
  }

  updateTotal();
}

// Cập nhật tổng tiền
function updateTotal() {
  const cartItems = document.getElementById("cart-items");
  const items = cartItems.querySelectorAll(".border-b");
  let subtotal = 0;

  items.forEach(item => {
    const price = parseInt(item.getAttribute("data-price"));
    const quantityInput = item.querySelector('input[type="number"]');
    const quantity = parseInt(quantityInput.value);
    const totalItemPrice = price * quantity;
    subtotal += totalItemPrice;

    item.querySelector(".item-price").textContent = totalItemPrice.toLocaleString('vi-VN') + "đ";
  });

  const shippingFee = items.length > 0 ? 20000 : 0;
  const total = subtotal + shippingFee;

  const totalInfo = cartItems.nextElementSibling;
  totalInfo.innerHTML = `
    <div class="flex justify-between">
      <span>Tạm tính</span>
      <span>${subtotal.toLocaleString('vi-VN')}đ</span>
    </div>
    <div class="flex justify-between">
      <span>Phí vận chuyển</span>
      <span>${shippingFee.toLocaleString('vi-VN')}đ</span>
    </div>
    <div class="flex justify-between">
      <span>🎁 Mã giảm giá (nếu có):</span>
      <span>-0đ</span>
    </div>
    <div class="flex justify-between font-bold text-lg mt-2">
      <span>Tổng thanh toán</span>
      <span>${total.toLocaleString('vi-VN')}đ</span>
    </div>
  `;
}

// Thay đổi số lượng sản phẩm
function changeQuantity(input) {
  if (parseInt(input.value) < 1) {
    input.value = 1;
  }
  updateTotal();
}
