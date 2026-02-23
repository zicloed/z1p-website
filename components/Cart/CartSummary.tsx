import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from '../../redux/cartSlice';
import './CartSummary.css';

const CartSummary = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const taxRate = 0.1; // 10% tax

    const handleRemoveItem = (itemId) => {
        dispatch(removeItem(itemId));
    };

    const handleQuantityChange = (itemId, quantity) => {
        dispatch(updateQuantity({ itemId, quantity }));
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const calculateTax = (subtotal) => {
        return subtotal * taxRate;
    };

    const calculateShipping = () => {
        return 5.99; // Flat rate shipping
    };

    const calculateTotal = (subtotal, tax, shipping) => {
        return subtotal + tax + shipping;
    };

    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    const shipping = calculateShipping();
    const total = calculateTotal(subtotal, tax, shipping);

    return (
        <div className="cart-summary">
            <h2>Order Summary</h2>
            <ul>
                {cartItems.map(item => (
                    <li key={item.id} className="cart-item">
                        <span>{item.name}</span>
                        <span>${item.price.toFixed(2)}</span>
                        <input
                            type="number"
                            value={item.quantity}
                            min="1"
                            onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                        />
                        <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <div className="summary-total">
                <p>Subtotal: ${subtotal.toFixed(2)}</p>
                <p>Tax: ${tax.toFixed(2)}</p>
                <p>Shipping: ${shipping.toFixed(2)}</p>
                <h3>Total: ${total.toFixed(2)}</h3>
            </div>
        </div>
    );
};

export default CartSummary;