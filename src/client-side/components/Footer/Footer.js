import React from 'react';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';

import "../../static/css/footer.css";


const Footer = () => {
    return (
        <div id="footer">
            <div className="content-footer">
                <div className="logo-footer">
                    <img src="/images/logo.png" alt="logo" />
                </div>
                <div className="text-footer">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam porttitor ac urna in mattis. Sed mollis justo sed dolor posuere sagittis.</p>
                </div>
                <div className="redes-sociais">
                    <a href="#" target="_blank" title="Facebook"><FacebookIcon /></a>
                    <a href="#" target="_blank" title="Instagram"><InstagramIcon /></a>
                </div>
            </div>
        </div>
    )
}

export default Footer;