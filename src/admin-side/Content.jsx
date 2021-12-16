import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import './static/css/Content.css';

import NotFound from './layout/NotFound';
import RegisterAdmin from './layout/user/RegisterAdmin';
import RegisterPlayer from './layout/user/RegisterPlayer';
import PlayerList from './layout/user/PlayerList';
import RegisterProduct from './layout/product/RegisterProduct';
import ProductList from './layout/product/ProductList';
import CategoryList from './layout/category/CategoryList';
import RegisterCategory from './layout/category/RegisterCategory';

const Content = () => {
    const dataAdmin = JSON.parse(localStorage.getItem('LoginAdmin'));

    if (dataAdmin) {
        return (
            <section id="content">
                <Switch>
                    <Route exact path="/admin">
                        
                    </Route>
                    <Route path="/admin/registeradmin">
                        <RegisterAdmin></RegisterAdmin>
                    </Route>
                    <Route path="/admin/registerplayer">
                        <RegisterPlayer></RegisterPlayer>
                    </Route>
                    <Route path="/admin/playerlist">
                        <PlayerList></PlayerList>
                    </Route>
                    <Route path="/admin/registerproduct">
                        <RegisterProduct></RegisterProduct>
                    </Route>
                    <Route path="/admin/productlist">
                        <ProductList></ProductList>
                    </Route>
                    <Route path="/admin/categorytlist">
                        <CategoryList></CategoryList>
                    </Route>
                    <Route path="/admin/registercategory">
                        <RegisterCategory></RegisterCategory>
                    </Route>
                    <Route path="*">
                        <NotFound></NotFound>
                    </Route>
                </Switch>
            </section>
        )
    } else {
        return (
            <section id="content">
                <Switch>
                    <Route path="*">
                        <Redirect to="/admin/listorders" />
                    </Route>
                </Switch>
            </section>
        )
    }
}

export default Content;