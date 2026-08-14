// Ganja Gourmet - Frontend Application Logic

// Medical Strains Data (from backend)
const medicalStrains = [
  {
    id: "strain-001",
    name: "Jamaican Blue Mountain",
    type: "Hybrid",
    thc: "12-15%",
    cbd: "8-12%",
    price: "J$800",
    quantity: 45,
    description: "A balanced hybrid with relaxing body effects and mild cerebral stimulation. Excellent for pain management and anxiety relief.",
    effects: ["Pain Relief", "Relaxation", "Mood Enhancement"],
    batch: "JBM-2026-001"
  },
  {
    id: "strain-002",
    name: "Caribbean Sunrise",
    type: "Sativa",
    thc: "14-18%",
    cbd: "2-4%",
    price: "J$900",
    quantity: 32,
    description: "Energizing sativa with uplifting effects. Great for daytime use and managing depression or fatigue.",
    effects: ["Energy", "Focus", "Creativity", "Euphoria"],
    batch: "CS-2026-002"
  },
  {
    id: "strain-003",
    name: "Island Indica",
    type: "Indica",
    thc: "16-20%",
    cbd: "1-3%",
    price: "J$950",
    quantity: 28,
    description: "Deep relaxation and sedation. Perfect for evening use and sleep disorders. Strong body high.",
    effects: ["Relaxation", "Sedation", "Body High", "Sleep"],
    batch: "II-2026-003"
  },
  {
    id: "strain-004",
    name: "Ganja Wellness Blend",
    type: "Hybrid (CBD-Rich)",
    thc: "5-8%",
    cbd: "15-20%",
    price: "J$1,200",
    quantity: 52,
    description: "High-CBD, low-THC blend for medical patients seeking therapeutic benefits without strong psychoactive effects.",
    effects: ["Calm", "Clear-headed", "Pain Relief", "Anti-inflammatory"],
    batch: "GWB-2026-004"
  },
  {
    id: "strain-005",
    name: "Tropical Remedy",
    type: "Hybrid",
    thc: "10-13%",
    cbd: "10-14%",
    price: "J$850",
    quantity: 38,
    description: "Balanced cannabinoid profile for comprehensive therapeutic benefits. Mild effects suitable for sensitive patients.",
    effects: ["Balance", "Gentle Relaxation", "Mental Clarity", "Comfort"],
    batch: "TR-2026-005"
  },
  {
    id: "strain-006",
    name: "Montego Bay Medical",
    type: "Sativa",
    thc: "13-16%",
    cbd: "5-8%",
    price: "J$880",
    quantity: 41,
    description: "Uplifting sativa with balanced cannabinoids. Good for daytime pain management and mood support.",
    effects: ["Uplift", "Focus", "Pain Relief", "Motivation"],
    batch: "MB-2026-006"
  }
];

// State Management
let cart = [];
let complianceLog = [];
let currentFilter = 'all';
let ageVerified = false;

// ===== AGE VERIFICATION =====
const verifyAgeBtn = document.getElementById('verifyAgeBtn');
const declineAgeBtn = document.getElementById('declineBtn');

if (verifyAgeBtn) {
  verifyAgeBtn.addEventListener('click', verifyAge);
}

if (declineAgeBtn) {
  declineAgeBtn.addEventListener('click', declineAge);
}

function verifyAge() {
  const birthYear = +document.getElementById('birthYear').value;
  
  if (!birthYear) {
    alert('Please select your birth year');
    return;
  }
  
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;
  
  if (age >= 21) {
    ageVerified = true;
    document.getElementById('ageVerificationModal').style.display = 'none';
    document.getElementById('mainSite').classList.remove('hidden');
    
    // Log compliance event
    logComplianceEvent('Age Verification', `User verified as 21+ (Age: ${age})`);
    
    // Load initial content
    if (typeof loadCatalog === 'function') {
      loadCatalog();
    }
  } else {
    alert('You must be 21 or older to access this site.');
  }
}

function declineAge() {
  alert('You must be 21 or older to access this site. Redirecting...');
  globalThis.location.assign('https://www.jamaica.gov.jm');
}

// ===== NAVIGATION =====
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const page = e.currentTarget.dataset.page;
    switchPage(page);
  });
});

function switchPage(page) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  
  // Show selected page
  document.getElementById(page + 'Page').classList.add('active');
  
  // Update nav
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.dataset.page === page) {
      link.classList.add('active');
    }
  });
  
  // Load page content
  if (page === 'catalog') {
    loadCatalog();
  } else if (page === 'cart') {
    loadCart();
  } else if (page === 'admin') {
    loadAdminDashboard();
  }
}

// ===== CATALOG =====
function loadCatalog() {
  const grid = document.getElementById('strainGrid');
  grid.innerHTML = '';
  
  const filteredStrains = currentFilter === 'all' 
    ? medicalStrains 
    : medicalStrains.filter(s => s.type === currentFilter);
  
  filteredStrains.forEach(strain => {
    const card = createStrainCard(strain);
    grid.appendChild(card);
  });
}

function createStrainCard(strain) {
  const card = document.createElement('div');
  card.className = 'strain-card';
  
  const inStock = strain.quantity > 0;
  const lowStock = strain.quantity < 10;
  
  card.innerHTML = `
    <div class="strain-header">
      <div class="strain-name">${strain.name}</div>
      <div class="strain-type">${strain.type}</div>
    </div>
    <div class="strain-body">
      <div class="strain-stats">
        <div class="stat">
          <div class="stat-label">THC</div>
          <div class="stat-value">${strain.thc}</div>
        </div>
        <div class="stat">
          <div class="stat-label">CBD</div>
          <div class="stat-value">${strain.cbd}</div>
        </div>
      </div>
      
      <div class="strain-description">${strain.description}</div>
      
      <div class="strain-effects">
        <div class="effects-label">Effects:</div>
        ${strain.effects.map(e => `<span class="effect-tag">${e}</span>`).join('')}
      </div>
      
      <div class="strain-price">${strain.price}/gram</div>
      <div class="strain-stock ${lowStock ? 'low-stock' : ''}">${inStock ? `${strain.quantity}g in stock` : 'Out of stock'}</div>
    </div>
    <button class="btn btn-primary" ${inStock ? '' : 'disabled'} onclick="addToCart('${strain.id}')">Add to Cart</button>
  `;
  return card;
}

// ...rest of the JS logic (cart, admin, compliance log, etc.)
