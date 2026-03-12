document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  const toast = document.getElementById("toast");
  const productGrid = document.getElementById("product-grid");
  const searchInput = document.getElementById("search-input");
  const cartItemsEl = document.getElementById("cart-items");
  const cartCountEl = document.getElementById("cart-count");
  const cartTotalEl = document.getElementById("cart-total");
  const checkoutBtn = document.getElementById("checkout-btn");

  const detailBackdrop = document.getElementById("product-detail-backdrop");
  const detailCloseBtn = document.getElementById("detail-close");
  const detailBackCatalogBtn = document.getElementById("detail-back-catalog");
  const detailAddBtn = document.getElementById("detail-add-btn");
  const detailTitle = document.getElementById("detail-title");
  const detailMeta = document.getElementById("detail-meta");
  const detailPrice = document.getElementById("detail-price");
  const detailImage = document.getElementById("detail-image");
  const detailCategoryPill = document.getElementById("detail-category-pill");
  const detailTag = document.getElementById("detail-tag");
  const detailBadge = document.getElementById("detail-badge");

  const loginSection = document.getElementById("login-section");
  const shopSection = document.getElementById("shop-section");
  const loginForm = document.getElementById("login-form");
  const authStatus = document.getElementById("auth-status");
  const logoutBtn = document.getElementById("logout-btn");

  const navPills = document.querySelectorAll(".nav-pill");

  const products = [
    {
      id: "p1",
      name: "Aurora Wireless Headphones",
      category: "electronics",
      price: 3799,
      tag: "New",
      badge: "Bestseller",
      meta: "32h battery • Bluetooth 5.3",
      image:
        "https://images.pexels.com/photos/3394664/pexels-photo-3394664.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: "p2",
      name: "CloudSoft Hoodie",
      category: "fashion",
      price: 1899,
      tag: "Trending",
      badge: "Comfort fit",
      meta: "Organic cotton • Unisex",
      image:
        "https://images.pexels.com/photos/6311577/pexels-photo-6311577.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: "p3",
      name: "Midnight Mechanical Keyboard",
      category: "electronics",
      price: 5299,
      tag: "Limited",
      badge: "Tactile switches",
      meta: "Hot‑swappable • RGB",
      image:
        "https://images.pexels.com/photos/907485/pexels-photo-907485.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: "p4",
      name: "BrewMaster Coffee Kit",
      category: "home",
      price: 2499,
      tag: "Gift",
      badge: "Barista grade",
      meta: "Pour‑over • Filters included",
      image:
        "https://images.pexels.com/photos/4109743/pexels-photo-4109743.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: "p5",
      name: "Everyday Essentials Pack",
      category: "grocery",
      price: 1299,
      tag: "Saver combo",
      badge: "Monthly pack",
      meta: "Staple groceries for 1 month",
      image:
        "https://images.pexels.com/photos/4397925/pexels-photo-4397925.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: "p6",
      name: "Luxe Scented Candle Set",
      category: "home",
      price: 1599,
      tag: "Calming",
      badge: "3‑pack",
      meta: "Vanilla • Ocean • Cedar",
      image:
        "https://images.pexels.com/photos/6994142/pexels-photo-6994142.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: "p7",
      name: "Spectrum Studio Monitor",
      category: "electronics",
      price: 8999,
      tag: "Creator pick",
      badge: "Studio grade",
      meta: "Flat response • 5\" woofer",
      image:
        "https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: "p8",
      name: "Orbit Smartwatch",
      category: "electronics",
      price: 6499,
      tag: "Fitness",
      badge: "All‑day health",
      meta: "SpO₂ • GPS • 5ATM",
      image:
        "https://images.pexels.com/photos/2773942/pexels-photo-2773942.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: "p9",
      name: "Everyday Denim Jacket",
      category: "fashion",
      price: 2299,
      tag: "Classic",
      badge: "All‑season",
      meta: "Relaxed fit • Mid‑wash",
      image:
        "https://images.pexels.com/photos/7691088/pexels-photo-7691088.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: "p10",
      name: "Midnight Sneakers",
      category: "fashion",
      price: 3199,
      tag: "Street",
      badge: "Daily wear",
      meta: "Cushioned sole • Unisex",
      image:
        "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: "p11",
      name: "Nordic Throw Blanket",
      category: "home",
      price: 1799,
      tag: "Cozy",
      badge: "Soft weave",
      meta: "Reversible • 200 × 150cm",
      image:
        "https://images.pexels.com/photos/1451471/pexels-photo-1451471.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: "p12",
      name: "Desk Plant Duo",
      category: "home",
      price: 1199,
      tag: "Low maintenance",
      badge: "Set of 2",
      meta: "Succulents in ceramic pots",
      image:
        "https://images.pexels.com/photos/5699665/pexels-photo-5699665.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: "p13",
      name: "Healthy Breakfast Box",
      category: "grocery",
      price: 999,
      tag: "Morning",
      badge: "Energy pack",
      meta: "Cereals • Nuts • Honey",
      image:
        "https://images.pexels.com/photos/3730949/pexels-photo-3730949.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: "p14",
      name: "Weekly Fresh Fruits Crate",
      category: "grocery",
      price: 1499,
      tag: "Fresh",
      badge: "Seasonal mix",
      meta: "5+ varieties • Farm sourced",
      image:
        "https://images.pexels.com/photos/5945848/pexels-photo-5945848.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: "p15",
      name: "Galaxy Gaming Mouse",
      category: "electronics",
      price: 2499,
      tag: "Esports",
      badge: "RGB lighting",
      meta: "6 programmable buttons • 16K DPI",
      image:
        "https://images.pexels.com/photos/907486/pexels-photo-907486.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: "p16",
      name: "Urban Explorer Backpack",
      category: "fashion",
      price: 2799,
      tag: "Travel",
      badge: "Laptop sleeve",
      meta: "Water‑resistant • 20L capacity",
      image:
        "https://images.pexels.com/photos/3747535/pexels-photo-3747535.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: "p17",
      name: "SoftGlow Desk Lamp",
      category: "home",
      price: 1299,
      tag: "Workspace",
      badge: "Touch dimmer",
      meta: "Warm & cool modes • USB powered",
      image:
        "https://images.pexels.com/photos/3651820/pexels-photo-3651820.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: "p18",
      name: "Gourmet Spice Collection",
      category: "grocery",
      price: 899,
      tag: "Kitchen",
      badge: "6‑jar set",
      meta: "World flavors • Resealable jars",
      image:
        "https://images.pexels.com/photos/373882/pexels-photo-373882.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: "p19",
      name: "CloudWalk Running Shoes",
      category: "fashion",
      price: 3499,
      tag: "Performance",
      badge: "Lightweight",
      meta: "Breathable mesh • Shock absorb",
      image:
        "https://images.pexels.com/photos/2529147/pexels-photo-2529147.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: "p20",
      name: "Studio Bluetooth Speaker",
      category: "electronics",
      price: 4599,
      tag: "Party",
      badge: "Deep bass",
      meta: "12h battery • AUX & BT",
      image:
        "https://images.pexels.com/photos/164745/pexels-photo-164745.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ];

  const categoryLabels = {
    all: "All",
    electronics: "Electronics",
    fashion: "Fashion",
    home: "Home & Living",
    grocery: "Grocery",
  };

  const cart = new Map();
  let activeCategory = "all";
  let currentSearch = "";
  let detailProductId = null;

  function formatPrice(amount) {
    return `₹${amount.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");

    window.clearTimeout(showToast._timeout);
    showToast._timeout = window.setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 2600);
  }

  function renderProducts(filterCategory = activeCategory, searchTerm = currentSearch) {
    if (!productGrid) return;

    const normalizedSearch = searchTerm.trim().toLowerCase();

    const filtered = products.filter((product) => {
      if (filterCategory !== "all" && product.category !== filterCategory) {
        return false;
      }

      if (!normalizedSearch) return true;

      const haystack = [
        product.name,
        product.tag,
        product.badge,
        categoryLabels[product.category],
        product.meta,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedSearch);
    });

    productGrid.innerHTML = "";

    if (!filtered.length) {
      const empty = document.createElement("div");
      empty.className = "products-empty";
      empty.innerHTML = `
        <p>No products match your filters.</p>
        <span>Try clearing the search or choosing a different category.</span>
      `;
      productGrid.appendChild(empty);
      return;
    }

    filtered.forEach((product) => {
      const card = document.createElement("article");
      card.className = "product-card";
      card.dataset.id = product.id;

      card.innerHTML = `
        <div class="product-media">
          <div class="product-glow"></div>
          ${
            product.image
              ? `<img class="product-image" src="${product.image}" alt="${product.name}" loading="lazy" />`
              : ""
          }
          <div class="product-pill">${
            categoryLabels[product.category] ?? "Featured"
          }</div>
        </div>
        <div class="product-body">
          <div class="product-main-row">
            <h3 class="product-name">${product.name}</h3>
            <span class="product-price">${formatPrice(product.price)}</span>
          </div>
          <p class="product-meta">${product.meta}</p>
          <div class="product-footer-row">
            <span class="product-tag">${product.tag} • ${product.badge}</span>
            <button class="primary-btn product-add-btn" data-action="add-to-cart" data-id="${
              product.id
            }">
              Add to cart
            </button>
          </div>
        </div>
      `;

      productGrid.appendChild(card);
    });
  }

  function renderCart() {
    if (!cartItemsEl || !cartCountEl || !cartTotalEl || !checkoutBtn) return;

    const entries = Array.from(cart.values());

    if (!entries.length) {
      cartItemsEl.classList.add("cart-items-empty");
      cartItemsEl.innerHTML = `
        <div class="cart-empty-state">
          <p>Your cart is empty.</p>
          <span>Add a couple of products to see them here.</span>
        </div>
      `;
      cartCountEl.textContent = "0 items";
      cartTotalEl.textContent = "₹0.00";
      checkoutBtn.disabled = true;
      return;
    }

    cartItemsEl.classList.remove("cart-items-empty");
    cartItemsEl.innerHTML = "";

    let total = 0;
    let count = 0;

    entries.forEach(({ product, qty }) => {
      total += product.price * qty;
      count += qty;

      const item = document.createElement("div");
      item.className = "cart-item";
      item.dataset.id = product.id;

      item.innerHTML = `
        <div class="cart-item-main">
          <div class="cart-item-text">
            <div class="cart-item-name">${product.name}</div>
            <div class="cart-item-meta">${product.meta}</div>
          </div>
          <button class="cart-remove-btn" data-action="remove" aria-label="Remove ${
            product.name
          } from cart">×</button>
        </div>
        <div class="cart-item-footer">
          <span class="cart-item-price">${formatPrice(product.price * qty)}</span>
          <div class="cart-qty">
            <button class="cart-qty-btn" data-action="decrease">−</button>
            <span class="cart-qty-value">${qty}</span>
            <button class="cart-qty-btn" data-action="increase">+</button>
          </div>
        </div>
      `;

      cartItemsEl.appendChild(item);
    });

    cartCountEl.textContent = `${count} ${count === 1 ? "item" : "items"}`;
    cartTotalEl.textContent = formatPrice(total);
    checkoutBtn.disabled = false;
  }

  function updateAuthUI() {
    const isLoggedIn = localStorage.getItem("novastore_logged_in") === "true";

    if (authStatus) {
      authStatus.textContent = isLoggedIn
        ? "You’re signed in. Happy shopping!"
        : "Sign in to start shopping securely.";
    }

    if (logoutBtn) {
      logoutBtn.style.display = isLoggedIn ? "inline-flex" : "none";
    }

    if (loginSection && shopSection) {
      if (isLoggedIn) {
        loginSection.classList.remove("is-visible");
        loginSection.classList.add("is-hidden");
        shopSection.classList.remove("is-hidden");
        shopSection.classList.add("is-visible");
      } else {
        shopSection.classList.remove("is-visible");
        shopSection.classList.add("is-hidden");
        loginSection.classList.remove("is-hidden");
        loginSection.classList.add("is-visible");
      }
    }
  }

  // Category filters
  navPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      const category = pill.getAttribute("data-filter") || "all";
      activeCategory = category;

      navPills.forEach((p) => p.classList.remove("is-active"));
      pill.classList.add("is-active");

      renderProducts();
    });
  });

  // Search
  if (searchInput) {
    searchInput.addEventListener("input", (event) => {
      currentSearch = event.target.value || "";
      renderProducts();
    });
  }

  // Add to cart (delegated)
  if (productGrid) {
    productGrid.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const action = target.dataset.action;

      if (action === "add-to-cart") {
        const id = target.dataset.id;
        if (!id) return;

        const product = products.find((p) => p.id === id);
        if (!product) return;

        const existing = cart.get(id);
        const nextQty = (existing?.qty ?? 0) + 1;
        cart.set(id, { product, qty: nextQty });

        renderCart();
        showToast(`${product.name} added to cart.`);
        return;
      }

      // Open detail view when clicking card (but not the add button)
      const card = target.closest(".product-card");
      if (!card) return;
      const id = card.dataset.id;
      if (!id) return;

      const product = products.find((p) => p.id === id);
      if (!product) return;

      openProductDetail(product);
    });
  }

  function openProductDetail(product) {
    if (!detailBackdrop) return;
    detailProductId = product.id;

    if (detailTitle) detailTitle.textContent = product.name;
    if (detailMeta) detailMeta.textContent = product.meta;
    if (detailPrice) detailPrice.textContent = formatPrice(product.price);
    if (detailImage) {
      detailImage.src = product.image || "";
      detailImage.alt = product.name;
    }
    if (detailCategoryPill) {
      detailCategoryPill.textContent = categoryLabels[product.category] ?? "Featured";
    }
    if (detailTag) detailTag.textContent = product.tag || "";
    if (detailBadge) detailBadge.textContent = product.badge || "";

    detailBackdrop.classList.add("is-visible");
    detailBackdrop.setAttribute("aria-hidden", "false");
  }

  function closeProductDetail() {
    if (!detailBackdrop) return;
    detailBackdrop.classList.remove("is-visible");
    detailBackdrop.setAttribute("aria-hidden", "true");
    detailProductId = null;
  }

  if (detailCloseBtn) {
    detailCloseBtn.addEventListener("click", () => {
      closeProductDetail();
    });
  }

  if (detailBackdrop) {
    detailBackdrop.addEventListener("click", (event) => {
      if (event.target === detailBackdrop) {
        closeProductDetail();
      }
    });
  }

  if (detailBackCatalogBtn) {
    detailBackCatalogBtn.addEventListener("click", () => {
      closeProductDetail();
    });
  }

  if (detailAddBtn) {
    detailAddBtn.addEventListener("click", () => {
      if (!detailProductId) return;
      const product = products.find((p) => p.id === detailProductId);
      if (!product) return;

      const existing = cart.get(detailProductId);
      const nextQty = (existing?.qty ?? 0) + 1;
      cart.set(detailProductId, { product, qty: nextQty });

      renderCart();
      showToast(`${product.name} added to cart.`);
    });
  }

  // Cart interactions (delegated)
  if (cartItemsEl) {
    cartItemsEl.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;

      const itemEl = target.closest(".cart-item");
      if (!itemEl) return;
      const id = itemEl.dataset.id;
      if (!id) return;

      if (target.dataset.action === "remove") {
        cart.delete(id);
        renderCart();
        return;
      }

      if (target.dataset.action === "increase" || target.dataset.action === "decrease") {
        const entry = cart.get(id);
        if (!entry) return;

        let qty = entry.qty;
        if (target.dataset.action === "increase") {
          qty += 1;
        } else {
          qty -= 1;
        }

        if (qty <= 0) {
          cart.delete(id);
        } else {
          cart.set(id, { product: entry.product, qty });
        }

        renderCart();
      }
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (!cart.size) return;
      showToast("This is a demo checkout. Implement payment here.");
    });
  }

  // Login handling (simple front-end demo)
  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const emailInput = loginForm.querySelector('input[type="email"]');
      const passwordInput = loginForm.querySelector('input[type="password"]');

      const email = emailInput?.value.trim();
      const password = passwordInput?.value.trim();

      if (!email || !password) {
        showToast("Please enter both email and password.");
        return;
      }

      localStorage.setItem("novastore_logged_in", "true");
      showToast("Signed in successfully.");
      updateAuthUI();
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("novastore_logged_in");
      cart.clear();
      renderCart();
      showToast("You’ve been signed out.");
      updateAuthUI();
    });
  }

  // Initial render
  renderProducts();
  renderCart();
  updateAuthUI();
});

