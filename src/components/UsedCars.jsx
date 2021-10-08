import React, { useContext, useEffect } from 'react';
import { clientContext } from '../contexts/ClientContext';
import Cartochka from './Cartochka';
import Navbar from './Navbar';
import Pagination from './Pagination';



const UsedCars = () => {
    const { products, getProduct, currentPosts } = useContext(clientContext)
    useEffect(() => {
        getProduct()
    }, [])
    console.log(products);

    return (
        <><div >
            <div className="iphone13pro-block">
                <h3>Iphone 13 Pro</h3>
                <h1>Oh.So.Pro</h1>
                <div className="img-iphone13pro">
                    <img src="https://www.apple.com/v/iphone-13-pro/b/images/overview/hero/hero_static__d9eo869ell26_medium_2x.jpg" alt="" />
                </div>
                <h4>Our Pro camera system gets its biggest upgrade ever<br /> With next-level hardware that captures so much more detail<br /> Superintelligent software for new photo and filmmaking techniques<br /> And a mind-blowingly fast chip that makes it all possible<br />It’ll change the way you shoot</h4>
            </div>

            <div className="otstup">

            </div>

            <div className="products-block">
                {currentPosts?.map(item => (
                    <Cartochka item={item} key={item.id} />
                ))}
            </div>
            <Pagination />
        </div>
        </>
    );
};

export default UsedCars;