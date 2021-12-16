import React from 'react';
import { createContext, useState, useEffect } from 'react';
import swal from 'sweetalert';
import axios from 'axios';

const AuthContext = createContext();
const logged = false;

function AuthProvider({ children }) {
    const [logged, setLogged] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const login = localStorage.getItem('Login');

        if (login) {
            setLogged(true);
        }

        setLoading(false);

    }, []);


    async function handleLogin(dataLogin) {
        setLoading(true);
        console.log(dataLogin);

        var itensInput = document.querySelectorAll('.MuiInputBase-input');

        await axios.post('https://fut-agency-api.herokuapp.com/authentication/authenticate', dataLogin)
            .then(response => {
                [].forEach.call(itensInput, function (el) {
                    el.value = '';
                });
                setLogged(true);
                localStorage.setItem('Login', JSON.stringify(response.data));
                window.location.href = "http://" + window.location.host + "/login";
            })
            .catch(error => {
                swal("Error!", "Incorrect email or password", "error");
            });

            setLoading(false);
    }

    function handleLogout() {
        localStorage.removeItem('Login');
        setLogged(false);
        window.location.reload();
    }

    if(loading){
        return <p>Loading...</p>
    }

    return (
        <AuthContext.Provider value={{ logged, handleLogin, handleLogout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };