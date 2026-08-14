document.addEventListener('DOMContentLoaded', () => {
  const cartItemsEl = document.getElementById('cartItems');
  const cartTotalEl = document.getElementById('cartTotal');
  const checkoutForm = document.getElementById('checkoutForm');
  const checkoutStatus = document.getElementById('checkoutStatus');
  const clearCartBtn = document.getElementById('clearCart');

  function getCart() {
    return JSON.parse(localStorage.getItem('bossCart') || '[]');
  }

  function saveCart(cart) {
    localStorage.setItem('bossCart', JSON.stringify(cart));
  }

  function renderCart() {
    const cart = getCart();
    if (cart.length === 0) {
      cartItemsEl.innerHTML = '<p class="empty-state">Your cart is empty. Add items from the shop.</p>';
      cartTotalEl.textContent = '$0.00';
      return;
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotalEl.textContent = `$${total.toFixed(2)}`;

    cartItemsEl.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div>
          <strong>${esc(item.name)}</strong>
          <div>${item.quantity} × $${Number(item.price).toFixed(2)}</div>
        </div>
        <div>$${(item.price * item.quantity).toFixed(2)}</div>
      </div>
    `).join('');
  }

  checkoutForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const cart = getCart();
    if (cart.length === 0) {
      checkoutStatus.className = 'form-status error';
      checkoutStatus.textContent = 'Your cart is empty.';
      return;
    }

    const payload = {
      customerName: document.getElementById('customerName').value.trim(),
      customerEmail: document.getElementById('customerEmail').value.trim(),
      customerPhone: document.getElementById('customerPhone').value.trim(),
      customerAddress: document.getElementById('customerAddress').value.trim(),
      items: cart.map(item => ({ productId: item.productId, quantity: item.quantity }))
    };

    try {
      // Pay-later: create order in DB and send confirmation email
      const res = await fetch('/work/boss-installations/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        checkoutStatus.className = 'form-status success';
        checkoutStatus.textContent = 'Order submitted! Order ID: ' + data.orderId + '. We will contact you soon.';
        saveCart([]);
        renderCart();
        checkoutForm.reset();
      } else {
        checkoutStatus.className = 'form-status error';
        checkoutStatus.textContent = data.error || 'Failed to submit order.';
      }
    } catch (err) {
      checkoutStatus.className = 'form-status error';
      checkoutStatus.textContent = 'Network error. Please try again.';
      console.error(err);
    }
  });

  // Pay Now (Stripe Checkout) flow
  document.getElementById('payNowBtn').addEventListener('click', async (e) => {
    e.preventDefault();
    const cart = getCart();
    if (cart.length === 0) {
      checkoutStatus.className = 'form-status error';
      checkoutStatus.textContent = 'Your cart is empty.';
      return;
    }

    const payload = {
      customerName: document.getElementById('customerName').value.trim(),
      customerEmail: document.getElementById('customerEmail').value.trim(),
      customerPhone: document.getElementById('customerPhone').value.trim(),
      customerAddress: document.getElementById('customerAddress').value.trim(),
      items: cart.map(item => ({ productId: item.productId, quantity: item.quantity }))
    };

    try {
      const res = await fetch('/work/boss-installations/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok && data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        checkoutStatus.className = 'form-status error';
        checkoutStatus.textContent = data.error || 'Failed to start payment.';
      }
    } catch (err) {
      checkoutStatus.className = 'form-status error';
      checkoutStatus.textContent = 'Network error. Please try again.';
      console.error(err);
    }
  });

  clearCartBtn.addEventListener('click', () => {
    if (!confirm('Clear the cart?')) return;
    saveCart([]);
    renderCart();
  });

  renderCart();
});

function esc(str) {
  const div = document.createElement('div');
  div.textContent = String(str);
  return div.innerHTML;
}
