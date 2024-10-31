// app/api/create-payment/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const CHAPA_API_URL = 'https://api.chapa.co/v1/transaction/initialize';

export async function POST(req: NextRequest) {
    const { amount, currency, email, firstName, lastName } = await req.json();

    try {
        const response = await axios.post(
            CHAPA_API_URL,
            {
                amount,
                currency,
                email,
                first_name: firstName,
                last_name: lastName,
                tx_ref: `tx-${Date.now()}`,
                callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-status`,
                return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-status`,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.data.status === 'success') {
            return NextResponse.json({ checkoutUrl: response.data.data.checkout_url });
        } else {
            return NextResponse.json({ message: 'Payment initialization failed' }, { status: 400 });
        }
    } catch (error) {
        console.error('Error initializing payment:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
