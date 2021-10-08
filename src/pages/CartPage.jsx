import { Container } from '@material-ui/core';
import React from 'react';
import Navbar from '../components/Navbar';
import CartTable from "../components/CartTable"

const CartPage = () => {
    return (
        <>
            <Navbar />
            <Container>
                <div>
                    <CartTable />
                </div>
            </Container>
        </>
    );
};

export default CartPage;