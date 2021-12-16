import React from 'react';
import { createContext, useState, useEffect } from 'react';
import swal from 'sweetalert';
import axios from 'axios';

const AuthAdminContext = createContext();
const logged = false;

function AuthAdminProvider({ children }) {
    const [logged, setLogged] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const login = localStorage.getItem('LoginAdmin') || localStorage.getItem('LoginPlayer');

        if (login) {
            setLogged(true);
        }

        setLoading(false);

    }, []);


    async function handleLogin(dataLogin) {
        setLoading(true);

        var itensInput = document.querySelectorAll('.MuiInputBase-input');

        await axios.post('https://fut-agency-api.herokuapp.com/authentication/authenticate', dataLogin)
            .then(response => {
                [].forEach.call(itensInput, function (el) {
                    el.value = '';
                });

                const role = response.data.user.role;

                switch (role) {
                    case "admin":
                        localStorage.setItem('LoginAdmin', JSON.stringify(response.data));
                        setLogged(true);
                        break;

                    case "player":
                        localStorage.setItem('LoginPlayer', JSON.stringify(response.data));
                        setLogged(true);
                        break;

                    case "user":
                        swal("Error!", "Incorrect email or password", "error");
                        break;

                    default:
                        break;
                }
            })
            .catch(error => {
                swal("Error!", "Incorrect email or password", "error");
            });

        setLoading(false);
    }

    function handleLogout() {
        localStorage.removeItem('LoginAdmin');
        localStorage.removeItem('LoginPlayer');
        setLogged(false);
    }

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <AuthAdminContext.Provider value={{ logged, handleLogin, handleLogout, loading }}>
            {children}
        </AuthAdminContext.Provider>
    );
}

export { AuthAdminContext, AuthAdminProvider };