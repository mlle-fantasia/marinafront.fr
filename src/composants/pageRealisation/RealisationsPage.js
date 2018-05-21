import React, { Component } from 'react';

import './RealisationsPage.css'
import '@ladjs/bootstrap-social/bootstrap-social.css'
import 'font-awesome/css/font-awesome.css'
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';



class RealisationsPage extends Component {
  render() {
    return (
	    <Grid className="realisation">
		    <Row>
		        <Col xs={12} md={6}>
					<h2><span className="glyfTitre glyphicon glyphicon-comment"></span><div className="petitTitre">Quelques réalisations:</div></h2>
				</Col>	
		    </Row>
		    <Row >
		        <Col xs={12} sm={6} md={4} className="margin" >
					<div className="uneRea randonnee"></div>
					<div className="texte">Un site de randonnée complet</div>
				</Col>
				<Col xs={12} sm={6} md={4} className="margin">
					<div className="uneRea ptidej">
					</div>
					<div className="texte">Une landing page one page</div>
				</Col>
				<Col xs={12} sm={6} md={4} className="margin">
					<div className="uneRea pendu">
					</div>
					<div className="texte">Un TP React</div>
				</Col>	
		    
		        <Col xs={12} sm={6} md={4} className="margin">
					<div className="uneRea cuisiner">
					</div>
					<div className="texte">Un site de cuisine</div>
				</Col>
				<Col xs={12} sm={6} md={4} className="margin">
					<div className="uneRea domotique">
					</div>
					<div className="texte">Projet tutoré en groupe</div>
				</Col>
				<Col xs={12} sm={6} md={4}>
					<div className=" ">
					</div>
				</Col>	
		    </Row>
        </Grid>
      );
  }
}

export default RealisationsPage;
