import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import swal from 'sweetalert';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import CircularProgress from "@material-ui/core/CircularProgress";

const RegisterAdmin = () => {

    const [{ ...data }, setData] = useState({ email: '', password: '', name: '', lastName: ' ', country: ' ', role: 'admin' });
    const [loading, setLoading] = useState(false);

    async function submit() {
        setLoading(true);
        var itensInput = document.querySelectorAll('.MuiInputBase-input');

        axios.post('https://fut-agency-api.herokuapp.com/authentication/register', data)
            .then(response => {
                [].forEach.call(itensInput, function (el) {
                    el.value = '';
                    setLoading(false);
                });
                swal("Success", "Admin successfully registered", "success")
            })
            .catch(error => {
                swal("Error!", "There was a problem with the registration", "error");
                setLoading(false);
            });
    }

    return (
        <div id="cadastro-user" className="box-content">
            <h1 className="title-content">Register a new admin</h1>

            <div className="box-form">
                <TextField value={data.name} onChange={e => setData({ ...data, name: e.target.value })} id="standard-basic" type="text" className="input-cadastro" required  label="Name" />
                <TextField value={data.email} onChange={e => setData({ ...data, email: e.target.value })} id="standard-basic" type="email" className="input-cadastro" required  label="E-mail" />
                <TextField value={data.password} onChange={e => setData({ ...data, password: e.target.value })} id="standard-basic" type="password" className="input-cadastro" required  label="Password" />
                <Button variant="contained" color="primary" className="btn-cadastro" onClick={submit}>
                    {loading === false && <p>Save</p> }
                    {loading === true && <CircularProgress/> }
                    </Button>
            </div>
        </div>
    )
};

export default RegisterAdmin;