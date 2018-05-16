import React, { Component } from 'react';

import PropTypes from 'prop-types'
import './Liens.css'
import '@ladjs/bootstrap-social/bootstrap-social.css'
import 'font-awesome/css/font-awesome.css'
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';






const BtnLien = ({nom, etat, index, onClick}) =>

               <Col xs={12} md={4}>
					<button className={`center-block ${etat}`} onClick={() => onClick(nom)}>
						<div className={nom}></div>
						<div className="text">{nom}</div>
					</button>
				</Col>
            

BtnLien.defaultProps = {
  etat: 'pageInactive'
}


BtnLien.propTypes={
	nom: PropTypes.string.isRequired,
	etat : PropTypes.oneOf([
		'pageActive',
		'pageInactive',
	]).isRequired,
	index: PropTypes.number.isRequired,
	onClick : PropTypes.func.isRequired,
}

export default BtnLien;


