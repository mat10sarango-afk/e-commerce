const PRODUCTS = [
  {
    id: "t-shirt",
    title: "Medusa T-Shirt",
    category: "Shirts",
    price: 10,
    image:
      "https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-black-front.png",
    description:
      "A clean performance tee cut for movement. Soft hand-feel, silent palette.",
  },
  {
    id: "sweatshirt",
    title: "Medusa Sweatshirt",
    category: "Sweatshirts",
    price: 10,
    image:
      "https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatshirt-vintage-front.png",
    description:
      "Heavyweight comfort with a sharp athletic line. Built for training days.",
  },
  {
    id: "sweatpants",
    title: "Medusa Sweatpants",
    category: "Pants",
    price: 10,
    image:
      "https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-front.png",
    description:
      "Tapered sweats with room to move. Everyday performance, no extra noise.",
  },
  {
    id: "shorts",
    title: "Medusa Shorts",
    category: "Merch",
    price: 10,
    image:
      "https://medusa-public-images.s3.eu-west-1.amazonaws.com/shorts-vintage-front.png",
    description:
      "Light, durable shorts for speed work and recovery days.",
  },
]

const CATEGORIES = ["Shirts", "Sweatshirts", "Pants", "Merch"]

function money(value) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
  }).format(value)
}

function getCart() {
  try {
    return JSON.parse(localStorage.getItem("pulse-cart") || "[]")
  } catch {
    return []
  }
}

function setCart(items) {
  localStorage.setItem("pulse-cart", JSON.stringify(items))
  renderCartCount()
}

function cartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0)
}

function addToCart(id) {
  const product = PRODUCTS.find((item) => item.id === id)
  if (!product) return
  const cart = getCart()
  const existing = cart.find((item) => item.id === id)
  if (existing) existing.qty += 1
  else cart.push({ id, qty: 1 })
  setCart(cart)
}

function removeFromCart(id) {
  setCart(getCart().filter((item) => item.id !== id))
}

function renderCartCount() {
  document.querySelectorAll("[data-cart-count]").forEach((node) => {
    node.textContent = String(cartCount())
  })
}

function header(active = "home") {
  return `
    <header class="site-header" id="site-header">
      <div class="wrap nav">
        <div class="nav-side left">
          <button class="menu-btn" type="button" data-menu-toggle>Menu</button>
          <a class="nav-link" href="store.html">Store</a>
          ${CATEGORIES.map(
            (name) =>
              `<a class="nav-link" href="store.html#${name.toLowerCase()}">${name}</a>`
          ).join("")}
        </div>
        <a class="brand" href="index.html">Pulse</a>
        <div class="nav-side right">
          <a class="account-link" href="store.html">Account</a>
          <a href="cart.html">Cart <span class="cart-badge" data-cart-count>0</span></a>
        </div>
      </div>
      <div class="mobile-menu wrap" id="mobile-menu">
        <a href="store.html">Store</a>
        ${CATEGORIES.map(
          (name) => `<a href="store.html#${name.toLowerCase()}">${name}</a>`
        ).join("")}
        <a href="cart.html">Cart</a>
      </div>
    </header>
  `
}

function footer() {
  return `
    <footer class="site-footer">
      <div class="wrap footer-grid">
        <div class="footer-brand">
          <a class="brand" href="index.html">Pulse</a>
          <p>Performance gear built for speed, training and everyday movement.</p>
        </div>
        <div class="footer-cols">
          <div>
            <h4>Categories</h4>
            <ul>
              ${CATEGORIES.map(
                (name) =>
                  `<li><a href="store.html#${name.toLowerCase()}">${name}</a></li>`
              ).join("")}
            </ul>
          </div>
          <div>
            <h4>Shop</h4>
            <ul>
              <li><a href="store.html">All products</a></li>
              <li><a href="cart.html">Cart</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="wrap legal">
        <span>© ${new Date().getFullYear()} PULSE. All rights reserved.</span>
        <span>Live preview</span>
      </div>
    </footer>
  `
}

function productCard(product) {
  return `
    <a class="card" href="product.html?id=${product.id}">
      <div class="thumb">
        <img src="${product.image}" alt="${product.title}">
        <span class="view">View product</span>
      </div>
      <div class="card-body">
        <p>${product.category}</p>
        <h3>${product.title}</h3>
        <strong>${money(product.price)}</strong>
      </div>
    </a>
  `
}

