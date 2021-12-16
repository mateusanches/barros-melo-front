import React from 'react';
import Helmet from 'react-helmet';
import { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ApartmentIcon from '@material-ui/icons/Apartment';
import { AuthAdminContext } from '../../Context/AuthAdminContext';
import CategoryIcon from '@material-ui/icons/Category';

import '../static/css/Menu.css';
//import logoMenu from '../../img/fut-agency-logo.png'; 

const Menu = () => {

    const [selectedIndex, setSelectedIndex] = useState(1);
    const [openUser, setOpenUser] = useState(true);
    const [openProduct, setOpenProduct] = useState(true);
    const [openCategory, setOpenCategory] = useState(true);
    const { handleLogout } = useContext(AuthAdminContext);
    const dataAdmin = JSON.parse(localStorage.getItem('LoginAdmin'));
    const name = dataAdmin.user.name;

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return (
        <section id="side-menu">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Painel Administrativo</title>
            </Helmet>
            <span className="logo-menu">
                {/*<img src={logoMenu} alt="Logo menu" ></img>*/}
                <h1 className="title-menu">Admin</h1>
            </span>
            <nav className="nav-menu">
                <List className="itens-menu" component="nav" aria-label="main mailbox folders">
                    { /*   <ListItem
                        className='l1'
                        button
                        selected={selectedIndex === 0}
                        onClick={(event) => handleListItemClick(event, 0)}
                    >
                        <Link to="/admin" className=' item item-dashboard'><DashboardOutlinedIcon className="icon"></DashboardOutlinedIcon>Dashboard</Link>
                    </ListItem>
                    */ }
                    <ListItem
                        button
                        onClick={(event) => setOpenUser(!openUser)}
                        className={openUser + ' l1'}>
                        <span className=' item item-users'><PersonOutlineIcon className="icon"></PersonOutlineIcon>Usuários <ExpandMore className="icon-arrow" /></span>

                    </ListItem>
                    <Collapse className="box-l2" in={!openUser} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className='l2' selected={selectedIndex === 1.1} onClick={(event) => handleListItemClick(event, 1.1)}>
                                <Link to="/admin/registeradmin" className="sub-item item-dashboard">Novo usuário</Link>
                            </ListItem>
                            <ListItem button className='l2' selected={selectedIndex === 1.3} onClick={(event) => handleListItemClick(event, 1.3)}>
                                <Link to="/admin/playerlist" className="sub-item item-dashboard">Lista de usuários</Link>
                            </ListItem>
                        </List>
                    </Collapse>

                    <ListItem
                        button
                        onClick={(event) => setOpenProduct(!openProduct)}
                        className={openProduct + ' l1'}>
                        <span className=' item item-users'><ApartmentIcon className="icon"></ApartmentIcon>Imoveis <ExpandMore className="icon-arrow" /></span>

                    </ListItem>
                    <Collapse className="box-l2" in={!openProduct} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className='l2' selected={selectedIndex === 2.1} onClick={(event) => handleListItemClick(event, 2.1)}>
                                <Link to="/admin/productlist" className="sub-item item-dashboard">Lista de Imoveis</Link>
                            </ListItem>
                            <ListItem button className='l2' selected={selectedIndex === 2.2} onClick={(event) => handleListItemClick(event, 2.2)}>
                                <Link to="/admin/registerproduct" className="sub-item item-dashboard">Novo Imóvel</Link>
                            </ListItem>
                        </List>
                    </Collapse>
                    <ListItem
                        button
                        onClick={(event) => setOpenCategory(!openCategory)}
                        className={openCategory + ' l1'}>
                        <span className=' item item-users'><CategoryIcon className="icon"></CategoryIcon>Categorias <ExpandMore className="icon-arrow" /></span>

                    </ListItem>
                    <Collapse className="box-l2" in={!openCategory} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className='l2' selected={selectedIndex === 4.1} onClick={(event) => handleListItemClick(event, 4.1)}>
                                <Link to="/admin/categorytlist" className="sub-item item-dashboard">Lista de Categorias</Link>
                            </ListItem>
                            <ListItem button className='l2' selected={selectedIndex === 4.2} onClick={(event) => handleListItemClick(event, 4.2)}>
                                <Link to="/admin/registercategory" className="sub-item item-dashboard">Nova Categoria</Link>
                            </ListItem>
                        </List>
                    </Collapse>
                </List>
            </nav>

            <div className="item-user">
                { /* <span className="img-user">
                    <img src={userImg} alt="User"></img>
                    </span> */ }
                <div className="name-user"><p>{name}</p></div>
                <button onClick={handleLogout} className="logout-user" title="Logout"><ExitToAppIcon></ExitToAppIcon></button>
            </div>
        </section >
    )
};

export default Menu;