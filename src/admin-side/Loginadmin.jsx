import React from 'react';
import { useState, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import { AuthAdminContext } from '../Context/AuthAdminContext';
import AutorenewIcon from '@material-ui/icons/Autorenew';

import './static/css/Login.css'
//import futAgencyLogo from '../../img/fut-agency-logo.png';

const Loginadmin = () => {

    const [type, setType] = useState(false);
    const { handleLogin, loading } = useContext(AuthAdminContext);
    const [{ ...dataLogin }, setDataLogin] = useState({ email: '', password: '' });

    const handleClickShowPassword = () => {
        setType(!type);
    };

    return (
        <section id="content-login">
            <div className="container">
                <div className="box-logo">
                    <img src="" alt="Fut Agency Logo"></img>
                </div>
                <div className="box-login">
                    <h1 className="title-login">Login</h1>
                    <TextField onChange={e => setDataLogin({ ...dataLogin, email: e.target.value })} type="email" className="input-login" label="E-mail" color="secondary" />
                    <TextField onChange={e => setDataLogin({ ...dataLogin, password: e.target.value })} type={type ? 'text' : 'password'} className="input-login" label="Password" color="secondary" InputProps={{
                        endAdornment: <InputAdornment position="end">
                            <IconButton
                                onClick={handleClickShowPassword}
                            >
                                {type ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>,
                    }} />
                    <Button variant="contained" color="primary" className="btn-login" onClick={e => handleLogin(dataLogin)}>
                        {loading === false && <p>Login</p>}
                        {loading === true && <AutorenewIcon className="rotating"></AutorenewIcon>}
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default Loginadmin;
