import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { clientContext } from '../contexts/ClientContext';
import { Accordion, AccordionDetails, AccordionSummary, IconButton, TextField } from '@material-ui/core';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import StarRateIcon from '@material-ui/icons/StarRate';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { addDoc, collection, query, onSnapshot } from '@firebase/firestore'
import { database } from '../Firebase';
import Modal from '@material-ui/core/Modal';
import SimpleModal from '@material-ui/core/Modal'

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}


const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    root: {
        maxWidth: 345,
        margin: "0 10px 10px 10px",
        width: 300,
        minWidth: 240,
        height: 900,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    media: {
        height: 240,
        backgroundSize: "contain",
        bacgroundColor: "rgb(0, 0, 0)"
    },
}));








export default function Cartochka({ item }) {
    const classes = useStyles();
    const { addAndDeleteProductInCart, checkProductInCart, addDeleteProductLike, checkProductLike, products } = useContext(clientContext)
    const [comments, setComments] = useState({
        rate: 0,
        comtext: ""
    })
    const [star, setStar] = useState([false, false, false, false, false])
    const [rate, setRate] = useState(0)
    // const [shopIcon, setShopIcon] = useState(false)


    const handleInputs = (e) => {
        let newComments = {
            ...comments,
            [e.target.name]: e.target.value,
        }
        setComments(newComments)
    }
    const handleStarClick = (index) => {
        let clickedStar = [...star]
        for (let i = 0; i < 5; i++) {
            if (i <= index) {
                clickedStar[i] = true
            } else {
                clickedStar[i] = false
            }
        }
        setStar(clickedStar)
        setRate(index + 1)
        // console.log(star);
    }

    const addComment = async () => {
        await addDoc(collection(database, 'comments'), { ...comments, rate: rate })
    }
    console.log(comments);
    const [commentsArray, setCommentsArray] = useState([])

    useEffect(() => {
        const q = query(collection(database, 'comments'))

        const getComments = onSnapshot(q, (querySnapshot) => {
            let commentsArr = [];
            querySnapshot.forEach(doc => {
                commentsArr.push({ ...doc.data(), id: doc.id })
            })
            setCommentsArray(commentsArr)
            // console.log(commentsArr);
        })
        return () => getComments()
    }, [])



    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    console.log(commentsArray);

    // const [modalReview, setModalReview] = useState(null)

    return (
        <>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={item.photo}
                        title={item.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {item.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            <h3>Price: {item.price} <MonetizationOnIcon /> </h3>
                            description: {item.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions className="functions">

                    <CardActions className="not-stars">

                        <IconButton
                            onClick={() => addAndDeleteProductInCart(item)}
                        >
                            <ShoppingBasketIcon
                                color={checkProductInCart(item.id) ? "black" : "secondary"}
                            />
                        </IconButton>
                        <ThumbUpAltIcon />
                        <Button
                            onClick={() => addDeleteProductLike(item)}
                            color={checkProductLike(item.id) ? "default" : "secondary"}
                        >
                            <BookmarkIcon
                            />
                        </Button>
                    </CardActions>
                </CardActions>



                <div>
                    <Button type="button" onClick={handleOpen}>
                        show reviews
                    </Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        <div style={modalStyle} className={classes.paper}>
                            <h2 id="simple-modal-title">Reviews:</h2>
                            <p id="simple-modal-description">
                                {
                                    commentsArray ? (
                                        commentsArray.map((item, index) => (
                                            <div className="comment-container">
                                                <div className="comment-user">
                                                    <h2>{index + 1}) Comment: {item.comtext} <br /> Rating: {item.rate} </h2>

                                                </div>

                                            </div>
                                        ))
                                    ) : <h1>Отзывов нет</h1>
                                }

                            </p>
                            <SimpleModal />
                        </div>
                    </Modal>
                </div>



                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>send review</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>

                            <TextField name="comtext" value={comments.comtext} label=" write comment" onChange={handleInputs} />

                            <CardActions className="stars">
                                <IconButton onClick={() => handleStarClick(0)}>
                                    <StarRateIcon color={star[0] ? "secondary" : "default"} />
                                </IconButton>
                                <IconButton onClick={() => handleStarClick(1)}>
                                    <StarRateIcon color={star[1] ? "secondary" : "default"} />
                                </IconButton >
                                <IconButton onClick={() => handleStarClick(2)}>
                                    <StarRateIcon color={star[2] ? "secondary" : "default"} />
                                </IconButton>
                                <IconButton onClick={() => handleStarClick(3)}>
                                    <StarRateIcon color={star[3] ? "secondary" : "default"} />
                                </IconButton>
                                <IconButton onClick={() => handleStarClick(4)}>
                                    <StarRateIcon color={star[4] ? "secondary" : "default"} />
                                </IconButton>
                            </CardActions>
                        </Typography>
                    </AccordionDetails>
                    <Button onClick={() => addComment()}>SEND</Button>
                </Accordion>
            </Card >
        </>
    );
}
