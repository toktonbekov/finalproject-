import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import UsedCars from './components/UsedCars';
import AdminContextProvider from './contexts/AdminContext';
import ClientContextProvider from './contexts/ClientContext';
import SignInUpProvider from './contexts/SignInUp';
import AdminPage from './pages/AdminPage';
import CartPage from './pages/CartPage';
import LikePage from './pages/LikePage';
import MainPage from './pages/MainPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';


const Routes = () => {
    return (
        <SignInUpProvider>
            <ClientContextProvider>
                <AdminContextProvider>
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/admin" component={AdminPage} />
                            <Route exact path="/usedCars" component={UsedCars} />
                            <Route exact path="/" component={MainPage} />
                            <Route exact path="/cart" component={CartPage} />
                            <Route exact path="/signUp" component={SignUpPage} />
                            <Route exact path="/signIn" component={SignInPage} />
                            <Route exact path="/like" component={LikePage} />
                        </Switch>
                    </BrowserRouter>
                </AdminContextProvider>
            </ClientContextProvider>
        </SignInUpProvider>


    );
};

export default Routes;