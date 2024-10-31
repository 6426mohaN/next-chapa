// app/payment-status/page.tsx
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const PaymentStatus = () => {
    const searchParams = useSearchParams();
    const status = searchParams.get('status');
    const tx_ref = searchParams.get('tx_ref');

    useEffect(() => {
        if (status) {
            console.log(`Transaction ${tx_ref} was ${status}`);
        }
    }, [status, tx_ref]);

    return (
        <div>
            <h1>Payment {status === 'success' ? 'Successful' : 'Failed'}</h1>
            <p>Transaction Reference: {tx_ref}</p>
        </div>
    );
};

export default PaymentStatus;
