import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './CvPage.css'
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';



class CvPage extends Component {
	  render() {
		    return (
		    	<div>
			    	
					<Grid className="parcours">
						  <Row >
							    <Col xs={12} md={12}>
							      	<h2><span className="glyfTitre glyphicon glyphicon-road"></span><div className="petitTitre">Mon parcours en quelques lignes :</div></h2>
							    </Col>
						  </Row>
						  <Row className="ligne">
							    <Col xs={12} md={5}>
							      	
							    </Col>
						  </Row>
						  <Row className="bordureGauche">
							    <Col xs={12} md={12}>
							      	Etudes en architecture intérieure, BAC +4 obtenu
							    </Col>
						  </Row>
						  <Row className="bordureDroite">
							    <Col xs={12} md={12}>
							      	Création de mon auto-entreprise MlleFantasia : <br/>Création de bijoux fantaisie et ventes sur les marchés artisanaux
							    </Col>
						  </Row>
						  <Row className="bordureGauche facebookMF">
							    <Col xs={12} md={12}>
							      	<a href="https://www.facebook.com/mademoisellefantasia">www.facebook.com/mademoisellefantasia</a>
							    </Col>
						  </Row>
						  <Row className="bordureDroite">
							    <Col xs={12} md={12}>
							      	Quelques expériences de vendeuse en magasin :<br/>
								 	-Vendeuse caissière dans les magasins Casa (Grasse et Villeneuve-Loubet(06))<br/>
									-Conseillère vendeuse en mobilier et responsable du rayon libre service (décoration) dans le magasin Fly (Antibes(06))<br/><br/>

									Ceci en me formant chez moi dans le développement Web en vue d’une réorientation professionnelle
							    </Col>
						  </Row>
						  <Row className="bordureGauche">
							    <Col xs={12} md={12}>
							      	Formation Développement et Administration Système d’Information Expert (DASIE), Greta du var
							    </Col>
						  </Row>
					</Grid>
					<div className="CompetencesCv">
				    	<Grid fluid>
							  <Row className="texte">
								<Grid>
									<Row>
									    <Col xs={12} md={12}>
									      	<h2><span className="glyfTitre glyphicon glyphicon-wrench"></span><div className="petitTitre">Mes compétences :</div></h2>
									    </Col>
								    </Row>
								</Grid>
							  </Row>
						</Grid>
					</div>
					<Grid >
						  <Row className="competencesDecription">
							    <Col xs={12} md={12}>
							      	<p>Les Compétences listées ci-dessous, je les ai acquises : <br/> - premièrement grâce à de nombreux cours et documentation
							      	sur internet (openclassrooms, developper.net, stack overflow, W3schools et bien d'autres) et en imaginant et créant divers 
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
							    </Col>
							    <Col xs={12} md={3}>
							      	<h3>J'apprendrai prochainement :</h3>
							      	<p>Symfony 4</p>
							      	<p>Twig</p>
							      	<p>Doctrine</p>
							    </Col>
						  </Row>
					</Grid>

				</div>
		    );
	  }
}

export default CvPage;
