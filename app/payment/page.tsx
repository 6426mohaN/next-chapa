// app/payment/page.tsx
import PaymentForm from '@/components/PaymentForm';
import React from 'react';


const PaymentPage = () => {
    return (
        <div>
            <h1>Make a Payment</h1>
            <PaymentForm />
        </div>
    );
};

export default PaymentPage;
