const vtex = (id) => `https://hmecuador.vtexassets.com/arquivos/ids/${id}-1200-1600`
const LIFE = {
  hero: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=2400&q=80",
  collection: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1800&q=80",
  editorial: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=1800&q=80",
  running: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1400&q=80",
  gym: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1400&q=80",
  training: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1400&q=80",
  jacket: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1400&q=80",
}

const PRODUCTS = [
  { id: "t-shirt", title: "Medusa T-Shirt", category: "Camisetas", price: 10, image: vtex(4498740), hover: vtex(4498736), badge: "NEW" },
  { id: "sweatshirt", title: "Medusa Sweatshirt", category: "Chaquetas", price: 10, image: vtex(4478456), hover: vtex(4478457), badge: "BEST SELLER" },
  { id: "sweatpants", title: "Medusa Sweatpants", category: "Pantalones", price: 10, image: vtex(3939847), hover: vtex(3939844), badge: "LIMITED" },
  { id: "shorts", title: "Medusa Shorts", category: "Shorts", price: 10, image: vtex(4463950), hover: vtex(4463945), badge: "NEW" },
]

const CATEGORIES = [
  { name: "Camisetas", image: LIFE.training, href: "store.html" },
  { name: "Shorts", image: LIFE.running, href: "store.html" },
  { name: "Pantalones", image: LIFE.gym, href: "store.html" },
  { name: "Chaquetas", image: LIFE.jacket, href: "store.html" },
  { name: "Conjuntos", image: LIFE.collection, href: "store.html" },
]

function money(value) {
  return new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" }).format(value)
}

function getCart() {
  try { return JSON.parse(localStorage.getItem("pulse-cart") || "[]") } catch { return [] }
}
function setCart(items) {
  localStorage.setItem("pulse-cart", JSON.stringify(items))
  renderCartCount()
}
function cartCount() { return getCart().reduce((sum, item) => sum + item.qty, 0) }
function addToCart(id) {
  const product = PRODUCTS.find((item) => item.id === id)
  if (!product) return
  const cart = getCart()
  const existing = cart.find((item) => item.id === id)
  if (existing) existing.qty += 1
  else cart.push({ id, qty: 1 })
  setCart(cart)
}
function removeFromCart(id) { setCart(getCart().filter((item) => item.id !== id)) }
function renderCartCount() {
  document.querySelectorAll("[data-cart-count]").forEach((node) => {
    node.textContent = String(cartCount())
  })
}

function header() {
  return `
    <header class="site-header" id="site-header">
      <div class="wrap nav">
        <div class="nav-side left">
          <button class="menu-btn" type="button" data-menu-toggle>Menu</button>
          <a class="brand" href="index.html">Pulse</a>
        </div>
        <div class="nav-center">
          <a href="store.html">Shop</a>
          <a href="store.html">Categories</a>
          <a href="store.html">New</a>
          <a href="store.html">Sale</a>
        </div>
        <div class="nav-side right">
          <a href="store.html">Search</a>
          <a href="cart.html">Cart <span class="cart-badge" data-cart-count>0</span></a>
        </div>
      </div>
      <div class="mobile-menu wrap" id="mobile-menu">
        <a href="store.html">Shop</a>
        <a href="store.html">New</a>
        <a href="store.html">Sale</a>
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
          <p>Ropa deportiva para entrenar, correr y moverte todos los días.</p>
        </div>
        <div class="footer-cols">
          <div>
            <h4>Tienda</h4>
            <ul>${CATEGORIES.map((item) => `<li><a href="${item.href}">${item.name}</a></li>`).join("")}</ul>
          </div>
          <div>
            <h4>Ayuda</h4>
            <ul><li><a href="cart.html">Carrito</a></li><li><a href="store.html">Catálogo</a></li></ul>
          </div>
        </div>
      </div>
      <div class="wrap legal"><span>© ${new Date().getFullYear()} PULSE. Todos los derechos reservados.</span></div>
    </footer>
  `
}

