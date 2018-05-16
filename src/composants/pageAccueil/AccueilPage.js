import React, { Component } from 'react';

import PropTypes from 'prop-types'
import './AccueilPage.css'
import '@ladjs/bootstrap-social/bootstrap-social.css'
import 'font-awesome/css/font-awesome.css'
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';



class AccueilPage extends Component {
  render() {
    return (
	    <Grid fluid>
	    <div className="identite">
		 </div>
		        <Row className="quelquesMots">
		        	<Col xs={12} md={6} className="texte">
		        		<h2><span className="glyfTitre glyphicon glyphicon-comment"></span><div className="petitTitre">En quelques mots,</div></h2>
		        		<p>Titulaire d’un bac plus 4 en architecture intérieure et n’ayant pas trouvé ma vocation dans ce secteur, 
		        		j’ai cherché un autre domaine dans lequel m’épanouir. Je l’ai trouvé dans l’informatique et plus précisément 
		        		dans le développement web qui est, petit à petit, devenu une passion. aujourd hui je souhaite en faire mon métier.</p>
		        	</Col>
		        </Row>
				<Row className="actuellemnt">
		        	<Col xs={12} md={6} >
		        		<h2><span className="glyfTitre glyphicon glyphicon-refresh"></span><div className="petitTitre">Actuellement,</div></h2>
		        		<p>je suis à la recherche d'un travaille comme développeuse web dans la région toulonnaise.<br/> Et je me forme en continu de chez moi.</p>
		        	</Col>
		        </Row>
        </Grid>
      );
  }
}

export default AccueilPage;
