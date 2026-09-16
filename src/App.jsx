import { useState } from "react";
import { dishes, deliveryInfo } from "./data";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import BagChoiceModal from "./components/BagChoiceModal";
import PaymentModal from "./components/PaymentModal";
import "./App.css";

export default function App() {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showPayment, setShowPayment] = useState(false);
  const [bagType, setBagType] = useState(null);
  const [showBagChoice, setShowBagChoice] = useState(false);

  function addToCart(dish) {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...dish, quantity: 1 }];
    });
    setBagType(null);
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
    setBagType(null);
  }

  function handlePlaceOrder() {
    if (bagType === null) setShowBagChoice(true);
    else setShowPayment(true);
  }

  function handleBagConfirm(type) {
    setBagType(type);
    setShowBagChoice(false);
    setShowPayment(true);
  }

  function handleBagCancel() {
    setShowBagChoice(false);
  }

  const cartCount = cart.length;

  return (
    <div className="app">
      <header className="app-header">
        <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
          <img src={`${import.meta.env.BASE_URL}deliveroo-logo.png`} alt="Deliveroo" height="36" />
          <h1>roo<span style={{color:"#1a271f"}}>food</span></h1>
          <span className="delivery-eta">
            <span className="eta-dot" />
            <span className="eta-icon">🛵</span>
            Delivery in {deliveryInfo.etaMin}–{deliveryInfo.etaMax} min
          </span>
        </div>
        <div className="cart-badge-wrapper">
          <span className="cart-icon">🛒</span>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </div>
      </header>

      <main className="app-main">
        <Menu
          dishes={dishes}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onAddToCart={addToCart}
        />
        <Cart cart={cart} onRemove={removeFromCart} onCheckout={handlePlaceOrder} bagType={bagType} />
      </main>
      {showBagChoice && (
        <BagChoiceModal onConfirm={handleBagConfirm} onCancel={handleBagCancel} />
      )}
      {showPayment && (
        <PaymentModal
          cart={cart}
          bagType={bagType}
          onClose={() => setShowPayment(false)}
          onSuccess={() => { setCart([]); setBagType(null); setShowPayment(false); }}
        />
      )}
    </div>
  );
}
