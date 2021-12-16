import {BrowserRouter as Router} from 'react-router-dom'

import '../../admin-side/static/css/Admin.css';
import '../../admin-side/static/css/Content.css';
import Menu from '../../admin-side/layout/Menu';
import Content from '../../admin-side/Content';
import Loginadmin from '../../admin-side/Loginadmin';
import { AuthAdminContext } from '../../Context/AuthAdminContext';
import { useContext } from 'react';

function Admin() { 
  const { logged } = useContext(AuthAdminContext); 

  if(logged) {
    return (
      <div id="content-principal">
        <Router>
          <Menu></Menu>
          <Content></Content>
        </Router>
      </div>
    )
  } else { 
      return(
        <Loginadmin></Loginadmin>
      )
  }
}

export default Admin;
