import axios from 'axios';
import React, { useReducer, useState, useEffect } from 'react';
import { API } from '../consts/api';
import { calcSubPrice, calcTotalPrice } from '../consts/calculator';
export const clientContext = React.createContext()

const INIT_STATE = {
    products: null,
    productsCountInCart: JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')).products.length : 0,
    productsCountInLike: JSON.parse(localStorage.getItem('like')) ? JSON.parse(localStorage.getItem('like')).products.length : 0,
    cart: null,
}

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "GET_PRODUCT":
            return { ...state, products: action.payload }
        case "ADD_AND_DELETE_PRODUCT_IN_CART":
            return { ...state, productsCountInCart: action.payload }
        case "GET_CART":
            return { ...state, cart: action.payload }
        case "ADD_DELETE_PRODUCT_LIKE":
            return { ...state, productsCountInLike: action.payload }
        case "GET_LIKE":
            return { ...state, like: action.payload }
        default:
            return { ...state }
    }
}

const ClientContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, INIT_STATE)

    const getProduct = async () => {
        const { data } = await axios(`${API}${window.location.search}`)
        dispatch({
            type: "GET_PRODUCT",
            payload: data
        })
    }

    const getCart = () => {

        let cart = JSON.parse(localStorage.getItem('cart'))
        dispatch({
            type: 'GET_CART',
            payload: cart
        })
    }


    const addAndDeleteProductInCart = (product) => {
        let cart = JSON.parse(localStorage.getItem("cart"))
        if (!cart) {
            cart = {
                products: [],
                totalPrice: 0,
            }
        }
        let newProduct = {
            product: product,
            count: 1,
            subPrice: 0,
        }
        newProduct.subPrice = calcSubPrice(newProduct)
        let newCart = cart.products.filter(item => item.product.id === product.id)
        if (newCart.length) {
            cart.products = cart.products.filter(item => item.product.id !== product.id)
        }
        else {
            cart.products.push(newProduct)
        }
        cart.totalPrice = calcTotalPrice(cart.products)
        localStorage.setItem("cart", JSON.stringify(cart))
        dispatch({
            type: "ADD_AND_DELETE_PRODUCT_IN_CART",
            payload: cart.products.length
        })
        getCart()
    }

    const checkProductInCart = (id) => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if (!cart) {
            return false
        }
        let newCart = cart.products.filter(item => item.product.id === id)
        return !newCart.length ? true : false
    }

    const changeCountProducts = (count, id) => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if (!cart) {
            return
        }
        cart.products = cart.products.map(item => {
            if (item.product.id === id) {
                item.count = count
                item.subPrice = calcSubPrice(item)
            }
            return item
        })
        cart.totalPrice = calcTotalPrice(cart.products)
        localStorage.setItem('cart', JSON.stringify(cart))
        getCart()
    }

    //pagination  START
    const [posts, setPosts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(3)

    useEffect(() => {
        const fetchProducts = () => {
            const data = state.products || []
            setPosts(data)
        }
        fetchProducts()
    }, [state.products])

    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
    const totalPosts = posts.length
    console.log(currentPosts)

    const changePage = (newPage) => {
        setCurrentPage(newPage)
    }

    //paginations END


    //like START
    const addDeleteProductLike = (product) => {
        let like = JSON.parse(localStorage.getItem("like"))
        if (!like) {
            like = {
                products: []
            }
        }
        let newProduct = {
            product: product,
            count: 1
        }
        let newLike = like.products.filter(item => item.product.id === product.id)
        if (newLike.length) {
            like.products = like.products.filter(item => item.product.id !== product.id)
            console.log("Here added without copy")
        }
        else {
            like.products.push(newProduct)
            console.log("Here added with copy")
        }
        localStorage.setItem("like", JSON.stringify(like))
        dispatch({
            type: "ADD_DELETE_PRODUCT_LIKE",
            payload: like.products.length
        })


        console.log(like);
    }
    const checkProductLike = (id) => {
        let like = JSON.parse(localStorage.getItem('like'))
        if (!like) {
            return false
        }
        console.log(like);
        let newLike = like.products.filter(item => item.product.id === id)
        return !newLike.length ? true : false


    }
    const getLike = () => {

        let like = JSON.parse(localStorage.getItem('like'))
        dispatch({
            type: 'GET_LIKE',
            payload: like
        })
        console.log(like);
    }


    //like END

    //comment START
    // async function sendComment(product, value) {
    //     product.comments.push(value)
    //     await axios.patch(`${JSON_API}/products/${product.id}`, product)
    //     getDetailsOfProduct(product.id)
    // }

    // const sendCommentAnswer = async (product, value, commentId) => {
    //     const { data } = await axios(`${JSON_API}/products/${product.id}`)
    //     data.comments.forEach(item => {
    //         if (item.id === commentId) {
    //             return item.answers.push(value)
    //         }
    //         return
    //     })
    //     await axios.patch(`${JSON_API}/products/${product.id}`, data)
    //     getDetailsOfProduct(product.id)
    // }

    //comment END



    return (

        <clientContext.Provider value={{
            products: state.products,
            cart: state.cart,
            like: state.like,
            productsCountInCart: state.productsCountInCart,
            totalPosts,
            currentPosts,
            postsPerPage,
            getProduct,
            addAndDeleteProductInCart,
            getCart,
            checkProductInCart,
            changeCountProducts,
            changePage,
            addDeleteProductLike,
            checkProductLike,
            getLike,

        }}>
            {children}
        </clientContext.Provider>

    );
};

export default ClientContextProvider;