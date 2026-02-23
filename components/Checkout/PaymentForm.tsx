import React from 'react';

const PaymentForm: React.FC = () => {
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Handle payment processing here
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="cardNumber">Card Number</label>
                <input type="text" id="cardNumber" name="cardNumber" required />
            </div>
            <div>
                <label htmlFor="expiry">Expiry Date</label>
                <input type="text" id="expiry" name="expiry" placeholder="MM/YY" required />
            </div>
            <div>
                <label htmlFor="cvc">CVC</label>
                <input type="text" id="cvc" name="cvc" required />
            </div>
            <button type="submit">Pay</button>
        </form>
    );
};

export default PaymentForm;