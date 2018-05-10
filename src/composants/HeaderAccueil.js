import React, { Component } from 'react';

import PropTypes from 'prop-types'
import './HeaderAccueil.css'
import '@ladjs/bootstrap-social/bootstrap-social.css'
import 'font-awesome/css/font-awesome.css'
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';



class HeaderAccueil extends Component {
  render() {
    return (
    	<Grid fluid>
    		<Row  className="aPropos ">
		    	<Col xsHidden md={12} className="background ">
				        <h1 className="textHeader">Bonjour ! </h1> 
				        <p className="textHeader"> Je suis développeuse informatique <br/> passionnée par l univers du Web</p>	
			    </Col>
	    	</Row>
	    <Grid>
		        <Row className="aPropos">
		        	<Col xs={12} md={8} >
		        		<h2><span className="glyfTitre glyphicon glyphicon-comment"></span><div className="petitTitre">En quelques mots,</div></h2>
		        		<p>Titulaire d’un bac plus 4 en architecture intérieure et n’ayant pas trouvé ma vocation dans ce secteur, 
		        		j’ai cherché un autre domaine dans lequel m’épanouir. Je l’ai trouvé dans l’informatique et plus précisément 
		        		dans le développement web qui est, petit à petit, devenu une passion. aujourd hui je souhaite en faire mon métier.</p>
		        		<h2><span className="glyfTitre glyphicon glyphicon-refresh"></span><div className="petitTitre">Actuellement,</div></h2>
		        		<p>je suis à la recherche d'un travaille comme développeuse web dans la région toulonnaise. Et je me forme en continu de chez moi.</p>
		        	</Col>
		        	<Col xs={12} md={4}>
		        		<h3 className="titreMeContacter">Me contacter :</h3>
		        		<p><span className="glyphicon glyphicon-envelope"></span> marinafront@hotmail.fr</p>
		        		<p><span className="glyphicon glyphicon-earphone"></span> 06 02 10 85 07</p>
		        		<p><span className="glyphicon glyphicon-home"></span> 195 chemin des chênes<br/> 83130 LA GARDE</p>
		        		<h3>Me suivre :</h3>
		        		<a className="btn btn-block btn-social btn-linkedin">
		        			<span className="fa fa-linkedin"></span>
		        			 Sign in with LinkedIn
		        		</a>
		        		<a className="btn btn-block btn-social btn-github">
		        			<span className="fa fa-github"></span>
		        			 Sign in with LinkedIn
		        		</a>
		        		
		        	</Col>
		        </Row>
		        <Row className="competences">
		        	<Col xs={12} md={8}>
		        		<Row>
                            <h2><span className="glyphicon glyphicon-wrench"></span> Compétences</h2> 
                        </Row>
                        <Row>
                        	<Col xs={12} md={6}>
	                            <div className="ligne">  
	                                <div className="libelle">HTML-CSS-Bootstrap</div>  
	                                <div className="classement classement5"></div>  
	                            </div>
	                            <div className="ligne"> 
	                                <div className="libelle">JS-jQuery-React</div>   
	                                <div className="classement classement3"></div>
	                            </div>   
	                            <div className="ligne"> 
	                                <div className="libelle">Php</div>   
	                                <div className="classement classement3"></div>
	                            </div> 
	                        </Col>
	                        <Col xs={12} md={6}>
	                            <div className="ligne"> 
	                                <div className="libelle">SQL</div>   
	                                <div className="classement classement3"></div>
	                            </div>
	                            <div className="ligne"> 
	                                <div className="libelle">Git</div>   
	                                <div className="classement classement4"></div>
	                            </div>
	                            <div className="ligne">  
	                                <div className="libelle">Suite Adobe</div>  
	                                <div className="classement classement5"></div> 
	                            </div>
	                        </Col>
                        </Row>
		        	</Col>
		        	<Col xs={12} md={4}>
		        		<div className="photoIdentite">
		        		</div>
		        	</Col>
		        </Row>

	       </Grid>
        </Grid>
      );
  }
}

export default HeaderAccueil;
