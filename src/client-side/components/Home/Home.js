import React from 'react';
import HouseIcon from '@material-ui/icons/House';
import ApartmentIcon from '@material-ui/icons/Apartment';
import TerrainIcon from '@material-ui/icons/Terrain';

import "../../static/css/home.css";

const Home = () => {
    return (
        <div id="home">
            <div className="banner-home"></div>
            <div className="container-select">
                <div className="items">
                    <div className="item-select">
                        <HouseIcon className="icon-select" />
                        <p>Casas</p>
                    </div>
                    <div className="divider"></div>
                    <div className="item-select">
                        <ApartmentIcon className="icon-select" />
                        <p>Apartamentos</p>
                    </div>
                    <div className="divider"></div>
                    <div className="item-select">
                        <TerrainIcon className="icon-select" />
                        <p>Terrenos</p>
                    </div>
                </div>
            </div>
            <a href="/anuncie" className="container-anuncie">
                <p className="text-anuncie">Anuncie</p>
            </a>
        </div>
    )
}

export default Home;