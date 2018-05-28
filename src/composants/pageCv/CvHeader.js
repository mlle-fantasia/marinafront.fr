import React, { Component } from 'react';

import './CvHeader.css'
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';



class CvHeader extends Component {
	  render() {
		    return (
			    <div className="headerCv">
				    <Grid fluid>
						<Row>
						    <Grid>
								<Row className="texte">
									<Col xs={12} md={12}>
									    Mon CV est disponible au format PDF :  
									    <a href={require('../../assets/pdf/CV2018.pdf')} target="_blank">
									    	<button className="btn">Mon CV</button>
									    </a>
									</Col>
								</Row>
							</Grid>
						</Row>
					</Grid>
				</div>
		    );
	  }
}

export default CvHeader;