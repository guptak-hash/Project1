import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../../features/cart/cartSlice';
import './Cart.css';

const CartPage = () => {
  const items = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  ));
  const dispatch = useDispatch();

  if (items.length === 0) {
    return <div className="cart-empty">Your cart is empty</div>;
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <div className="cart-items">
        {items.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.thumbnail} alt={item.title} />
            <div className="cart-item-details">
              <h3>{item.title}</h3>
              <p>${item.price}</p>
              <div className="quantity-controls">
                <button 
                  onClick={() => dispatch(updateQuantity({
                    id: item.id, 
                    quantity: Math.max(1, item.quantity - 1)
                  }))}
                >-</button>
                <span>{item.quantity}</span>
                <button 
                  onClick={() => dispatch(updateQuantity({
                    id: item.id, 
                    quantity: item.quantity + 1
                  }))}
                >+</button>
              </div>
              <button 
                onClick={() => dispatch(removeFromCart(item.id))}
                className="btn-remove"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Total: ${total.toFixed(2)}</h3>
        <button 
          onClick={() => dispatch(clearCart())}
          className="btn-clear"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default CartPage;