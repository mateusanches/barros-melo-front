import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import swal from 'sweetalert';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from "@material-ui/icons/Close";
import TextField from '@material-ui/core/TextField';

//import '../../../../static/css/ProductListAdmin.css';

const PlayerList = () => {
    const dataAdmin = JSON.parse(localStorage.getItem('LoginAdmin'));
    const [players, setPlayers] = useState([]);
    const [playerInfo, setPlayerInfo] = useState({ name: "", lastName: "", email: "", country: "", twitter: "", stripeId: "", discord: "", paypal: "" });
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const authorization = dataAdmin.token;

    useEffect(() => {
        getData();
    }, []);

    console.log(playerInfo)

    async function updatePlayer() {
        setLoadingBtn(true);
        try {
            const response = await axios({
                method: 'put',
                url: 'https://fut-agency-api.herokuapp.com/user/update',
                data: { ...playerInfo, userId: playerInfo._id },
                headers: {
                    Authorization: 'Bearer ' + authorization
                }
            });
            swal("Success", "Player successfully registered", "success");
            document.location.reload(true);
        }
        catch (error) {
            swal("Error!", "There was a problem with the registration", "error");
        }
        setLoading(false);
    }

    const contentModalEdit = (player) => {
        setModalEdit(!modalEdit);
        setPlayerInfo(player);
    }

    const getData = async () => {
        setLoading(true);
        try {
            const response = await axios({
                method: 'get',
                url: 'https://fut-agency-api.herokuapp.com/user/players',
                headers: {
                    Authorization: 'Bearer ' + authorization
                }
            })
            const content = response.data.players;
            setPlayers(content);
        } catch (error) {
            alert(error.message);
        }
        setLoading(false);
    };

    const updadeStatus = async (id, status) => {
        const url = status ? 'https://fut-agency-api.herokuapp.com/user/disable' : 'https://fut-agency-api.herokuapp.com/user/enable'
        console.log(url)
        swal("Warning", "Want to update this player?", {
            closeOnClickOutside: true,
            dangerMode: true,
            closeOnEsc: true,
            buttons: {
                cancel: {
                    text: "Cancel",
                    value: "cancel",
                },
                confirm: {
                    text: "Confirm",
                    value: "confirm",
                },

            },
            icon: "info",
        })
            .then((value) => {
                if (value == "confirm") {
                    try {
                        axios({
                            method: 'put',
                            url: url,
                            data: { userId: id },
                            headers: {
                                Authorization: 'Bearer ' + authorization
                            }
                        });
                        swal("Success", "Player successfully updated", "success")
                            .then(() => {
                                document.location.reload(true);
                            });


                    } catch (error) {
                        swal("Error!", "There was a problem with the process", "error");
                    }
                }
            });
    };

    const playerList = players.map(player => {
        const status = player.active ? 'A' : 'I'
        return (
            <ListItem key={player._id} className="item-product">
                <p className="item-name">{player.name}</p>
                <p className="item-name">{player.email}</p>
                <p className={"item-name status " + player.active}><span>{status}</span></p>
                <div className="itens-btn">
                    <Button className="btn edit" onClick={() => contentModalEdit(player)}> <EditIcon /> </Button>
                </div>
                <div className="itens-btn">
                    <Button
                        onClick={() => updadeStatus(player._id, player.active)}
                        className="btn edit">{player.active ? 'Disable' : 'Enable'}
                    </Button>
                </div>
                <div className={modalEdit ? "modal-edit modal-active" : "modal-edit"}>
                    <div className="overlay-modal-edit" onClick={() => setModalEdit(!modalEdit)}></div>
                    <div className="content-modal-edit">
                        <div className="modal-header">
                            <h3 className="modal-title">Player Edit</h3>
                            <CloseIcon className="close-modal" onClick={() => setModalEdit(!modalEdit)} />
                        </div>
                        <div className="box-form">
                            <TextField value={playerInfo.name} onChange={e => setPlayerInfo({ ...playerInfo, name: e.target.value })} type="text" className="input-cadastro" required label="Name" />
                            <TextField value={playerInfo.lastName} onChange={e => setPlayerInfo({ ...playerInfo, lastName: e.target.value })} type="text" className="input-cadastro" required label="Last Name" />
                            <TextField value={playerInfo.email} onChange={e => setPlayerInfo({ ...playerInfo, email: e.target.value })} type="text" className="input-cadastro" required label="E-mail" />
                            <TextField value={playerInfo.country} onChange={e => setPlayerInfo({ ...playerInfo, email: e.target.value })} type="text" className="input-cadastro" required label="Country" />
                            <TextField value={playerInfo.discord} onChange={e => setPlayerInfo({ ...playerInfo, email: e.target.value })} type="text" className="input-cadastro" required label="Discord" />
                            <TextField value={playerInfo.paypal} onChange={e => setPlayerInfo({ ...playerInfo, email: e.target.value })} type="text" className="input-cadastro" required label="Paypal" />
                            <TextField value={playerInfo.twitter} onChange={e => setPlayerInfo({ ...playerInfo, email: e.target.value })} type="text" className="input-cadastro" required label="Twitter" />
                            <TextField value={playerInfo.stripeId} onChange={e => setPlayerInfo({ ...playerInfo, email: e.target.value })} type="text" className="input-cadastro" required label="Stripe ID" />
                            <Button variant="contained" color="primary" className="btn-cadastro" onClick={updatePlayer}>
                                {loadingBtn === false && <p>Save</p>}
                                {loadingBtn === true && <CircularProgress className="loading-icon" />}
                            </Button>
                        </div>
                    </div>
                </div>
            </ListItem>
        )
    });

    return (
        <div id="product-list" className="box-content">
            <List className="itens-product">
                <div className="header-list">
                    <p className="item-header name">Name</p>
                    <p className="item-header name">E-mail</p>
                    <p className="item-header name">Status</p>
                    <span className="spacing"></span>
                    <span className="spacing"></span>
                </div>
                {loading ? <CircularProgress></CircularProgress> : playerList}
            </List>
        </div>
    );
}

export default PlayerList;