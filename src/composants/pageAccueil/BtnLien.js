import React from 'react';

import PropTypes from 'prop-types'
import './Liens.css'
import '@ladjs/bootstrap-social/bootstrap-social.css'
import 'font-awesome/css/font-awesome.css'

import Col from 'react-bootstrap/lib/Col';


const BtnLien = ({nom, etat}) =>

    <Col xs={12} sm={4} md={4}>
        <button className={`center-block ${etat}`}>

            <div className={nom}></div>
            <div className="text">{nom}</div>

        </button>
    </Col>


BtnLien.defaultProps = {
    etat: 'pageInactive'
}


BtnLien.propTypes = {
    nom: PropTypes.string.isRequired,
    etat: PropTypes.oneOf([
        'pageActive',
        'pageInactive',
    ]).isRequired,
    onClick: PropTypes.func.isRequired,

}

export default BtnLien;