function mountChrome() {
  const headerNode = document.getElementById("header")
  const footerNode = document.getElementById("footer")
  if (headerNode) headerNode.innerHTML = header()
  if (footerNode) footerNode.innerHTML = footer()

  const toggle = document.querySelector("[data-menu-toggle]")
  const menu = document.getElementById("mobile-menu")
  toggle?.addEventListener("click", () => menu?.classList.toggle("open"))

  const headerEl = document.getElementById("site-header")
  const onScroll = () => headerEl?.classList.toggle("is-scrolled", window.scrollY > 12)
  onScroll()
  window.addEventListener("scroll", onScroll, { passive: true })
  renderCartCount()
}

function renderHome() {
  mountChrome()
  document.getElementById("categories").innerHTML = CATEGORIES.map(
    (name) => `
      <a class="cat" href="store.html#${name.toLowerCase()}">
        <div class="cat-copy">
          <p class="kicker">Category</p>
          <h3>${name}</h3>
        </div>
      </a>
    `
  ).join("")
  document.getElementById("featured").innerHTML = PRODUCTS.map(productCard).join("")
}

function renderStore() {
  mountChrome()
  document.getElementById("catalog").innerHTML = PRODUCTS.map(productCard).join("")
}

function renderProduct() {
  mountChrome()
  const id = new URLSearchParams(location.search).get("id")
  const product = PRODUCTS.find((item) => item.id === id) || PRODUCTS[0]
  document.getElementById("product").innerHTML = `
    <div class="gallery">
      <img src="${product.image}" alt="${product.title}">
    </div>
    <div>
      <p class="kicker">${product.category}</p>
      <h1 class="display">${product.title}</h1>
      <p class="price">${money(product.price)}</p>
      <p class="lede">${product.description}</p>
      <div class="options">
        <button class="chip active" type="button">S</button>
        <button class="chip" type="button">M</button>
        <button class="chip" type="button">L</button>
        <button class="chip" type="button">XL</button>
      </div>
      <button class="btn btn-dark" type="button" data-add="${product.id}">Add to cart</button>
    </div>
  `
  document.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".chip").forEach((node) => node.classList.remove("active"))
      chip.classList.add("active")
    })
  })
  document.querySelector("[data-add]")?.addEventListener("click", (event) => {
    addToCart(event.currentTarget.getAttribute("data-add"))
    event.currentTarget.textContent = "Added"
  })
}

function renderCart() {
  mountChrome()
  const root = document.getElementById("cart")
  const items = getCart()
    .map((item) => {
      const product = PRODUCTS.find((entry) => entry.id === item.id)
      return product ? { ...product, qty: item.qty } : null
    })
    .filter(Boolean)

  if (!items.length) {
    root.innerHTML = `
      <div class="empty">
        <p class="kicker">Cart</p>
        <h2 class="display page-title">Your cart is empty</h2>
        <p class="lede" style="margin: 1rem auto 1.5rem">Move faster. Train harder.</p>
        <a class="btn btn-dark" href="store.html">Explore the store</a>
      </div>
    `
    return
  }

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0)
  root.innerHTML = `
    <div class="cart-list">
      ${items
        .map(
          (item) => `
        <article class="cart-item">
          <img src="${item.image}" alt="${item.title}">
          <div>
            <p class="kicker">${item.category}</p>
            <h3>${item.title}</h3>
            <p>${item.qty} × ${money(item.price)}</p>
          </div>
          <div>
            <strong>${money(item.price * item.qty)}</strong>
            <p><a href="#" data-remove="${item.id}">Remove</a></p>
          </div>
        </article>
      `
        )
        .join("")}
      <article class="cart-item">
        <div></div>
        <div><strong>Total</strong></div>
        <div><strong>${money(total)}</strong></div>
      </article>
    </div>
  `
  root.querySelectorAll("[data-remove]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault()
      removeFromCart(link.getAttribute("data-remove"))
      renderCart()
    })
  })
}

window.Pulse = { renderHome, renderStore, renderProduct, renderCart }
