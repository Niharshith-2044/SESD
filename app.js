// ✅ Singleton Class
class AppConfig {
  constructor() {
    if (AppConfig.instance) return AppConfig.instance;
    this.currency = "INR";
    this.taxRate = 0.18;   // 18% GST
    this.discount = 0.05;  // 5% discount
    AppConfig.instance = this;
  }

  calculateFinalPrice(amount) {
    return amount + (amount * this.taxRate) - (amount * this.discount);
  }
}

// ✅ Add food item (on menu.html)
function orderFood(item, price) {
  const config = new AppConfig();
  const finalPrice = config.calculateFinalPrice(price);

  // Save in localStorage
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push({ item, price, finalPrice });
  localStorage.setItem("orders", JSON.stringify(orders));

  alert(`${item} added to cart ✅`);
}

// ✅ Display bill (on cart.html)
function showBill() {
  const config = new AppConfig();
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const billDiv = document.getElementById("bill");

  if (!billDiv) return;

  if (orders.length === 0) {
    billDiv.innerHTML = "<p>No items in cart.</p>";
    return;
  }

  let billHTML = "";
  orders.forEach(o => {
    billHTML += `<p>${o.item} - Base: ₹${o.price} | Final: ₹${o.finalPrice.toFixed(2)}</p>`;
  });
  billDiv.innerHTML = billHTML;

  document.getElementById("config").textContent = JSON.stringify(config, null, 2);
}

// ✅ Clear cart button
function clearCart() {
  localStorage.removeItem("orders");
  showBill();
}

document.addEventListener("DOMContentLoaded", () => {
  showBill();
  const clearBtn = document.getElementById("clearCart");
  if (clearBtn) {
    clearBtn.addEventListener("click", clearCart);
  }
});

// ✅ Test Singleton
const config1 = new AppConfig();
const config2 = new AppConfig();
console.log("Config objects same?", config1 === config2); // true
