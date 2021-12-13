import { Badge, Button, IconButton, Menu, MenuItem, TextField } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { clientContext } from '../contexts/ClientContext';
import { signInUp } from '../contexts/SignInUp'
import appleicon from '../images/apple (1).png'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Cartochka from '../components/Cartochka';
import UsedCars from '../components/UsedCars';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import macImg from '../images/mac-img.jpeg'
import ipadImg from '../images/ipad-img.jpeg'
import iphoneImg from '../images/iphone-img.jpeg'





const MainPage = () => {
    const { products, getProduct } = useContext(clientContext)


    const [filteredProducts, setFilteredProducts] = useState(products)
    const [type, setType] = useState(null)
    const [image, setImage] = useState(null)

    useEffect(() => {
        getProduct()
    }, [])

    useEffect(() => {
        setFilteredProducts(products)
    }, [products])

    useEffect(() => {
        if (type === "mac") {
            let arr = products.filter(item => item.type === "mac")
            setFilteredProducts(arr)
            setImage(macImg)
        }
        else if (type === "iphone") {
            let arr = products.filter(item => item.type === "iphone")
            setFilteredProducts(arr)
            setImage(iphoneImg)
        }
        else if (type === "ipad") {
            let arr = products.filter(item => item.type === "ipad")
            setFilteredProducts(arr)
            setImage(ipadImg)
        }

    }, [type])

    //search START
    const history = useHistory()
    const [searchValue, setSearchValue] = useState("")
    const filterProducts = (key, value) => {
        let search = new URLSearchParams(history.location.search)
        search.set(key, value)
        let url = `${history.location.pathname}?${search.toString()}`
        history.push(url)
        setSearchValue(search.get('q'))
        getProduct()
    }
    let search = new URLSearchParams(history.location.search)
    useEffect(() => {
        setSearchValue(search.get('q') || "")
    }, [history.location])

    //search END



    return (
        <div>

            <div className='nav-block'>
                <Link to="/">
                    <div className="icon-block">
                        <img className="apple-icon" src={appleicon} alt="" />
                    </div>

                </Link>

                <li onClick={() => setType(null)}>All products</li>
                <li onClick={() => setType("mac")}>Mac</li>
                <li onClick={() => setType("ipad")}>Ipad</li>
                <li onClick={() => setType("iphone")}>Iphone</li>



                <div className="search-block">
                    {
                        type ? (
                            null
                        ) : (
                            <>
                                <div className="search-input">
                                    <TextField
                                        placeholder="Search..."
                                        onChange={(e) => filterProducts('q', e.target.value)}
                                        value={searchValue}
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                </div>
                            </>
                        )
                    }

                </div>
                <div className="func-icons">

                    <Link to="/signUp">
                        <div className="profile">
                            {/* <span>{user.email}</span> */}
                            <AccountCircleIcon className="profile-icon" />
                        </div>
                    </Link>

                    <Link to="/like">
                        <div className="fav-icon">
                            <BookmarkBorderIcon />
                        </div>
                    </Link>

                    <Link to="/cart">
                        <div>
                            <ShoppingBasketIcon className="shop-icon" />
                        </div>
                    </Link>
                </div>
            </div>


            <div className="filtered-products">
                {
                    filteredProducts ? (
                        type ? (
                            <>
                                <div className="content">
                                    <img src={image} />
                                    <div className="pref-block">
                                        <h2 className="preferences">Which {filteredProducts[0].type} is right for you?</h2>
                                    </div>
                                    <div className="content-block">
                                        {filteredProducts.map(item => {
                                            return <Cartochka item={item} key={item.id} />
                                        })
                                        }
                                    </div>

                                </div>
                            </>
                        ) : (
                            <UsedCars />
                        )
                    ) : (
                        <h2>Loading...</h2>
                    )}
            </div>
        </div >
    );
};

export default MainPage;