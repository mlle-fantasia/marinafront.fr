import React, { Component } from 'react';

import PropTypes from 'prop-types'
import './Footer.css'
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';



class Footer extends Component {

constructor(props) {
    super(props);
    
  }

  render() {
    return (
    	
			<div className="footer">
				<Grid>
					<Row>
						<Col xs={12} sm={4} md={4}>
								<h3>Mes Infos :</h3>
								<p>Marina Front<br/>
								Développeuse Web<br/>
								région toulonnaise<br/>
								<a href="../app.js">retour à l'accueil</a></p>        	
						</Col>
						<Col xs={12} sm={4} md={4}>
							<h3>Me contacter :</h3>
				        	<p> marinafront@hotmail.fr<br/>
				        	 06 02 10 85 07<br/>
				        	Ou <a>Cliquez ici</a></p>	      	
						</Col>
						<Col xs={12} sm={4} md={4}>
							<h3>Mon CV :</h3>
							<button className="btn" >
							<a href="./composants/pdf/CV 2018.pdf">Consultez mon CV</a>
							</button>	      	
						</Col>
					</Row>
					<Row className="ligneSeparation">
						<p>Ce site à été réalisé avec React-Bootstrap</p>
					</Row>
				</Grid>
			</div>
		
    );
  }
}

export default Footer;