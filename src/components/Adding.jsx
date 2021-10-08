import { Button, TextField } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { adminContext } from '../contexts/AdminContext';

const Adding = () => {

    const [products, setProducts] = useState({
        title: "",
        color: "",
        price: "",
        description: "",
        photo: "",
        type: ""
    })

    const { createProduct } = useContext(adminContext)

    function handleInput(e) {
        let newProduct = {
            ...products,
            [e.target.name]: e.target.value
        }
        setProducts(newProduct)
    }

    return (
        <div>
            <div className="add-inputs">
                <TextField value={products.title} id="filled-basic" name="title" label="title" variant="filled" onChange={handleInput} />
                <TextField value={products.color} id="filled-basic" name="color" label="color" variant="filled" onChange={handleInput} />
                <TextField type="number" value={products.price} id="filled-basic" name="price" label="price" variant="filled" onChange={handleInput} />
                <TextField value={products.description} id="filled-basic" name="description" label="description" variant="filled" onChange={handleInput} />
                <TextField value={products.photo} id="filled-basic" name="photo" label="photo" variant="filled" onChange={handleInput} />
                <TextField value={products.type} id="filled-basic" name="type" label="type" variant="filled" onChange={handleInput} />


                <div className="add-btn">
                    <Button onClick={(e) => {
                        e.preventDefault()
                        if (
                            !products.title.trim() ||
                            !products.color.trim() ||
                            !products.price.trim() ||
                            !products.description.trim() ||
                            !products.photo.trim() ||
                            !products.type.trim()

                        ) {
                            alert("Заполните все поля!")
                            return
                        }
                        createProduct({
                            title: products.title.trim(),
                            color: products.color.trim(),
                            price: products.price.trim(),
                            description: products.description.trim(),
                            photo: products.photo.trim(),
                            type: products.type.trim()
                        })
                    }} variant="outlined" color="primary">ADD</Button>
                </div>
            </div>
        </div>
    );
};

export default Adding;