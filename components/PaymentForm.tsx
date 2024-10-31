// app/components/PaymentForm.tsx
'use client';

import React, { useState } from 'react';

const PaymentForm = () => {
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('ETB');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState(null);

    const submitPayment = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/create-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount,
                    currency,
                    email,
                    firstName,
                    lastName,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('API response error:', errorData);
                setError(`Payment initialization failed: ${errorData.message}`);
                return;
            }

            const { checkoutUrl } = await response.json();
            if (checkoutUrl) {
                window.location.href = checkoutUrl;
            }
        } catch (error) {
            console.error('Error during payment initialization:', error);
            setError('An error occurred during payment initialization. Please try again.');
        }
    };

    return (
        <form onSubmit={submitPayment}>
            <h2>Payment Form</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <label>Amount:</label>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
            </div>
            <div>
                <label>Currency:</label>
                <input type="text" value={currency} onChange={(e) => setCurrency(e.target.value)} required />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
                <label>First Name:</label>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </div>
            <div>
                <label>Last Name:</label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </div>
            <button type="submit">Pay Now</button>
        </form>
    );
};

export default PaymentForm;
