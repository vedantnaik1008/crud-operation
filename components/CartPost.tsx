'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {
    data: any;
};

const CartPost = ({ data }: Props) => {
    const router = useRouter();

    const cart = async () => {
        try {
            await axios.post(`http://localhost:3000/api/cart`, data);
            console.log(data, 'post added to cart');
            
        } catch (error) {
            console.log(error, 'failed to add to cart');
        } finally {
            router.refresh()
        }
    };
    return (
        <div>
            <button onClick={() => cart()}>Add</button>
        </div>
    );
};

export default CartPost;
