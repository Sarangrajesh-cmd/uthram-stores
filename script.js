const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

const filters = document.querySelectorAll(".filter");
const cards = [...document.querySelectorAll(".product-card")];
const search = document.getElementById("productSearch");
const noResults = document.getElementById("noResults");
let activeCategory = "all";
function filterProducts() {
  const term = search.value.trim().toLowerCase();
  let visible = 0;
  cards.forEach(card => {
    const categoryMatch = activeCategory === "all" || card.dataset.category === activeCategory;
    const searchMatch = card.dataset.name.toLowerCase().includes(term);
    const show = categoryMatch && searchMatch;
    card.hidden = !show;
    if (show) visible++;
  });
  noResults.hidden = visible !== 0;
}
filters.forEach(button => button.addEventListener("click", () => {
  filters.forEach(item => item.classList.remove("active"));
  button.classList.add("active");
  activeCategory = button.dataset.filter;
  filterProducts();
}));
search.addEventListener("input", filterProducts);

const order = new Map();
const dock = document.getElementById("orderDock");
const count = document.getElementById("orderCount");
function updateOrder() {
  const total = [...order.values()].reduce((sum, qty) => sum + qty, 0);
  count.textContent = total;
  dock.hidden = total === 0;
}
document.querySelectorAll(".add-order").forEach(button => button.addEventListener("click", () => {
  const name = button.dataset.product;
  order.set(name, (order.get(name) || 0) + 1);
  updateOrder();
  button.innerHTML = "Added <span>✓</span>";
  setTimeout(() => button.innerHTML = 'Add to order <span>＋</span>', 900);
}));
document.getElementById("sendOrder").addEventListener("click", () => {
  const lines = [...order.entries()].map(([name, qty]) => `${name} – Qty: ${qty}`).join("\n");
  const message = `Hello Uthram Stores, I would like to enquire about the following items:\n${lines}\nPlease confirm price and availability.`;
  window.open(`https://wa.me/917994773912?text=${encodeURIComponent(message)}`, "_blank", "noopener");
});
document.getElementById("clearOrder").addEventListener("click", () => {
  order.clear();
  updateOrder();
});
document.getElementById("year").textContent = new Date().getFullYear();
