import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faYoutube, faFacebook, faTwitter, faInstagram

} from "@fortawesome/free-brands-svg-icons";




function Footer() {
    return (
        <div className="container">
            <div className="row">
                <h5>message us on...</h5>
                <div className="col-6 col-md">
                    <a className="facebook social" href="https://www.facebook.com/"> <FontAwesomeIcon icon={faFacebook} size="2x" /></a>
                </div>
                <div className="col-6 col-md">
                    <a className="youtube social" href="https://www.youtube.com/"><FontAwesomeIcon icon={faYoutube} size="2x" /></a>
                </div>
                <div className="col-6 col-md">
                    <a className="instagram social" href="https://www.instagram.com/"><FontAwesomeIcon icon={faTwitter} size="2x" /></a>
                </div>
                <div className="col-6 col-md">
                    <a className="twitter social" href="https://www.twitter.com/"><FontAwesomeIcon icon={faInstagram} size="2x" /></a>
                </div>
                <div className="col-12 col-md">
                    <small className="d-block mb-3 text-muted">@ 2021-2022</small>
                </div>
            </div>
        </div>
    )

}

export default Footer;