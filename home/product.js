    function formatVND(number) {
      if (isNaN(number) || number <= 0) return "";
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ';
    }
    function updatePrices() {
      document.querySelectorAll('.product-content').forEach(content => {
        const oldPrice = parseInt(content.getAttribute('data-old-price') || '0');
        const currentPrice = parseInt(content.getAttribute('data-current-price') || '0');
        const priceOldEl = content.querySelector('.price-old');
        const priceCurrentEl = content.querySelector('.price-current');
        const priceReducedEl = content.querySelector('.price-reduced');

        if (!oldPrice || oldPrice === 0) {
          priceOldEl.textContent = '';
        } else {
          priceOldEl.textContent = formatVND(oldPrice);
        }

        if (currentPrice === 0) {
          priceCurrentEl.textContent = oldPrice ? '0đ' : 'Liên hệ';
        } else {
          priceCurrentEl.textContent = formatVND(currentPrice);
        }

        const diff = oldPrice - currentPrice;
        if (diff > 0) {
          priceReducedEl.textContent = `Tiết kiệm: -${formatVND(diff)}`;
        } else {
          priceReducedEl.textContent = '';
        }
      });
    }

    // Flash Sale countdown 30s toàn trang
    const flashSaleTimer = document.getElementById('flashsale-timer');
    let countdown = 30;
    function updateFlashSaleTimer() {
      const minutes = Math.floor(countdown / 60).toString().padStart(2, '0');
      const seconds = (countdown % 60).toString().padStart(2, '0');
      flashSaleTimer.textContent = `${minutes}:${seconds}`;
      if (countdown <= 0) {
        countdown = 30;
      } else {
        countdown--;
      }
    }
    setInterval(updateFlashSaleTimer, 1000);
    updateFlashSaleTimer();

    // Favorite icons toggle
    document.querySelectorAll('.favorite-icon').forEach(icon => {
      icon.addEventListener('click', () => toggleFavorite(icon));
      icon.addEventListener('keydown', (e) => {
        if(e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleFavorite(icon);
        }
      });
    });
    function toggleFavorite(icon) {
      const pressed = icon.getAttribute('aria-pressed') === 'true';
      icon.setAttribute('aria-pressed', String(!pressed));
      icon.textContent = pressed ? 'favorite_border' : 'favorite';
    }

    document.addEventListener('DOMContentLoaded', () => {
      updatePrices();
    });