import React, { Component } from 'react';

//import PropTypes from 'prop-types'
import './AccueilHeader.css'
import '@ladjs/bootstrap-social/bootstrap-social.css'
import 'font-awesome/css/font-awesome.css'
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';



class AccueilHeader extends Component {
  render() {
    return (
    	<Grid fluid>
    		<Row  className="header">

  		    	<Col xsHidden md={12} className="background ">
                <Row>
                  <Col xsHidden md={6} mdOffset={1}>
    				        <h1 className="titreHeader">Bonjour ! </h1> 
    				        <p className="textHeader"> Je suis <strong>développeuse</strong> informatique <br/> passionnée par l'univers du <strong>Web</strong></p>
                  </Col >
                </Row>
  			    </Col>

	    	</Row>     
      </Grid>
    );
  }
}

export default AccueilHeader;
