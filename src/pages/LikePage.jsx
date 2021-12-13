import { Badge, Button, IconButton, makeStyles, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { clientContext } from '../contexts/ClientContext';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import appleicon from '../images/apple (1).png'


const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});


const LikePage = () => {

    const classes = useStyles();
    const { like, getLike } = useContext(clientContext)

    useEffect(() => {
        getLike()
    }, [])

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <Link to="/signIn">
                <MenuItem>Войти</MenuItem>
            </Link>
            <Link to="/signUp">
                <MenuItem>Регистрация</MenuItem>
            </Link>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge color="secondary">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label="show 11 new notifications" color="inherit">
                    <Badge badgeContent={11} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <>
            <div>

                <div className="nav-like">
                    <div className='nav-block'>
                        <Link to="/">
                            <div className="icon-block">
                                <img className="apple-icon" src={appleicon} alt="" />
                            </div>

                        </Link>

                        <h3>My favorites</h3>

                        <Link to="/cart">
                            <ShoppingBasketIcon className="shop-icon" />
                        </Link>
                        <div className={classes.sectionDesktop}>
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </div>
                        <Toolbar />
                        {renderMobileMenu}
                        {renderMenu}
                    </div>

                </div>

                <div className="table-fav">

                    {
                        like ? (
                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="caption table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>№</TableCell>
                                            <TableCell align="left">Название</TableCell>
                                            <TableCell align="left">Фото</TableCell>
                                            <TableCell align="left">Тип</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {like.products.map((row, index) => (
                                            <TableRow key={row.name}>
                                                <TableCell component="th" scope="row">
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell align="left">{row.product.title}</TableCell>
                                                <TableCell align="left">
                                                    <img width="100" src={row.product.photo} alt="" />
                                                </TableCell>
                                                <TableCell align="left">{row.product.type}</TableCell>

                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        ) : (
                            <div>
                                <h3>You have no favorites</h3>
                                <Link to="/">
                                    <Button variant="outlined" size="large" color="secondary">
                                        Choose productsto FAVORITES
                                    </Button>
                                </Link>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default LikePage;