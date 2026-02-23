import React from 'react';

const CartSummary: React.FC<{ items: Array<{id: string; name: string; quantity: number; price: number}> }> = ({ items }) => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div className="cart-summary">
            <h2>Shopping Cart Summary</h2>
            <p>Total Items: {totalItems}</p>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
            <ul>
                {items.map(item => (
                    <li key={item.id}>{item.name} - Quantity: {item.quantity} - Price: ${item.price.toFixed(2)}</li>
                ))}
            </ul>
        </div>
    );
};

export default CartSummary;