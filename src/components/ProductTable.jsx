import React, { useContext, useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { adminContext } from '../contexts/AdminContext';
import Grid from '@material-ui/core/Grid';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import { useParams } from 'react-router';
import { Button, TextField } from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});




export default function ProductTable() {
    const classes = useStyles();
    const { products, getProduct, deleteProduct, productToEdit, getProductToEdit, saveEditedProduct } = useContext(adminContext)
    useEffect(() => {
        getProduct()
    }, [])

    //EDIT START

    const [editProduct, setEditProduct] = useState(productToEdit)
    const [modal, setModal] = useState(false)
    const { id } = useParams()
    useEffect(() => {
        getProductToEdit(id)
    }, [])
    useEffect(() => {
        setEditProduct(productToEdit)
    }, [productToEdit])
    const handleInputs = (e) => {
        let obj = {
            ...editProduct,
            [e.target.name]: e.target.value
        }
        setEditProduct(obj)
    }

    //EDIT END

    return (
        <>
            {
                products ? (
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>№</StyledTableCell>
                                    <StyledTableCell align="center">Название</StyledTableCell>
                                    <StyledTableCell align="center">Цвет</StyledTableCell>
                                    <StyledTableCell align="center">Описание</StyledTableCell>
                                    <StyledTableCell align="center">Цена</StyledTableCell>
                                    <StyledTableCell align="center">Фото</StyledTableCell>
                                    <StyledTableCell align="center">Тип</StyledTableCell>
                                    <StyledTableCell align="center"> </StyledTableCell>
                                    <StyledTableCell align="center"> </StyledTableCell>


                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {products.map((row, index) => (
                                    <StyledTableRow key={row.name}>
                                        <StyledTableCell component="th" scope="row">
                                            {index + 1}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{row.title}</StyledTableCell>
                                        <StyledTableCell align="center">{row.color}</StyledTableCell>
                                        <StyledTableCell align="center">{row.description}</StyledTableCell>
                                        <StyledTableCell align="center">{row.price}</StyledTableCell>
                                        <StyledTableCell align="center"><img width="80px" src={row.photo} alt="" /></StyledTableCell>
                                        <StyledTableCell align="center">{row.type}</StyledTableCell>
                                        <StyledTableCell align="center" onClick={() => deleteProduct(row.id)}>
                                            <Grid container className={classes.root}>
                                                <Grid item xs={4}>
                                                    <DeleteOutlineIcon>Filled</DeleteOutlineIcon>
                                                </Grid>
                                            </Grid>
                                        </StyledTableCell>
                                        <StyledTableCell align="center" onClick={() => {
                                            getProductToEdit(row.id)
                                            setModal(true)
                                            console.log(editProduct);
                                        }}>
                                            <Grid container className={classes.root}>
                                                <Grid item xs={4}>
                                                    <EditIcon>
                                                    </EditIcon>
                                                </Grid>
                                            </Grid>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                ) : (
                    <h3>Loading...</h3>
                )
            }

            {
                modal ? (

                    <div className="modal">
                        <div className="modal-body">
                            {
                                editProduct ? (
                                    <div className="inputs-add">
                                        <form >
                                            <div className="form-btn">
                                                <Button onClick={() => setModal(false)}>&times;</Button>
                                            </div>
                                            <TextField value={editProduct.title} id="outlined-basic" label="Название продукта" name="title" variant="outlined" onChange={handleInputs} />
                                            <TextField value={editProduct.color} id="outlined-basic" label="Цвет продукта" name="color" variant="outlined" onChange={handleInputs} />
                                            <TextField value={editProduct.description} id="outlined-basic" label="Описание продукта" name="description" variant="outlined" onChange={handleInputs} />
                                            <TextField value={editProduct.price} id="outlined-basic" label="Цена продукта" name="price" variant="outlined" onChange={handleInputs} />
                                            <TextField value={editProduct.photo} id="outlined-basic" label="Фото продукта" name="photo" variant="outlined" onChange={handleInputs} />
                                            <TextField value={editProduct.type} id="outlined-basic" label="Тип продукта" name="type" variant="outlined" onChange={handleInputs} />


                                            <div>
                                                <Button variant="outlined" color="primary" onClick={(e) => {
                                                    e.preventDefault()
                                                    if (
                                                        !editProduct.title.trim() ||
                                                        !editProduct.color.trim() ||
                                                        !editProduct.description.trim() ||
                                                        !editProduct.price ||
                                                        !editProduct.photo.trim() ||
                                                        !editProduct.type.trim()

                                                    ) {
                                                        alert("Заполните все поля!")
                                                        return
                                                    }
                                                    saveEditedProduct(editProduct)
                                                    setModal(false)
                                                }}>Сохранить</Button>
                                            </div>
                                        </form>
                                    </div>
                                ) : (
                                    <h3>Loading...</h3>
                                )
                            }
                        </div>
                    </div>
                ) : (
                    null
                )
            }
        </>

    );
}
