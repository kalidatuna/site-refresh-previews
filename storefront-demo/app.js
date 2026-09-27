const products = [
  {id:"carry-01",name:"Transit Tote",category:"bags",emoji:"◼︎",description:"Structured canvas tote with a padded daily-carry sleeve.",variants:[["Sand",6800],["Forest",7200],["Black",7200]]},
  {id:"desk-01",name:"Desk Caddy",category:"desk",emoji:"▦",description:"Modular tray system for cables, pens and pocket items.",variants:[["Oak",4600],["Walnut",5200]]},
  {id:"travel-01",name:"Field Pouch",category:"travel",emoji:"⬢",description:"Compact organizer for chargers, cards and travel documents.",variants:[["Stone",3800],["Moss",3800],["Ink",4000]]},
  {id:"desk-02",name:"Cable Blocks",category:"desk",emoji:"●",description:"Weighted cable guides with soft-touch channels.",variants:[["Set of 3",2400],["Set of 6",3900]]},
  {id:"travel-02",name:"Transit Wallet",category:"travel",emoji:"▰",description:"Slim zip wallet with passport and boarding-pass storage.",variants:[["Clay",5400],["Navy",5400]]},
  {id:"bags-02",name:"Daypack Mini",category:"bags",emoji:"▲",description:"12L daypack with a quick-access top pocket.",variants:[["Olive",8600],["Graphite",8600]]}
];

const money = cents => new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(cents/100);
const storageKey = "northline-demo-cart-v1";
let cart = loadCart();

const grid = document.querySelector("#productGrid");
const count = document.querySelector("#cartCount");
const lines = document.querySelector("#cartLines");
const subtotal = document.querySelector("#subtotal");
const drawer = document.querySelector("#cartDrawer");
const backdrop = document.querySelector("#backdrop");
const toast = document.querySelector("#toast");
const filter = document.querySelector("#categoryFilter");

function loadCart(){
  try{
    const parsed = JSON.parse(localStorage.getItem(storageKey) || "[]");
    return Array.isArray(parsed) ? parsed.filter(x => x && x.productId && x.variant && Number.isInteger(x.qty) && x.qty > 0) : [];
  }catch{return []}
}
function saveCart(){localStorage.setItem(storageKey,JSON.stringify(cart))}
function productFor(id){return products.find(p => p.id === id)}
function lineKey(item){return item.productId + "::" + item.variant}
function variantPrice(product,variant){
  const found = product.variants.find(v => v[0] === variant);
  return found ? found[1] : product.variants[0][1];
}
function productMarkup(product){
  const options = product.variants.map(function(v){
    return '<option value="' + v[0] + '" data-price="' + v[1] + '">' + v[0] + ' · ' + money(v[1]) + '</option>';
  }).join("");
  return '<article class="product">' +
    '<div class="product-visual" aria-hidden="true">' + product.emoji + '</div>' +
    '<div class="product-body"><div class="product-top"><h3>' + product.name + '</h3><span class="price">' + money(product.variants[0][1]) + '</span></div>' +
    '<p>' + product.description + '</p><div class="product-actions">' +
    '<select aria-label="' + product.name + ' variant" data-variant="' + product.id + '">' + options + '</select>' +
    '<button class="add" data-add="' + product.id + '">Add</button></div></div></article>';
}
function renderProducts(category){
  const selected = category || "all";
  const visible = selected === "all" ? products : products.filter(p => p.category === selected);
  grid.innerHTML = visible.map(productMarkup).join("");
}
function addToCart(productId){
  const product = productFor(productId);
  const select = document.querySelector('[data-variant="' + productId + '"]');
  if(!product || !select) return;
  const variant = select.value;
  const key = productId + "::" + variant;
  const existing = cart.find(item => lineKey(item) === key);
  if(existing) existing.qty += 1;
  else cart.push({productId:productId,variant:variant,qty:1});
  persistAndRender();
  showToast(product.name + ", " + variant + " added");
}
function updateQuantity(key,delta){
  const item = cart.find(x => lineKey(x) === key);
  if(!item) return;
  item.qty += delta;
  if(item.qty <= 0) cart = cart.filter(x => lineKey(x) !== key);
  persistAndRender();
}
function persistAndRender(){saveCart();renderCart()}
function cartLineMarkup(item){
  const product = productFor(item.productId);
  if(!product) return "";
  const price = variantPrice(product,item.variant);
  const key = lineKey(item);
  return '<div class="cart-line"><div><h3>' + product.name + '</h3><span class="muted">' + item.variant + ' · ' + money(price) + '</span></div>' +
    '<div class="qty"><button type="button" data-qty="-1" data-key="' + key + '" aria-label="Decrease ' + product.name + ' quantity">−</button>' +
    '<span aria-label="Quantity">' + item.qty + '</span>' +
    '<button type="button" data-qty="1" data-key="' + key + '" aria-label="Increase ' + product.name + ' quantity">+</button></div></div>';
}
function renderCart(){
  count.textContent = String(cart.reduce((sum,item) => sum + item.qty,0));
  if(cart.length === 0){
    lines.innerHTML = '<p class="muted">Your cart is empty. Add a product to continue.</p>';
    subtotal.textContent = money(0);
    return;
  }
  lines.innerHTML = cart.map(cartLineMarkup).join("");
  const total = cart.reduce(function(sum,item){
    const product = productFor(item.productId);
    return product ? sum + variantPrice(product,item.variant) * item.qty : sum;
  },0);
  subtotal.textContent = money(total);
}
function setCart(open){
  drawer.classList.toggle("open",open);
  drawer.setAttribute("aria-hidden",String(!open));
  document.querySelector("#cartToggle").setAttribute("aria-expanded",String(open));
  backdrop.hidden = !open;
  if(open) document.querySelector("#cartClose").focus();
}
function showToast(message){
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"),1800);
}

document.addEventListener("click",function(event){
  const add = event.target.closest("[data-add]");
  if(add) addToCart(add.dataset.add);
  const qty = event.target.closest("[data-qty]");
  if(qty) updateQuantity(qty.dataset.key,Number(qty.dataset.qty));
});
filter.addEventListener("change",() => renderProducts(filter.value));
document.querySelector("#cartToggle").addEventListener("click",() => setCart(true));
document.querySelector("#cartClose").addEventListener("click",() => setCart(false));
backdrop.addEventListener("click",() => setCart(false));

const dialog = document.querySelector("#checkoutDialog");
document.querySelector("#checkoutToggle").addEventListener("click",function(){
  if(cart.length === 0){showToast("Add at least one product before checkout.");return}
  setCart(false);
  dialog.showModal();
});
document.querySelector("#checkoutClose").addEventListener("click",() => dialog.close());
document.querySelector("#checkoutForm").addEventListener("submit",function(event){
  event.preventDefault();
  const error = document.querySelector("#formError");
  const email = document.querySelector("#email");
  const name = document.querySelector("#fullName");
  const address = document.querySelector("#address");
  error.textContent = "";
  if(!email.validity.valid){error.textContent="Enter a valid email address.";email.focus();return}
  if(name.value.trim().length < 2){error.textContent="Enter your full name.";name.focus();return}
  if(address.value.trim().length < 8){error.textContent="Enter a complete delivery address.";address.focus();return}
  if(cart.length === 0){error.textContent="Your cart is empty.";return}
  cart = [];
  persistAndRender();
  dialog.close();
  event.currentTarget.reset();
  showToast("Demo order validated. No payment was processed.");
});

renderProducts("all");
renderCart();