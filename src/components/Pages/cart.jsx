import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";

// Styles
const styles = {
  container: {
    padding: "20px", 
    maxWidth: "1200px", 
    margin: "0 auto",
  },
  title: {
    textAlign: "center", 
    marginBottom: "20px",
  },
  emptyCart: {
    textAlign: "center", 
    fontSize: "18px",
    background: "#f8f9fa",
    padding: "22px 15px",
    marginLeft: "300px",
    marginRight: "300px",
    borderRadius: "8px",
    fontWeight: "bold",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  itemsList: {
    display: "flex", 
    flexDirection: "column", 
    gap: "15px",
  },
  cartItem: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  imageContainer: {
    width: "120px",
    height: "120px",
    marginRight: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    border: "1px solid #eee",
    borderRadius: "4px",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  itemDetails: {
    flexGrow: 1,
  },
  productName: {
    margin: "0 0 10px",
  },
  quantity: {
    margin: "0 0 5px",
  },
  price: {
    margin: "0", 
    color: "#666", 
    fontWeight: "500",
  },
  removeButton: {
    marginRight: "40px",
    padding: "10px 20px",
    background: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "all 0.2s",
    minWidth: "120px",
  },
  summarySection: {
    marginTop: "20px",
    textAlign: "center",
    borderTop: "1px solid #eee",
    paddingTop: "20px",
  },
  totalDisplay: {
    background: "#f8f9fa",
    padding: "21px 26px",
    borderRadius: "8px",
    fontWeight: "bold",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
    textAlign: "right",
    fontSize: "1.2rem",
    marginLeft: "auto",
    maxWidth: "185px",
  },
  actionButtons: {
    display: "flex",
    justifyContent: "space-between",
  },
  clearButton: {
    padding: "10px 20px",
    background: "#6c757d",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "all 0.2s",
    minWidth: "120px",
  },
  buyButton: {
    padding: "10px 20px",
    background: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "all 0.2s",
    minWidth: "120px",
  },
  hoverEffects: {
    cartItemHover: {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 8px rgba(0, 0, 0, 0.15)",
    },
    removeButtonHover: {
      background: "#c82333",
    },
    clearButtonHover: {
      background: "#5a6268",
      transform: "translateY(-1px)",
    },
    buyButtonHover: {
      background: "#218838",
      transform: "translateY(-1px)",
    },
  }
};

// Component Logic
const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const cartPriceTotal = useSelector((state) => state.cart.total);
  const cartItemCount = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity.length, 0)
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveItem = (productName) => {
    if (window.confirm(`Are you sure you want to remove ${productName} from your cart?`)) {
      dispatch(removeFromCart(productName));
      alert(`${productName} has been removed from your cart!`);
    }
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your entire cart?")) {
      dispatch(clearCart());
      alert("Your cart has been cleared!");
    }
  };

  const handleNavigateToBuy = () => {
    navigate("/buy");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Cart({cartItemCount})</h1>
      
      {cartItems.length === 0 ? (
        <p style={styles.emptyCart}>Your cart is empty!</p>
      ) : (
        <div>
          <div style={styles.itemsList}>
            {cartItems.map((item, index) => (
              <div
                key={index}
                style={styles.cartItem}
                onMouseOver={(e) => {
                  Object.assign(e.currentTarget.style, styles.hoverEffects.cartItemHover);
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow = styles.cartItem.boxShadow;
                }}
              >
                <div style={styles.imageContainer}>
                  <img
                    src={item.image}
                    alt={item.productName}
                    style={styles.image}
                  />
                </div>
                <div style={styles.itemDetails}>
                  <h3 style={styles.productName}>{item.productName}</h3>
                  <p style={styles.quantity}>
                    Quantity: <strong>{item.quantity.length}</strong>
                  </p>
                  <p style={styles.price}>
                    Price: Rs.{item.price}
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.productName)}
                  style={styles.removeButton}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = styles.hoverEffects.removeButtonHover.background;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = styles.removeButton.background;
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div style={styles.summarySection}>
            <div style={styles.totalDisplay}>
              Total: Rs.{cartPriceTotal}
            </div>
            <div style={styles.actionButtons}>
              <button
                onClick={handleClearCart}
                style={styles.clearButton}
                onMouseOver={(e) => {
                  Object.assign(e.currentTarget.style, styles.hoverEffects.clearButtonHover);
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = styles.clearButton.background;
                  e.currentTarget.style.transform = "";
                }}
              >
                Clear Cart
              </button>
              <button
                style={styles.buyButton}
                onClick={handleNavigateToBuy}
                onMouseOver={(e) => {
                  Object.assign(e.currentTarget.style, styles.hoverEffects.buyButtonHover);
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = styles.buyButton.background;
                  e.currentTarget.style.transform = "";
                }}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;