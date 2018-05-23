import React, { Component } from 'react';

import './RealisationsPage.css'
import '@ladjs/bootstrap-social/bootstrap-social.css'
import 'font-awesome/css/font-awesome.css'
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import axios from 'axios';

class RealisationsPage extends Component {


 state = {
      realisations: []
    }


  componentDidMount() {
   		axios.get("http://api.marinafront.fr").then((response)=>{
   			if(response.data.error){
   				console.log("tu as une erreur");
   				return true;
   			}
           const realisations =response.data.payload;
           this.setState({realisations});
        });


  };
/*
  componentWillUnmount() {
    this.serverRequest.abort();
  };*/

  render() {

  	const {realisations} = this.state;


    return (
	    <Grid className="realisation">
		    <Row>
		        <Col xs={12} md={6}>
					<h2><span className="glyfTitre glyphicon glyphicon-comment"></span><div className="petitTitre">Quelques réalisations:</div></h2>
				</Col>	
		    </Row>
		    <Row >
		     {realisations.map((object, i) => 
		     	<Col xs={12} sm={6} md={4} key={i} className="margin" >
					<div className={`uneRea ${object.image}`}></div>
					<div className="texte">{object.titre}</div>
				</Col>)}
		        
		    </Row>
        </Grid>
      );
  }
}

export default RealisationsPage;
