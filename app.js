// Basic product catalog and cart logic for the NovaStore demo

const products = [
  {
    id: "p1",
    name: "Aurora Wireless Headphones",
    category: "Audio",
    price: 149.99,
    tag: "Best seller",
    image:
      "https://images.pexels.com/photos/3394664/pexels-photo-3394664.jpeg?auto=compress&cs=tinysrgb&w=1200",
    shortDescription: "Noise‑cancelling over‑ear headphones with 30h battery.",
    description:
      "Immerse yourself in rich, detailed sound with active noise cancellation, soft memory‑foam ear cups and multi‑device pairing for seamless switching between your phone and laptop.",
    badges: ["Wireless", "Noise cancelling", "30h battery", "USB‑C charging"]
  },
  {
    id: "p2",
    name: "Lumen Smart Lamp",
    category: "Home",
    price: 89.0,
    tag: "Smart home",
    image:
      "https://images.pexels.com/photos/132340/pexels-photo-132340.jpeg?auto=compress&cs=tinysrgb&w=1200",
    shortDescription: "Warm and cool tones with app and voice control.",
    description:
      "Create the perfect ambience with millions of colors, adjustable warmth and deep dimming. Works with major smart home platforms and includes gentle sunrise mode.",
    badges: ["App control", "Voice assistant", "RGB", "Energy efficient"]
  },
  {
    id: "p3",
    name: "Nimbus Mechanical Keyboard",
    category: "Accessories",
    price: 129.5,
    tag: "Creator pick",
    image:
      "https://images.pexels.com/photos/196659/pexels-photo-196659.jpeg?auto=compress&cs=tinysrgb&w=1200",
    shortDescription: "Compact 75% layout with hot‑swappable switches.",
    description:
      "A premium typing experience in a compact footprint. Featuring hot‑swappable switches, per‑key RGB, PBT keycaps and a solid aluminum frame that stays planted on your desk.",
    badges: ["Hot‑swappable", "75% layout", "RGB", "USB‑C"]
  },
  {
    id: "p4",
    name: "Voyager Everyday Backpack",
    category: "Lifestyle",
    price: 109.99,
    tag: "New arrival",
    image:
      "https://images.pexels.com/photos/7698824/pexels-photo-7698824.jpeg?auto=compress&cs=tinysrgb&w=1200",
    shortDescription: "Weather‑resistant backpack for work and travel.",
    description:
      "Thoughtful organization for tech and essentials, with a suspended laptop sleeve, hidden passport pocket and water‑resistant fabric that keeps everything protected.",
    badges: ["Weather‑resistant", "16\" laptop", "Hidden pockets", "Carry‑on"]
  },
  {
    id: "p5",
    name: "Pulse Fitness Watch",
    category: "Wearables",
    price: 179.0,
    tag: "Health",
    image:
      "https://images.pexels.com/photos/4370388/pexels-photo-4370388.jpeg?auto=compress&cs=tinysrgb&w=1200",
    shortDescription: "Track workouts, sleep and heart rate all day.",
    description:
      "Stay on top of your health with advanced tracking for workouts, heart rate, sleep stages and stress levels, plus guided breathing sessions and long‑lasting battery.",
    badges: ["Heart rate", "GPS", "Sleep tracking", "Water resistant"]
  },
  {
    id: "p6",
    name: "Zen Brew Coffee Maker",
    category: "Kitchen",
    price: 99.99,
    tag: "Home barista",
    image:
      "https://images.pexels.com/photos/3028963/pexels-photo-3028963.jpeg?auto=compress&cs=tinysrgb&w=1200",
    shortDescription: "Programmable pour‑over style coffee at home.",
    description:
      "Brew café‑quality coffee with precise temperature control, bloom timing and programmable recipes. Includes a reusable stainless filter and insulated carafe.",
    badges: ["Programmable", "Pour‑over style", "Thermal carafe", "Reusable filter"]
  }
];

const AUTH_KEY = "novastore_auth";
const CART_KEY = "novastore_cart";

const $ = selector => document.querySelector(selector);

const sections = document.querySelectorAll(".section");
const navPills = document.querySelectorAll(".nav-pill[data-section-target]");

const productGrid = $("#productGrid");
const productsEmpty = $("#productsEmpty");
const searchInput = $("#searchInput");

const cartItemsEl = $("#cartItems");
const cartCountEl = $("#cartCount");
const cartTotalEl = $("#cartTotal");
const checkoutBtn = $("#checkoutBtn");

const detailBackdrop = $("#detailBackdrop");
const detailImage = $("#detailImage");
const detailCategory = $("#detailCategory");
const detailTitle = $("#detailTitle");
const detailMeta = $("#detailMeta");
const detailPrice = $("#detailPrice");
const detailDescription = $("#detailDescription");
const detailTags = $("#detailTags");
const detailAddBtn = $("#detailAddBtn");
const detailCloseBtn = $("#detailCloseBtn");
const detailCloseSecondary = $("#detailCloseSecondary");

