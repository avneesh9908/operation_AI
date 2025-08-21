import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import './Navbar.css';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Access the cart items from Redux state
  const cartItemCount = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity.length, 0)
  );

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header role="banner">
      <div className="container">
        <div className="logo-brand">
          <NavLink to="/" aria-label="Home">LIST</NavLink>
        </div>

        <button 
          className="menu-icon" 
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </button>

        <nav className={isMenuOpen ? 'nav-open' : ''}>
          <ul>
            <li>
              <NavLink 
                to="/Product"
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                Product
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/"
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                Admin
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/cart"
                className={({ isActive }) => isActive ? 'active' : ''}
                aria-label={`Shopping cart with ${cartItemCount} items`}
              >
                <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
                {cartItemCount > 0 && (
                  <span className="cart-count" aria-hidden="true">{cartItemCount}</span>
                )}
              </NavLink>
            </li>     
          </ul>
        </nav>
      </div>
    </header>
  );
}