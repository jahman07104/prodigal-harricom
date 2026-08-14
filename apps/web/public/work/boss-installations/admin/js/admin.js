// ─── Boss Installations - Admin Dashboard JS ───

document.addEventListener('DOMContentLoaded', () => {
  const loginScreen = document.getElementById('loginScreen');
  const dashboard = document.getElementById('dashboard');

  // ─── Check session on load ───
  checkSession();

  async function checkSession() {
    try {
      const res = await fetch('/work/boss-installations/api/admin/session');
      if (res.ok) {
        const data = await res.json();
        showDashboard(data.username);
      }
    } catch (e) {
      // Not logged in, show login screen
    }
  }

  function showDashboard(username) {
    loginScreen.style.display = 'none';
    dashboard.style.display = 'flex';
    document.getElementById('adminUsername').textContent = username;
    loadStats();
    loadInquiries();
    loadClients();
  }

  // ─── LOGIN ───
  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const loginError = document.getElementById('loginError');
    loginError.textContent = '';

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
      const res = await fetch('/work/boss-installations/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();

      if (res.ok && data.success) {
        showDashboard(data.username);
      } else {
        loginError.textContent = data.error || 'Invalid credentials.';
      }
    } catch (err) {
      loginError.textContent = 'Connection error. Please try again.';
    }
  });

  // ─── MOBILE SIDEBAR TOGGLE ───
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebarOverlay = document.getElementById('sidebarOverlay');

  function openSidebar() {
    sidebar.classList.add('open');
    sidebarOverlay.classList.add('active');
    sidebarToggle.classList.add('active');
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('active');
    sidebarToggle.classList.remove('active');
  }

  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
  });

  sidebarOverlay.addEventListener('click', closeSidebar);

  // Close sidebar when nav item is clicked (mobile)
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      if (window.innerWidth <= 768) closeSidebar();
    });
  });

  // ─── LOGOUT ───
  async function doLogout() {
    await fetch('/work/boss-installations/api/admin/logout', { method: 'POST' });
    dashboard.style.display = 'none';
    loginScreen.style.display = 'flex';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
  }

  document.getElementById('logoutBtn').addEventListener('click', doLogout);

  // ─── BACK TO SITE (logs out) ───
  document.getElementById('backToSite').addEventListener('click', async (e) => {
    e.preventDefault();
    const confirmed = confirm('Leaving the admin panel will log you out for security. Continue?');
    if (confirmed) {
      await fetch('/work/boss-installations/api/admin/logout', { method: 'POST' });
      window.location.href = '/';
    }
  });

  // ─── TAB NAVIGATION ───
  document.querySelectorAll('.nav-item[data-tab]').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const tab = item.dataset.tab;

      document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
      item.classList.add('active');

      document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
      document.getElementById(`tab-${tab}`).classList.add('active');

      // Refresh data when switching tabs
      if (tab === 'overview') loadStats();
      if (tab === 'inquiries') loadInquiries();
      if (tab === 'clients') loadClients();
      if (tab === 'products') loadProducts();
      if (tab === 'orders') loadOrders();
    });
  });

  // ─── STATS / OVERVIEW ───
  async function loadStats() {
    try {
      const res = await fetch('/work/boss-installations/api/admin/stats');
      const data = await res.json();

      document.getElementById('statTotalInquiries').textContent = data.totalInquiries;
      document.getElementById('statUnreadInquiries').textContent = data.unreadInquiries;
      document.getElementById('statTotalClients').textContent = data.totalClients;

      // Unread badge
      const badge = document.getElementById('unreadBadge');
      if (data.unreadInquiries > 0) {
        badge.style.display = 'inline';
        badge.textContent = data.unreadInquiries;
      } else {
        badge.style.display = 'none';
      }

      // Recent inquiries
      const recentList = document.getElementById('recentInquiriesList');
      if (data.recentInquiries.length === 0) {
        recentList.innerHTML = '<div class="empty-state">No inquiries yet</div>';
      } else {
        recentList.innerHTML = data.recentInquiries.map(i => `
          <div class="recent-item">
            <div>
              <span class="name">${esc(i.name)}</span>
              <span class="service"> — ${esc(i.service)}</span>
            </div>
            <span class="date">${formatDate(i.created_at)}</span>
          </div>
        `).join('');
      }

      // Service breakdown
      const breakdownList = document.getElementById('serviceBreakdown');
      if (data.serviceBreakdown.length === 0) {
        breakdownList.innerHTML = '<div class="empty-state">No client data yet</div>';
      } else {
        breakdownList.innerHTML = data.serviceBreakdown.map(s => `
          <div class="breakdown-item">
            <span>${esc(s.service)}</span>
            <span class="count">${s.count}</span>
          </div>
        `).join('');
      }
    } catch (err) {
      console.error('Failed to load stats:', err);
    }
  }

  // ─── INQUIRIES ───
  let inquirySearchTimeout;
  document.getElementById('inquirySearch').addEventListener('input', (e) => {
    clearTimeout(inquirySearchTimeout);
    inquirySearchTimeout = setTimeout(() => loadInquiries(), 300);
  });

  document.getElementById('unreadOnly').addEventListener('change', () => loadInquiries());

  async function loadInquiries() {
    const search = document.getElementById('inquirySearch').value;
    const unread = document.getElementById('unreadOnly').checked;

    let url = '/api/admin/inquiries?';
    if (search) url += `search=${encodeURIComponent(search)}&`;
    if (unread) url += 'unread=true&';

    try {
      const res = await fetch(url);
      const inquiries = await res.json();
      const tbody = document.getElementById('inquiriesTableBody');

      const mobileCards = document.getElementById('inquiriesMobileCards');

      if (inquiries.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="empty-state">No inquiries found</td></tr>';
        mobileCards.innerHTML = '<div class="empty-state">No inquiries found</div>';
        return;
      }

      tbody.innerHTML = inquiries.map(i => `
        <tr>
          <td><span class="status-dot ${i.is_read ? '' : 'unread'}"></span></td>
          <td>${esc(i.name)}</td>
          <td>${esc(i.email)}</td>
          <td>${esc(i.service)}</td>
          <td>${formatDate(i.created_at)}</td>
          <td class="actions">
            <button class="action-btn" onclick="viewInquiry(${i.id})">View</button>
            ${!i.is_read ? `<button class="action-btn success" onclick="markRead(${i.id})">Read</button>` : ''}
            <button class="action-btn danger" onclick="deleteInquiry(${i.id})">Delete</button>
          </td>
        </tr>
      `).join('');

      // Mobile cards
      mobileCards.innerHTML = inquiries.map(i => `
        <div class="mobile-card">
          <div class="mobile-card-row">
            <span class="mobile-card-label">Name</span>
            <span class="mobile-card-value"><span class="status-dot ${i.is_read ? '' : 'unread'}" style="margin-right:6px;"></span>${esc(i.name)}</span>
          </div>
          <div class="mobile-card-row">
            <span class="mobile-card-label">Email</span>
            <span class="mobile-card-value">${esc(i.email)}</span>
          </div>
          <div class="mobile-card-row">
            <span class="mobile-card-label">Service</span>
            <span class="mobile-card-value">${esc(i.service)}</span>
          </div>
          <div class="mobile-card-row">
            <span class="mobile-card-label">Date</span>
            <span class="mobile-card-value">${formatDate(i.created_at)}</span>
          </div>
          <div class="mobile-card-actions">
            <button class="action-btn" onclick="viewInquiry(${i.id})">View</button>
            ${!i.is_read ? `<button class="action-btn success" onclick="markRead(${i.id})">Read</button>` : ''}
            <button class="action-btn danger" onclick="deleteInquiry(${i.id})">Delete</button>
          </div>
        </div>
      `).join('');
    } catch (err) {
      console.error('Failed to load inquiries:', err);
    }
  }

  window.viewInquiry = async function(id) {
    try {
      const res = await fetch('/work/boss-installations/api/admin/inquiries');
      const inquiries = await res.json();
      const inq = inquiries.find(i => i.id === id);
      if (!inq) return;

      // Mark as read
      if (!inq.is_read) {
        await fetch(`/api/admin/inquiries/${id}/read`, { method: 'PUT' });
      }

      openModal('Inquiry Details', `
        <div class="detail-row"><span class="detail-label">Name</span><span class="detail-value">${esc(inq.name)}</span></div>
        <div class="detail-row"><span class="detail-label">Email</span><span class="detail-value">${esc(inq.email)}</span></div>
        <div class="detail-row"><span class="detail-label">Phone</span><span class="detail-value">${esc(inq.phone || 'N/A')}</span></div>
        <div class="detail-row"><span class="detail-label">Service</span><span class="detail-value">${esc(inq.service)}</span></div>
        <div class="detail-row"><span class="detail-label">Date</span><span class="detail-value">${formatDate(inq.created_at)}</span></div>
        <div class="detail-row"><span class="detail-label">Message</span><span class="detail-value">${esc(inq.message)}</span></div>
      `);

      loadInquiries();
      loadStats();
    } catch (err) {
      console.error('Failed to view inquiry:', err);
    }
  };

  window.markRead = async function(id) {
    await fetch(`/api/admin/inquiries/${id}/read`, { method: 'PUT' });
    loadInquiries();
    loadStats();
  };

  window.deleteInquiry = async function(id) {
    if (!confirm('Delete this inquiry?')) return;
    await fetch(`/api/admin/inquiries/${id}`, { method: 'DELETE' });
    loadInquiries();
    loadStats();
  };

  // ─── CLIENTS ───
  let clientSearchTimeout;
  document.getElementById('clientSearch').addEventListener('input', () => {
    clearTimeout(clientSearchTimeout);
    clientSearchTimeout = setTimeout(() => loadClients(), 300);
  });

  document.getElementById('addClientBtn').addEventListener('click', () => {
    showClientForm();
  });

  async function loadClients() {
    const search = document.getElementById('clientSearch').value;
    let url = '/api/admin/clients?';
    if (search) url += `search=${encodeURIComponent(search)}`;

    try {
      const res = await fetch(url);
      const clients = await res.json();
      const tbody = document.getElementById('clientsTableBody');

      const clientMobileCards = document.getElementById('clientsMobileCards');

      if (clients.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="empty-state">No clients found</td></tr>';
        clientMobileCards.innerHTML = '<div class="empty-state">No clients found</div>';
        return;
      }

      tbody.innerHTML = clients.map(c => `
        <tr>
          <td>${esc(c.name)}</td>
          <td>${esc(c.email || '—')}</td>
          <td>${esc(c.phone || '—')}</td>
          <td>${esc(c.service || '—')}</td>
          <td>${formatDate(c.created_at)}</td>
          <td class="actions">
            <button class="action-btn" onclick="editClient(${c.id})">Edit</button>
            <button class="action-btn danger" onclick="deleteClient(${c.id})">Delete</button>
          </td>
        </tr>
      `).join('');

      // Mobile cards
      clientMobileCards.innerHTML = clients.map(c => `
        <div class="mobile-card">
          <div class="mobile-card-row">
            <span class="mobile-card-label">Name</span>
            <span class="mobile-card-value">${esc(c.name)}</span>
          </div>
          <div class="mobile-card-row">
            <span class="mobile-card-label">Email</span>
            <span class="mobile-card-value">${esc(c.email || '—')}</span>
          </div>
          <div class="mobile-card-row">
            <span class="mobile-card-label">Phone</span>
            <span class="mobile-card-value">${esc(c.phone || '—')}</span>
          </div>
          <div class="mobile-card-row">
            <span class="mobile-card-label">Service</span>
            <span class="mobile-card-value">${esc(c.service || '—')}</span>
          </div>
          <div class="mobile-card-actions">
            <button class="action-btn" onclick="editClient(${c.id})">Edit</button>
            <button class="action-btn danger" onclick="deleteClient(${c.id})">Delete</button>
          </div>
        </div>
      `).join('');
    } catch (err) {
      console.error('Failed to load clients:', err);
    }
  }

  function showClientForm(client = null) {
    const isEdit = client !== null;
    const title = isEdit ? 'Edit Client' : 'Add New Client';

    const serviceOptions = ['Network Installations', 'Camera Installations', 'PBX Systems', 'Intercom Systems', 'AC Systems', 'Solar Installation', 'Multiple Services'];

    openModal(title, `
      <form id="clientModalForm">
        <div class="form-group">
          <label>Name *</label>
          <input type="text" id="clientName" required value="${isEdit ? esc(client.name) : ''}">
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="email" id="clientEmail" value="${isEdit ? esc(client.email || '') : ''}">
        </div>
        <div class="form-group">
          <label>Phone</label>
          <input type="tel" id="clientPhone" value="${isEdit ? esc(client.phone || '') : ''}">
        </div>
        <div class="form-group">
          <label>Address</label>
          <input type="text" id="clientAddress" value="${isEdit ? esc(client.address || '') : ''}">
        </div>
        <div class="form-group">
          <label>Service</label>
          <select id="clientService">
            <option value="">Select service...</option>
            ${serviceOptions.map(s => `<option value="${s}" ${isEdit && client.service === s ? 'selected' : ''}>${s}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label>Notes</label>
          <textarea id="clientNotes">${isEdit ? esc(client.notes || '') : ''}</textarea>
        </div>
        <button type="submit" class="btn btn-primary btn-full">${isEdit ? 'Update Client' : 'Add Client'}</button>
      </form>
    `);

    document.getElementById('clientModalForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const payload = {
        name: document.getElementById('clientName').value.trim(),
        email: document.getElementById('clientEmail').value.trim(),
        phone: document.getElementById('clientPhone').value.trim(),
        address: document.getElementById('clientAddress').value.trim(),
        service: document.getElementById('clientService').value,
        notes: document.getElementById('clientNotes').value.trim()
      };

      try {
        const url = isEdit ? `/api/admin/clients/${client.id}` : '/api/admin/clients';
        const method = isEdit ? 'PUT' : 'POST';
        const res = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();

        if (res.ok && data.success) {
          closeModal();
          loadClients();
          loadStats();
        } else {
          alert(data.error || 'Failed to save client.');
        }
      } catch (err) {
        alert('Connection error.');
      }
    });
  }

  window.editClient = async function(id) {
    try {
      const res = await fetch(`/api/admin/clients/${id}`);
      const client = await res.json();
      showClientForm(client);
    } catch (err) {
      console.error('Failed to load client:', err);
    }
  };

  window.deleteClient = async function(id) {
    if (!confirm('Delete this client?')) return;
    await fetch(`/api/admin/clients/${id}`, { method: 'DELETE' });
    loadClients();
    loadStats();
  };

  // ─── PRODUCTS ───
  let productSearchTimeout;
  document.getElementById('productSearch').addEventListener('input', () => {
    clearTimeout(productSearchTimeout);
    productSearchTimeout = setTimeout(() => loadProducts(), 300);
  });

  document.getElementById('addProductBtn').addEventListener('click', () => {
    showProductForm();
  });

  async function loadProducts() {
    const search = document.getElementById('productSearch').value;
    let url = '/api/admin/products?';
    if (search) url += `search=${encodeURIComponent(search)}`;

    try {
      const res = await fetch(url);
      const products = await res.json();
      const tbody = document.getElementById('productsTableBody');
      const mobileCards = document.getElementById('productsMobileCards');

      if (products.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="empty-state">No products found</td></tr>';
        mobileCards.innerHTML = '<div class="empty-state">No products found</div>';
        return;
      }

      tbody.innerHTML = products.map(p => `
        <tr>
          <td>${esc(p.name)}</td>
          <td>${esc(p.sku || '—')}</td>
          <td>$${Number(p.price).toFixed(2)}</td>
          <td>${p.stock}</td>
          <td>${p.active ? 'Active' : 'Inactive'}</td>
          <td class="actions">
            <button class="action-btn" onclick="editProduct(${p.id})">Edit</button>
            <button class="action-btn danger" onclick="deleteProduct(${p.id})">Delete</button>
          </td>
        </tr>
      `).join('');

      mobileCards.innerHTML = products.map(p => `
        <div class="mobile-card">
          <div class="mobile-card-row"><span class="mobile-card-label">Name</span><span class="mobile-card-value">${esc(p.name)}</span></div>
          <div class="mobile-card-row"><span class="mobile-card-label">SKU</span><span class="mobile-card-value">${esc(p.sku || '—')}</span></div>
          <div class="mobile-card-row"><span class="mobile-card-label">Price</span><span class="mobile-card-value">$${Number(p.price).toFixed(2)}</span></div>
          <div class="mobile-card-row"><span class="mobile-card-label">Stock</span><span class="mobile-card-value">${p.stock}</span></div>
          <div class="mobile-card-row"><span class="mobile-card-label">Status</span><span class="mobile-card-value">${p.active ? 'Active' : 'Inactive'}</span></div>
          <div class="mobile-card-actions">
            <button class="action-btn" onclick="editProduct(${p.id})">Edit</button>
            <button class="action-btn danger" onclick="deleteProduct(${p.id})">Delete</button>
          </div>
        </div>
      `).join('');
    } catch (err) {
      console.error('Failed to load products:', err);
    }
  }

  function showProductForm(product = null) {
    const isEdit = product !== null;
    openModal(isEdit ? 'Edit Product' : 'Add Product', `
      <form id="productModalForm">
        <div class="form-group">
          <label>Name *</label>
          <input type="text" id="productName" required value="${isEdit ? esc(product.name) : ''}">
        </div>
        <div class="form-group">
          <label>SKU</label>
          <input type="text" id="productSku" value="${isEdit ? esc(product.sku || '') : ''}">
        </div>
        <div class="form-group">
          <label>Price *</label>
          <input type="number" id="productPrice" step="0.01" min="0" required value="${isEdit ? esc(product.price) : ''}">
        </div>
        <div class="form-group">
          <label>Stock</label>
          <input type="number" id="productStock" min="0" value="${isEdit ? esc(product.stock) : '0'}">
        </div>
          <div class="form-group">
            <label>Image URL</label>
            <input type="url" id="productImage" value="${isEdit ? esc(product.image_url || '') : ''}">
          </div>
          <div class="form-group">
            <label>Or upload image</label>
            <input type="file" id="productImageFile" accept="image/*">
          </div>
        <div class="form-group">
          <label>Description</label>
          <textarea id="productDescription">${isEdit ? esc(product.description || '') : ''}</textarea>
        </div>
        <div class="form-group">
          <label><input type="checkbox" id="productActive" ${isEdit && product.active ? 'checked' : isEdit ? '' : 'checked'}> Active</label>
        </div>
        <button type="submit" class="btn btn-primary btn-full">${isEdit ? 'Save Product' : 'Create Product'}</button>
      </form>
    `);

    document.getElementById('productModalForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const payload = {
        name: document.getElementById('productName').value.trim(),
        description: document.getElementById('productDescription').value.trim(),
        price: document.getElementById('productPrice').value,
        sku: document.getElementById('productSku').value.trim(),
        image_url: document.getElementById('productImage').value.trim(),
        stock: document.getElementById('productStock').value,
        active: document.getElementById('productActive').checked
      };
        // If a file was selected, upload it first and use returned URL
        const fileInput = document.getElementById('productImageFile');
        if (fileInput && fileInput.files && fileInput.files[0]) {
          const fd = new FormData();
          fd.append('image', fileInput.files[0]);
          try {
            const upRes = await fetch('/work/boss-installations/api/admin/upload-product-image', { method: 'POST', body: fd });
            const upData = await upRes.json();
            if (upRes.ok && upData.success) {
              payload.image_url = upData.url;
            } else {
              alert(upData.error || 'Image upload failed.');
              return;
            }
          } catch (err) {
            alert('Image upload failed.');
            return;
          }
        }

      try {
        const url = isEdit ? `/api/admin/products/${product.id}` : '/api/admin/products';
        const method = isEdit ? 'PUT' : 'POST';
        const res = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (res.ok && data.success) {
          closeModal();
          loadProducts();
        } else {
          alert(data.error || 'Failed to save product.');
        }
      } catch (err) {
        alert('Connection error.');
      }
    });
  }

  window.editProduct = async function(id) {
    try {
      const res = await fetch(`/api/admin/products/${id}`);
      const product = await res.json();
      showProductForm(product);
    } catch (err) {
      console.error('Failed to load product:', err);
    }
  };

  window.deleteProduct = async function(id) {
    if (!confirm('Delete this product?')) return;
    await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
    loadProducts();
  };

  // ─── ORDERS ───
  let orderSearchTimeout;
  document.getElementById('orderSearch').addEventListener('input', () => {
    clearTimeout(orderSearchTimeout);
    orderSearchTimeout = setTimeout(() => loadOrders(), 300);
  });

  async function loadOrders() {
    try {
      const res = await fetch('/work/boss-installations/api/admin/orders');
      const orders = await res.json();
      const tbody = document.getElementById('ordersTableBody');
      const mobileCards = document.getElementById('ordersMobileCards');

      if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="empty-state">No orders yet</td></tr>';
        mobileCards.innerHTML = '<div class="empty-state">No orders yet</div>';
        return;
      }

      tbody.innerHTML = orders.map(o => `
        <tr>
          <td>#${o.id}</td>
          <td>${esc(o.customer_name)}</td>
          <td>$${Number(o.total).toFixed(2)}</td>
          <td>${esc(o.status)}</td>
          <td>${formatDate(o.created_at)}</td>
          <td class="actions">
            <button class="action-btn" onclick="viewOrder(${o.id})">View</button>
          </td>
        </tr>
      `).join('');

      mobileCards.innerHTML = orders.map(o => `
        <div class="mobile-card">
          <div class="mobile-card-row"><span class="mobile-card-label">Order</span><span class="mobile-card-value">#${o.id}</span></div>
          <div class="mobile-card-row"><span class="mobile-card-label">Customer</span><span class="mobile-card-value">${esc(o.customer_name)}</span></div>
          <div class="mobile-card-row"><span class="mobile-card-label">Total</span><span class="mobile-card-value">$${Number(o.total).toFixed(2)}</span></div>
          <div class="mobile-card-row"><span class="mobile-card-label">Status</span><span class="mobile-card-value">${esc(o.status)}</span></div>
          <div class="mobile-card-row"><span class="mobile-card-label">Date</span><span class="mobile-card-value">${formatDate(o.created_at)}</span></div>
          <div class="mobile-card-actions"><button class="action-btn" onclick="viewOrder(${o.id})">View</button></div>
        </div>
      `).join('');
    } catch (err) {
      console.error('Failed to load orders:', err);
    }
  }

  window.viewOrder = async function(id) {
    try {
      const res = await fetch(`/api/admin/orders/${id}`);
      const data = await res.json();
      if (!data.order) return;
      const order = data.order;
      const itemsHtml = data.items.map(item => `
        <div class="detail-row">
          <span class="detail-label">${esc(item.name)}</span>
          <span class="detail-value">${item.quantity} × $${Number(item.price).toFixed(2)}</span>
        </div>
      `).join('');

      openModal('Order #' + order.id, `
        <div class="detail-row"><span class="detail-label">Customer</span><span class="detail-value">${esc(order.customer_name)}</span></div>
        <div class="detail-row"><span class="detail-label">Email</span><span class="detail-value">${esc(order.customer_email)}</span></div>
        <div class="detail-row"><span class="detail-label">Phone</span><span class="detail-value">${esc(order.customer_phone || '—')}</span></div>
        <div class="detail-row"><span class="detail-label">Address</span><span class="detail-value">${esc(order.customer_address || '—')}</span></div>
        <div class="detail-row"><span class="detail-label">Status</span><span class="detail-value">${esc(order.status)}</span></div>
        <div class="detail-row"><span class="detail-label">Total</span><span class="detail-value">$${Number(order.total).toFixed(2)}</span></div>
        <div class="detail-row"><span class="detail-label">Placed</span><span class="detail-value">${formatDate(order.created_at)}</span></div>
        <h4 style="margin:20px 0 10px;">Items</h4>
        ${itemsHtml}
        <div class="form-group">
          <label for="orderStatusSelect">Update Status</label>
          <select id="orderStatusSelect">
            <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
            <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Processing</option>
            <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Completed</option>
            <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
          </select>
        </div>
        <button class="btn btn-primary btn-full" id="saveOrderStatus">Save Status</button>
      `);

      document.getElementById('saveOrderStatus').addEventListener('click', async () => {
        const status = document.getElementById('orderStatusSelect').value;
        const res = await fetch(`/api/admin/orders/${id}/status`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status })
        });
        const result = await res.json();
        if (res.ok && result.success) {
          closeModal();
          loadOrders();
        } else {
          alert(result.error || 'Failed to update order status.');
        }
      });
    } catch (err) {
      console.error('Failed to load order:', err);
    }
  };

  // ─── CHANGE PASSWORD ───
  document.getElementById('changePasswordForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const status = document.getElementById('passwordStatus');
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword !== confirmPassword) {
      status.className = 'password-status error';
      status.textContent = 'New passwords do not match.';
      return;
    }

    try {
      const res = await fetch('/work/boss-installations/api/admin/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      const data = await res.json();

      if (res.ok && data.success) {
        status.className = 'password-status success';
        status.textContent = 'Password updated successfully.';
        document.getElementById('changePasswordForm').reset();
      } else {
        status.className = 'password-status error';
        status.textContent = data.error || 'Failed to update password.';
      }
    } catch (err) {
      status.className = 'password-status error';
      status.textContent = 'Connection error.';
    }
  });

  // ─── MODAL ───
  const modalOverlay = document.getElementById('modalOverlay');
  document.getElementById('modalClose').addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  function openModal(title, bodyHtml) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').innerHTML = bodyHtml;
    modalOverlay.style.display = 'flex';
  }

  function closeModal() {
    modalOverlay.style.display = 'none';
  }

  // ─── HELPERS ───
  function esc(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function formatDate(dateStr) {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  // Make esc available globally for inline handlers
  window.esc = esc;
});
