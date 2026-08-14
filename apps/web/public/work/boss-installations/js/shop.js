document.addEventListener('DOMContentLoaded', () => {
  const shopGrid = document.getElementById('shopGrid');

  async function loadProducts() {
    try {
      const res = await fetch('/work/boss-installations/api/products');
      const products = await res.json();
      if (!Array.isArray(products)) return;

      shopGrid.innerHTML = products.map(product => `
        <article class="product-card">
          <img src="${esc(product.image_url || 'https://via.placeholder.com/400x300?text=Product')}" alt="${esc(product.name)}">
          <div class="product-card-body">
            <h3>${esc(product.name)}</h3>
            <p>${esc(product.description || 'No description available.')}</p>
            <div class="product-meta">
              <span class="product-price">$${Number(product.price).toFixed(2)}</span>
              <span class="product-stock">${product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</span>
            </div>
            <button class="btn btn-primary btn-full" ${product.stock <= 0 ? 'disabled' : ''} data-product-id="${product.id}" data-product-name="${esc(product.name)}" data-product-price="${product.price}">Add to cart</button>
          </div>
        </article>
      `).join('');

      shopGrid.querySelectorAll('button[data-product-id]').forEach(button => {
        button.addEventListener('click', () => addToCart({
          productId: Number(button.dataset.productId),
          name: button.dataset.productName,
          price: Number(button.dataset.productPrice)
        }));
      });
    } catch (err) {
      shopGrid.innerHTML = '<p class="empty-state">Unable to load products. Please try again later.</p>';
      console.error(err);
    }
  }

  function getCart() {
    return JSON.parse(localStorage.getItem('bossCart') || '[]');
  }

  function saveCart(cart) {
    localStorage.setItem('bossCart', JSON.stringify(cart));
  }

  function addToCart(item) {
    const cart = getCart();
    const existing = cart.find(i => i.productId === item.productId);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }
    saveCart(cart);
    showCartToast(`${item.name} added to cart`);
  }

  function showCartToast(message) {
    const toast = document.createElement('div');
    toast.className = 'cart-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  }

  loadProducts();
});

function esc(str) {
  const div = document.createElement('div');
  div.textContent = String(str);
  return div.innerHTML;
}