const authStatusEl = $("#authStatus");
const authToggleBtn = $("#authToggleBtn");
const loginForm = $("#loginForm");
const loginEmail = $("#loginEmail");
const loginPassword = $("#loginPassword");

const toastEl = $("#toast");
const toastMessageEl = $("#toastMessage");

let cart = loadCart();
let currentDetailProduct = null;
let authState = loadAuth();

// --- Helpers ---

function showToast(message) {
  if (!toastEl) return;
  toastMessageEl.textContent = message;
  toastEl.classList.add("is-visible");
  setTimeout(() => {
    toastEl.classList.remove("is-visible");
  }, 2600);
}

function formatPrice(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(value);
}

function saveCart() {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch {
    // ignore storage errors in this demo
  }
}

function loadCart() {
  try {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveAuth() {
  try {
    localStorage.setItem(AUTH_KEY, JSON.stringify(authState));
  } catch {
    // ignore
  }
}

function loadAuth() {
  try {
    const stored = localStorage.getItem(AUTH_KEY);
    return stored ? JSON.parse(stored) : { isLoggedIn: false, email: null };
  } catch {
    return { isLoggedIn: false, email: null };
  }
}

// --- Section navigation ---

function showSection(sectionId) {
  sections.forEach(section => {
    section.classList.toggle("is-visible", section.id === sectionId);
  });
  navPills.forEach(pill => {
    pill.classList.toggle(
      "is-active",
      pill.dataset.sectionTarget === sectionId
    );
  });
}

navPills.forEach(pill => {
  pill.addEventListener("click", () => {
    const targetId = pill.dataset.sectionTarget;
    if (targetId) {
      showSection(targetId);
    }
  });
});

// --- Products ---

function createProductCard(product) {
  const card = document.createElement("article");
  card.className = "product-card";
  card.dataset.productId = product.id;

  card.innerHTML = `
    <div class="product-media">
      <div class="product-glow"></div>
      <img class="product-image" src="${product.image}" alt="${product.name}" loading="lazy" />
      <div class="product-pill">${product.category}</div>
    </div>
    <div class="product-body">
      <div class="product-main-row">
        <div>
          <h3 class="product-name">${product.name}</h3>
          <p class="product-meta">${product.shortDescription}</p>
        </div>
        <span class="product-price">${formatPrice(product.price)}</span>
      </div>
      <div class="product-footer-row">
        <span class="product-tag">${product.tag}</span>
        <button class="primary-btn product-add-btn" type="button">
          Add to cart
        </button>
      </div>
    </div>
  `;

  const addBtn = card.querySelector(".product-add-btn");
  addBtn.addEventListener("click", event => {
    event.stopPropagation();
    addToCart(product.id);
  });

  card.addEventListener("click", () => {
    openDetail(product);
  });

  return card;
}

function renderProducts(filterText = "") {
  if (!productGrid) return;
  productGrid.innerHTML = "";

  const normalized = filterText.trim().toLowerCase();
  const filtered = normalized
    ? products.filter(p => {
        const haystack = `${p.name} ${p.category} ${p.tag} ${p.shortDescription} ${p.badges.join(
          " "
        )}`.toLowerCase();
        return haystack.includes(normalized);
      })
    : products;

  if (!filtered.length) {
    productsEmpty.classList.remove("is-hidden");
    return;
  }

  productsEmpty.classList.add("is-hidden");
  filtered.forEach(p => {
    const card = createProductCard(p);
    productGrid.appendChild(card);
  });
}

if (searchInput) {
  searchInput.addEventListener("input", event => {
    renderProducts(event.target.value);
  });
}

// --- Cart ---

function addToCart(productId) {
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }
  saveCart();
  renderCart();
  const product = products.find(p => p.id === productId);
  if (product) {
    showToast(`${product.name} added to cart`);
  }
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  renderCart();
}

function updateCartQuantity(productId, delta) {
  const entry = cart.find(item => item.id === productId);
  if (!entry) return;
  entry.quantity += delta;
  if (entry.quantity <= 0) {
    removeFromCart(productId);
  } else {
    saveCart();
    renderCart();
  }
}

function renderCart() {
  if (!cartItemsEl) return;

  cartItemsEl.innerHTML = "";

  if (!cart.length) {
    cartItemsEl.classList.add("cart-items-empty");
    cartItemsEl.innerHTML = `
      <div class="cart-empty-state">
        <p>Your cart is empty</p>
        <span>Add something from the shop to get started.</span>
      </div>
    `;
    cartCountEl.textContent = "0 items";
    cartTotalEl.textContent = formatPrice(0);
    checkoutBtn.disabled = true;
    return;
  }

  cartItemsEl.classList.remove("cart-items-empty");

  let total = 0;
  let count = 0;

  cart.forEach(entry => {
    const product = products.find(p => p.id === entry.id);
    if (!product) return;

    const lineTotal = product.price * entry.quantity;
    total += lineTotal;
    count += entry.quantity;

    const itemEl = document.createElement("div");
    itemEl.className = "cart-item";
    itemEl.innerHTML = `
      <div class="cart-item-main">
        <div class="cart-item-text">
          <span class="cart-item-name">${product.name}</span>
          <span class="cart-item-meta">
            ${product.category} • ${formatPrice(product.price)} each
          </span>
        </div>
        <button class="cart-remove-btn" type="button" aria-label="Remove item">✕</button>
      </div>
      <div class="cart-item-footer">
        <span class="cart-item-price">${formatPrice(lineTotal)}</span>
        <div class="cart-qty">
          <button class="cart-qty-btn" type="button" aria-label="Decrease quantity">−</button>
          <span class="cart-qty-value">${entry.quantity}</span>
          <button class="cart-qty-btn" type="button" aria-label="Increase quantity">+</button>
        </div>
      </div>
    `;

    const [decreaseBtn, increaseBtn] = itemEl.querySelectorAll(".cart-qty-btn");
    const removeBtn = itemEl.querySelector(".cart-remove-btn");

    decreaseBtn.addEventListener("click", () =>
      updateCartQuantity(entry.id, -1)
    );
    increaseBtn.addEventListener("click", () =>
      updateCartQuantity(entry.id, 1)
    );
    removeBtn.addEventListener("click", () => removeFromCart(entry.id));

    cartItemsEl.appendChild(itemEl);
  });

  cartCountEl.textContent = `${count} item${count === 1 ? "" : "s"}`;
  cartTotalEl.textContent = formatPrice(total);
  checkoutBtn.disabled = !cart.length;
}

if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    if (!authState.isLoggedIn) {
      showToast("Please sign in before checking out.");
      showSection("login-section");
      return;
    }
    showToast("Checkout demo – hook this up to your backend.");
  });
}

