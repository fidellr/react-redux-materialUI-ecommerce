import React from 'react';
import { Switch } from "react-router-dom";
import LayoutsWrapper from './LayoutsWrapper'
import Header from './Header'
import Home from '../pages/Home'
import ProductDetails from '../pages/ProductDetails'
import Checkout from '../pages/Checkout'

const routes = [
    {
        exact: true,
        pathName: '/',
        Component: Home
    },
    {
        pathName: '/detail/:prodId',
        Component: ProductDetails
    },
    {
        pathName: '/cart',
        Component: Checkout
    }
]

const Main = () => (
    <Switch>
        {
            routes.map(page => (
                <LayoutsWrapper exact={page.exact} key={page.pathName} path={page.pathName} layout={Header} component={page.Component} />
            ))
        }
    </Switch>
)
export default Main