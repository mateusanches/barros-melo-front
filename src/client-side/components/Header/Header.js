import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';

import "../../static/css/header.css";

const Header = () => {
    const [viewMenu, setViewMenu] = useState(false);

    return (
        <div id="header">
            <div className="content-header">
                <a href="/" className="box-logo">
                    <img src="/images/logo-iniciais.png" alt="logo" />
                </a>
                <ul className="menu-header">
                    <li className="item-menu">
                        <a href="/">Busca Rápida</a>
                    </li>
                    <li className="item-menu">
                        <a href="/">Sobre nós</a>
                    </li>
                    <li className="item-menu">
                        <a href="/">Contato</a>
                    </li>
                    <li className="item-menu">
                        <a href="/">Catalogo</a>
                    </li>
                </ul>
                <div className="busca-header">
                    <TextField className="campo-busca" id="standard-basic" label="Buscar" variant="standard" />
                    <SearchIcon className="search-icon" />
                </div>
            </div>
            <div className="content-header-mobile">
                <MenuIcon className="menu-btn" onClick={() => setViewMenu(!viewMenu)} />
                <a href="/" className="box-logo">
                    <img src="/images/logo-iniciais.png" alt="logo" />
                </a>
                <div className="blank-box"></div>
                <div className={viewMenu ? "menu-mobile active" : "menu-mobile"}>
                    <div className="header-menu">
                        <a href="/" className="box-logo">
                            <img src="/images/logo-iniciais.png" alt="logo" />
                        </a>
                        <div className="busca-header">
                            <TextField className="campo-busca" id="standard-basic" label="Buscar" variant="standard" />
                            <SearchIcon className="search-icon" />
                        </div>
                        <CloseIcon className="btn-close" onClick={() => setViewMenu(!viewMenu)} />
                    </div>
                    <ul className="menu-header-mobile">
                        <li className="item-menu">
                            <a href="/">Busca Rápida</a>
                        </li>
                        <li className="item-menu">
                            <a href="/">Sobre nós</a>
                        </li>
                        <li className="item-menu">
                            <a href="/">Contato</a>
                        </li>
                        <li className="item-menu">
                            <a href="/">Catalogo</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header;