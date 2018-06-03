import React, { Component } from 'react';
import CvHeader from './CvHeader.js';
import './CvPage.css'
import '@ladjs/bootstrap-social/bootstrap-social.css'
import 'font-awesome/css/font-awesome.css'
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';



class CvPage extends Component {
	  render() {
		    return (
		    	<div>
					<CvHeader/>
			    	<Grid >
			    			<Row >
							    <Col xs={12} md={12}>
							      	<h2><span className="glyfTitre glyphicon glyphicon-wrench"></span><div className="petitTitre">Mes compétences :</div></h2>
							    </Col>
						  </Row>
						  <Row className="competencesDecription">
							    <Col xs={12} md={12}>
							      	<p>Les Compétences listées ci-dessous, je les ai acquises : <br/> - Premièrement grâce à de nombreux cours et documentations
							      	sur internet (openclassrooms, developpez.com, stack overflow, W3schools et bien d'autres) et en imaginant et créant divers 
							      	sites internet que vous pourrez observer dans l'onglet "Réalisations". <br/>
							      	- Deuxièmement, grâce à la formation Développement et Administration Systeme d'Information Expert que j'ai suivie avec grand intérêt de janvier à mai 2018.</p>
							    </Col>
						  </Row>
						  <Row className="competenceListe">
							    <Col xs={12} md={3}>
							      	<h3>Je maitrise :</h3>
							      	<p>HTML/CSS</p>
							      	<p>Bootstrap</p>
							      	<p>Suite Adobe</p>
							    </Col>
							     <Col xs={12} md={3}>
							      	<h3>J'ai une marge de progression sur :</h3>
							      	<p>PHP</p>
							      	<p>SQL</p>
							      	<p>React</p>
							      	<p>JS/jQuery</p>
							    </Col>
							     <Col xs={12} md={3}>
							      	<h3>J'ai les bases en :</h3>
							      	<p>Sécurité Informatique (SSI)</p>
							      	<p>Git</p>
							      	<p>Java</p>
							      	<p>Methode Agile</p>
							      	<p>Symfony 4</p>
							      	<p>Twig</p>
							    </Col>
							    <Col xs={12} md={3}>
							      	<h3>J'apprendrai prochainement :</h3>
							      	<p>Doctrine</p>
							      	<p>Angular</p>
							    </Col>
						  </Row>
					</Grid>
					<div className="parcours">
				    	<Grid fluid>
							  <Row className="texte">
								<Grid>
									<Row>
									    <Col xs={12} md={12}>
									      	<h2><span className="glyfTitre glyphicon glyphicon-road"></span><div className="petitTitre">Mon parcours en quelques lignes :</div></h2>
									    </Col>
								    </Row>
								</Grid>
							  </Row>
						</Grid>
					</div>
					<Grid className="parcoursDetails">
						  
						  <Row className="ligne">
							    <Col xs={12} md={5}>
							      	
							    </Col>
						  </Row>
						  <Row className="bordure">
							    <Col xs={12} md={12}>
							      	<p>Validation de la Formation Développement et Administration Système d’Information Expert (DASIE), Greta du var</p>
							    </Col>
						  </Row>
						  <Row className="bordure">
							    <Col xs={12} md={12}>
							      	<p>Quelques expériences de vendeuse en magasin :<br/>
								 	-Vendeuse caissière dans les magasins Casa (Grasse et Villeneuve-Loubet(06))<br/>
									-Conseillère vendeuse en mobilier et responsable du rayon libre service (décoration) dans le magasin Fly (Antibes(06))<br/><br/>

									Ceci en me formant chez moi dans le développement Web en vue d’une réorientation professionnelle</p>
							    </Col>
						  </Row>
						  <Row className="bordure facebookMF">
							    <Col xs={12} md={12}>
							      	<p>Création de mon auto-entreprise MlleFantasia : <br/>Création de bijoux fantaisie et ventes sur les marchés artisanaux</p>
							      	<a href="https://www.facebook.com/mademoisellefantasia" target="_blank" rel="noopener noreferrer" className="btn btn-block btn-social btn-facebook">
		        						<span className="fa fa-facebook"></span>
		        			 				Mlle Fantasia
		        					</a>
							    </Col>
						  </Row>
						  <Row className="bordure facebookMF">
							    <Col xs={12} md={12}>
							      	<p>Etudes en architecture intérieure, BTS et Diplôme Supérieur d'Arts Appliqués</p>
							    </Col>
						  </Row>
						  
					</Grid>
					
					

				</div>
		    );
	  }
}

export default CvPage;