function productCard(product) {
  return `
    <a class="card" href="product.html?id=${product.id}">
      <div class="thumb">
        ${product.badge ? `<span class="badge">${product.badge}</span>` : ""}
        <img src="${product.image}" alt="${product.title}">
        ${product.hover ? `<img class="hover-img" src="${product.hover}" alt="">` : ""}
        <span class="view">Ver producto</span>
      </div>
      <div class="card-body">
        <p>${product.category}</p>
        <h3>${product.title}</h3>
        <strong>${money(product.price)}</strong>
        <span class="meta">Añadir al carrito</span>
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
  const hero = document.getElementById("hero-photo")
  if (hero) hero.src = LIFE.hero
  const collection = document.getElementById("collection-photo")
  if (collection) collection.src = LIFE.collection
  const editorial = document.getElementById("editorial-photo")
  if (editorial) editorial.src = LIFE.editorial
  const featured = document.getElementById("collection-products")
  if (featured) featured.innerHTML = PRODUCTS.slice(0, 3).map(productCard).join("")
  const cats = document.getElementById("categories")
  if (cats) {
    cats.innerHTML = CATEGORIES.map((item) => `
      <a class="cat" href="${item.href}">
        <img src="${item.image}" alt="">
        <div class="cat-copy"><h3>${item.name}</h3><span>→</span></div>
      </a>
    `).join("")
  }
  const arrivals = document.getElementById("arrivals")
  if (arrivals) arrivals.innerHTML = PRODUCTS.map(productCard).join("")
  const sellers = document.getElementById("sellers")
  if (sellers) sellers.innerHTML = [...PRODUCTS].reverse().map((item, index) => {
    const alt = { ...item, image: item.hover || item.image, hover: item.image }
    return productCard(alt)
  }).join("")
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
    <div class="gallery"><img src="${product.image}" alt="${product.title}"></div>
    <div>
      <p class="kicker">${product.category}</p>
      <h1 class="display">${product.title}</h1>
      <p class="price">${money(product.price)}</p>
      <p class="lede">Ropa deportiva diseñada para acompañarte en cada movimiento.</p>
      <div class="options">
        <button class="chip active" type="button">S</button>
        <button class="chip" type="button">M</button>
        <button class="chip" type="button">L</button>
        <button class="chip" type="button">XL</button>
      </div>
      <button class="btn btn-dark" type="button" data-add="${product.id}">Agregar al carrito</button>
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
    event.currentTarget.textContent = "Agregado"
  })
}

function renderCart() {
  mountChrome()
  const root = document.getElementById("cart")
  const items = getCart().map((item) => {
    const product = PRODUCTS.find((entry) => entry.id === item.id)
    return product ? { ...product, qty: item.qty } : null
  }).filter(Boolean)
  if (!items.length) {
    root.innerHTML = `<div class="empty"><p class="kicker">Cart</p><h2 class="display page-title">Tu carrito está vacío</h2><a class="btn btn-dark" href="store.html">Explorar</a></div>`
    return
  }
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0)
  root.innerHTML = `<div class="cart-list">${items.map((item) => `
    <article class="cart-item">
      <img src="${item.image}" alt="${item.title}">
      <div><p class="kicker">${item.category}</p><h3>${item.title}</h3><p>${item.qty} × ${money(item.price)}</p></div>
      <div><strong>${money(item.price * item.qty)}</strong><p><a href="#" data-remove="${item.id}">Eliminar</a></p></div>
    </article>`).join("")}<article class="cart-item"><div></div><div><strong>Total</strong></div><div><strong>${money(total)}</strong></div></article></div>`
  root.querySelectorAll("[data-remove]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault()
      removeFromCart(link.getAttribute("data-remove"))
      renderCart()
    })
  })
}

window.Pulse = { renderHome, renderStore, renderProduct, renderCart }
