const vtex = (id) => `https://hmecuador.vtexassets.com/arquivos/ids/${id}-1200-1600`
const LIFE = {
  hero: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=2400&q=80",
  collection: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1800&q=80",
  editorial: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=1800&q=80",
  running: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1400&q=80",
  gym: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1400&q=80",
  training: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1400&q=80",
  jacket: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1400&q=80",
  urban: "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=1400&q=80",
}

const PRODUCTS = [
  { id: "t-shirt", title: "Medusa T-Shirt", category: "T-Shirts", price: 10, image: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-black-front.png", hover: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-black-back.png", isNew: false, onSale: false },
  { id: "sweatshirt", title: "Medusa Sweatshirt", category: "Jackets", price: 10, originalPrice: 25, image: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatshirt-vintage-front.png", hover: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatshirt-vintage-back.png", isNew: false, onSale: true },
  { id: "sweatpants", title: "Medusa Sweatpants", category: "Pants", price: 10, image: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-front.png", hover: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-back.png", isNew: false, onSale: false },
  { id: "shorts", title: "Medusa Shorts", category: "Shorts", price: 10, image: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/shorts-vintage-front.png", hover: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/shorts-vintage-back.png", isNew: true, onSale: false },
  { id: "mesh-training-tee", title: "Mesh Training Tee", category: "T-Shirts", price: 39, image: vtex(4498740), hover: vtex(4498736), isNew: true, onSale: false },
  { id: "muscle-fit-tee", title: "Muscle Fit Tee", category: "T-Shirts", price: 35, image: vtex(3893372), hover: vtex(3893368), isNew: true, onSale: false },
  { id: "double-layer-shorts", title: "Double Layer Shorts", category: "Shorts", price: 32, originalPrice: 49, image: vtex(4463950), hover: vtex(4463945), isNew: true, onSale: true },
  { id: "slim-training-joggers", title: "Slim Training Joggers", category: "Pants", price: 39.99, originalPrice: 59.99, image: vtex(3939847), hover: vtex(3939844), isNew: false, onSale: true },
  { id: "relaxed-training-joggers", title: "Relaxed Training Joggers", category: "Pants", price: 36, originalPrice: 55, image: vtex(4394293), hover: vtex(4394289), isNew: false, onSale: true },
  { id: "run-long-sleeve", title: "Run Long Sleeve", category: "Jackets", price: 45, image: vtex(4478456), hover: vtex(4478457), isNew: true, onSale: false },
  { id: "loose-training-tank", title: "Loose Training Tank", category: "T-Shirts", price: 29, image: vtex(4263636), hover: vtex(4263631), isNew: true, onSale: false },
  { id: "studio-performance-tee", title: "Studio Performance Tee", category: "T-Shirts", price: 28, originalPrice: 42, image: vtex(4327420), hover: vtex(4327416), isNew: true, onSale: true },
  { id: "heather-training-joggers", title: "Heather Training Joggers", category: "Pants", price: 34, originalPrice: 52, image: vtex(4039117), hover: vtex(4039114), isNew: false, onSale: true },
  { id: "everyday-training-set-tee", title: "Everyday Training Set Tee", category: "Sets", price: 38, image: vtex(4498741), hover: vtex(4498746), isNew: true, onSale: false },
  { id: "studio-training-cap", title: "Studio Training Cap", category: "Accessories", price: 18, image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1200&q=80", hover: "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=1200&q=80", isNew: true, onSale: false },
  { id: "daily-training-bottle", title: "Daily Training Bottle", category: "Accessories", price: 14, originalPrice: 22, image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=1200&q=80", hover: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1200&q=80", isNew: false, onSale: true },
]

const CATEGORIES = [
  { name: "T-Shirts", image: LIFE.training, href: "store.html?group=T-Shirts" },
  { name: "Shorts", image: LIFE.running, href: "store.html?group=Shorts" },
  { name: "Pants", image: LIFE.gym, href: "store.html?group=Pants" },
  { name: "Jackets", image: LIFE.jacket, href: "store.html?group=Jackets" },
  { name: "Sets", image: LIFE.collection, href: "store.html?group=Sets" },
  { name: "Accessories", image: LIFE.urban, href: "store.html?group=Accessories" },
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
          <a href="categories.html">Categories</a>
          <a href="new.html">New</a>
          <a href="sale.html">Sale</a>
        </div>
        <div class="nav-side right">
          <a href="store.html">Search</a>
          <a href="cart.html">Cart <span class="cart-badge" data-cart-count>0</span></a>
        </div>
      </div>
      <div class="mobile-menu wrap" id="mobile-menu">
        <a href="store.html">Shop</a>
        <a href="categories.html">Categories</a>
        <a href="new.html">New</a>
        <a href="sale.html">Sale</a>
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
            <ul>
              <li><a href="store.html">Todos los productos</a></li>
              <li><a href="new.html">New arrivals</a></li>
              <li><a href="sale.html">Sale</a></li>
            </ul>
          </div>
          <div>
            <h4>Categorías</h4>
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
  const badge = product.onSale ? "SALE" : product.isNew ? "NEW" : ""
  return `
    <a class="card" href="product.html?id=${product.id}">
      <div class="thumb">
        ${badge ? `<span class="badge">${badge}</span>` : ""}
        <img src="${product.image}" alt="${product.title}">
        ${product.hover ? `<img class="hover-img" src="${product.hover}" alt="">` : ""}
        <span class="view">Ver producto</span>
      </div>
      <div class="card-body">
        <p>${product.category}</p>
        <h3>${product.title}</h3>
        <strong>${product.originalPrice ? `<s>${money(product.originalPrice)}</s> ` : ""}${money(product.price)}</strong>
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
  if (arrivals) arrivals.innerHTML = PRODUCTS.filter((item) => item.isNew).slice(0, 8).map(productCard).join("")
  const sellers = document.getElementById("sellers")
  if (sellers) sellers.innerHTML = PRODUCTS.filter((item) => item.onSale).slice(0, 4).map(productCard).join("")
}

function productsForPage(mode) {
  const params = new URLSearchParams(location.search)
  const group = params.get("group")
  let items = PRODUCTS
  if (mode === "new") items = items.filter((item) => item.isNew)
  if (mode === "sale") items = items.filter((item) => item.onSale)
  if (group) items = items.filter((item) => item.category === group)
  return items
}

function renderStore(mode = "all") {
  mountChrome()
  const params = new URLSearchParams(location.search)
  const group = params.get("group")
  const title = document.getElementById("catalog-title")
  const kicker = document.querySelector(".page-kicker")
  if (title) {
    title.textContent =
      mode === "new" ? "New arrivals" : mode === "sale" ? "Sale" : group || "Todos los productos"
  }
  if (kicker) {
    kicker.textContent = mode === "new" ? "New" : mode === "sale" ? "Sale" : group ? "Categories" : "Shop"
  }
  const filters = document.getElementById("catalog-filters")
  if (filters && mode === "all") {
    const items = [{ name: "All", href: "store.html" }, ...CATEGORIES]
    filters.innerHTML = items
      .map((item) => {
        const active = item.name === "All" ? !group : group === item.name
        return `<a class="${active ? "is-active" : ""}" href="${item.href}">${item.name}</a>`
      })
      .join("")
  }
  document.getElementById("catalog").innerHTML = productsForPage(mode).map(productCard).join("")
}

function renderCategories() {
  mountChrome()
  const root = document.getElementById("category-grid")
  if (!root) return
  root.innerHTML = CATEGORIES.map((item) => {
    const count = PRODUCTS.filter((product) => product.category === item.name).length
    return `
      <a class="cat" href="${item.href}">
        <img src="${item.image}" alt="">
        <div class="cat-copy"><h3>${item.name}</h3><span>${count} productos →</span></div>
      </a>
    `
  }).join("")
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

window.Pulse = { renderHome, renderStore, renderCategories, renderProduct, renderCart }