// --- Product details overlay ---

function openDetail(product) {
  currentDetailProduct = product;
  if (!detailBackdrop) return;

  detailImage.src = product.image;
  detailImage.alt = product.name;
  detailCategory.textContent = product.category;
  detailTitle.textContent = product.name;
  detailMeta.textContent = product.shortDescription;
  detailPrice.textContent = formatPrice(product.price);
  detailDescription.textContent = product.description;

  detailTags.innerHTML = "";
  product.badges.forEach(badge => {
    const pill = document.createElement("span");
    pill.className = "detail-tag-pill";
    pill.textContent = badge;
    detailTags.appendChild(pill);
  });

  detailBackdrop.classList.add("is-visible");
}

function closeDetail() {
  if (!detailBackdrop) return;
  detailBackdrop.classList.remove("is-visible");
  currentDetailProduct = null;
}

if (detailAddBtn) {
  detailAddBtn.addEventListener("click", () => {
    if (currentDetailProduct) {
      addToCart(currentDetailProduct.id);
    }
  });
}

if (detailCloseBtn) {
  detailCloseBtn.addEventListener("click", closeDetail);
}

if (detailCloseSecondary) {
  detailCloseSecondary.addEventListener("click", closeDetail);
}

if (detailBackdrop) {
  detailBackdrop.addEventListener("click", event => {
    if (event.target === detailBackdrop) {
      closeDetail();
    }
  });
}

// --- Auth / Login ---

function updateAuthUI() {
  if (!authState.isLoggedIn) {
    authStatusEl.textContent = "Not signed in";
    authToggleBtn.textContent = "Sign in";
    authToggleBtn.dataset.action = "signin";
  } else {
    authStatusEl.textContent = `Signed in as ${authState.email}`;
    authToggleBtn.textContent = "Sign out";
    authToggleBtn.dataset.action = "signout";
  }
}

if (authToggleBtn) {
  authToggleBtn.addEventListener("click", () => {
    if (authToggleBtn.dataset.action === "signout") {
      authState = { isLoggedIn: false, email: null };
      saveAuth();
      updateAuthUI();
      showToast("Signed out successfully.");
    } else {
      showSection("login-section");
    }
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", event => {
    event.preventDefault();
    const email = loginEmail.value.trim();
    const password = loginPassword.value.trim();

    if (!email || !password) {
      showToast("Please fill in both email and password.");
      return;
    }

    // Demo credentials – replace with real API call in production
    if (email === "demo@novastore.com" && password === "password123") {
      authState = { isLoggedIn: true, email };
      saveAuth();
      updateAuthUI();
      showToast("Signed in successfully.");
      showSection("shop-section");
    } else {
      showToast("Invalid demo credentials. Try the email and password shown.");
    }
  });
}

// --- Initial render ---

function init() {
  renderProducts();
  renderCart();
  updateAuthUI();
}

document.addEventListener("DOMContentLoaded", init);

