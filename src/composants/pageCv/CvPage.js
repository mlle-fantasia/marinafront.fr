import React, { Component } from "react";
import CvHeader from "./CvHeader.js";
import "./CvPage.css";
import "@ladjs/bootstrap-social/bootstrap-social.css";
import "font-awesome/css/font-awesome.css";
import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import NavIcons from "../NavIcons";
// import CodeHighlight from 'react-code-highlight';
//
// // import all the styles
// import "react-syntax-highlight/lib/style.css";
// import "highlight.js/styles/xcode.css";

class CvPage extends Component {
	render() {
		return (
			<div>
				<CvHeader />
				<Grid>
					<Row>
						<Col xs={12} md={12}>
							<h2>
								<span className="glyfTitre glyphicon glyphicon-wrench"></span>
								<div className="petitTitre">Mes compétences :</div>
							</h2>
						</Col>
					</Row>
					<Row className="competencesDecription">
						<Col xs={12} md={12}>
							<p>Les Compétences listées ci-dessous, je les ai acquises : </p>
							<ul>
								<li>
									Grâce à de nombreux cours et documentations sur internet (openclassrooms, developpez.com, stack overflow,
									W3schools et bien d'autres) et en imaginant et créant divers sites internet que vous pourrez observer dans
									l'onglet "Réalisations".
								</li>
								<li>
									Grâce à la formation Développement et Administration Systèmes d'Informations Expert que j'ai suivie avec grand
									intérêt de janvier à mai 2018.
								</li>
								<li>
									Gràce à deux ans d'alternance dans l'entreprise 3doubleV où j'ai réalisé beaucoup de projets très variés avec
									différentes technologies comme Javascript, nodejs, express, vueJs, un framework maison...
								</li>
							</ul>
						</Col>
					</Row>
					<Row className="competenceListe">
						<Col xs={12} md={3}>
							<h3>Je maitrise :</h3>
							<p>HTML/CSS</p>
							<p>Bootstrap</p>
							<p>JS/jQuery</p>
							<p>NodeJs/ExpressJs</p>
							<p>VueJs</p>
							<p>Suite Adobe</p>
						</Col>
						<Col xs={12} md={3}>
							<h3>J'ai une marge de progression sur :</h3>
							<p>SQL</p>
							<p>React</p>
							<p>Angular</p>
							<p>WordPress</p>
							<p>Git</p>
						</Col>
						<Col xs={12} md={3}>
							<h3>J'ai les bases en :</h3>
							<p>Java</p>
							<p>Methode Agile</p>
							<p>Symfony 4 / Doctrine / Twig</p>
							<p>Sass</p>
						</Col>
						<Col xs={12} md={3}>
							<h3>J'apprendrai prochainement :</h3>
							<p>Réact 16</p>
						</Col>
					</Row>
					<hr />
					<Row className="certificationListe">
						<Col xs={12} md={12}>
							<h2>
								<span className="glyfTitre glyphicon glyphicon-ok"></span>
								<div className="petitTitre">Mes Certifications :</div>
							</h2>
						</Col>
						<ul>
							<li>
								<p>
									Attestaion de Formation{" "}
									<strong className="languageUtilise">Développement et Administration Systèmes d’Informations Expert</strong> :
									<a href={require("../../assets/pdf/attestationFormationGRETA.pdf")} target="_blank" rel="noopener noreferrer">
										<button className="btn">Mon attestation</button>
									</a>
								</p>
							</li>
							<li>
								<p>
									Certification OpenClassroom Réalisez une application web avec{" "}
									<strong className="languageUtilise">React.js</strong> :
									<a href={require("../../assets/pdf/Certificat-OCReact.pdf")} target="_blank" rel="noopener noreferrer">
										<button className="btn">Ma certification</button>
									</a>
								</p>
							</li>
							<li>
								<p>
									Certification OpenClassroom Développez des applications Web avec{" "}
									<strong className="languageUtilise">Angular</strong> :
									<a href={require("../../assets/pdf/Certificat-OC-Angular.pdf")} target="_blank" rel="noopener noreferrer">
										<button className="btn">Ma certification</button>
									</a>
								</p>
							</li>
							<li>
								<p>
									Certification OpenClassroom Créez un site moderne et professionnel avec{" "}
									<strong className="languageUtilise">WordPress 5</strong> :
									<a href={require("../../assets/pdf/CertificatOC-WordPress.pdf")} target="_blank" rel="noopener noreferrer">
										<button className="btn">Ma certification</button>
									</a>
								</p>
							</li>
							<li>
								<p>
									Attestation de L'ANSSI <strong className="languageUtilise">Sécurité Informatique</strong> :
									<a href={require("../../assets/pdf/attestation_secnumacademie.pdf")} target="_blank" rel="noopener noreferrer">
										<button className="btn">Mon Attestation</button>
									</a>
								</p>
							</li>
							<li>
								<p>
									Certification OpenClassroom Créez des pages web intéractives avec{" "}
									<strong className="languageUtilise">JavaScript</strong> :
									<a href={require("../../assets/pdf/Certificat-OpenClassroomsJS.pdf")} target="_blank" rel="noopener noreferrer">
										<button className="btn">Ma certification</button>
									</a>
								</p>
							</li>
							<li>
								<p>
									Certification OpenClassroom Apprenez à coder avec <strong className="languageUtilise">JavaScript</strong> :
									<a href={require("../../assets/pdf/Certificat-OpenClassroomsJS1.pdf")} target="_blank" rel="noopener noreferrer">
										<button className="btn">Ma certification</button>
									</a>
								</p>
							</li>
							<li>
								<p>
									Certification OpenClassroom Apprenez à créer votre site web avec{" "}
									<strong className="languageUtilise">HTML5 et CSS3</strong> :
									<a
										href={require("../../assets/pdf/Certificat-OpenClassroomsHTMLCSS.pdf")}
										target="_blank"
										rel="noopener noreferrer"
									>
										<button className="btn">Ma certification</button>
									</a>
								</p>
							</li>
						</ul>
					</Row>
				</Grid>
				<div className="parcours">
					<Grid fluid>
						<Row className="texte">
							<Grid>
								<Row>
									<Col xs={12} md={12}>
										<h2>
											<span className="glyfTitre glyphicon glyphicon-road"></span>
											<div className="petitTitre">Mon parcours en quelques lignes :</div>
										</h2>
									</Col>
								</Row>
							</Grid>
						</Row>
					</Grid>
				</div>
				<Grid className="parcoursDetails">
					<Row className="ligne">
						<Col xs={12} md={5}></Col>
					</Row>
					<Row className="bordure facebookMF">
						<Col xs={12} md={12}>
							<p>
								Actuellement en formation en alternace avec OpenClassroom. Je prépare le parcours dévelopeur d'applications frontend
								et je suis en alternance dans l'entreprise 3doubleV à Sophia Antipolis
							</p>
							<a
								href="https://www.3doublev.com"
								target="_blank"
								rel="noopener noreferrer"
								className="btn btn-block btn-social btn-facebook"
							>
								<span className="fa fa-check-circle-o"></span>
								Site 3doubleV
							</a>
						</Col>
					</Row>
					<Row className="bordure">
						<Col xs={12} md={12}>
							<p>Validation de la Formation Développement et Administration Système d’Information Expert (DASIE), Greta du var</p>
						</Col>
					</Row>
					<Row className="bordure">
						<Col xs={12} md={12}>
							<p>
								Quelques expériences de vendeuse en magasin :<br />
								- Vendeuse caissière dans les magasins Casa (Grasse et Villeneuve-Loubet(06))
								<br />
								- Conseillère vendeuse en mobilier et responsable du rayon libre service (décoration) dans le magasin Fly
								(Antibes(06))
								<br />
								<br />
								Ceci en me formant chez moi dans le développement Web en vue d’une réorientation professionnelle
							</p>
						</Col>
					</Row>
					<Row className="bordure facebookMF">
						<Col xs={12} md={12}>
							<p>
								Création de mon auto-entreprise MlleFantasia : <br />
								Création de bijoux fantaisie et ventes sur les marchés artisanaux
							</p>
							<a
								href="https://www.facebook.com/mademoisellefantasia"
								target="_blank"
								rel="noopener noreferrer"
								className="btn btn-block btn-social btn-facebook"
							>
								<span className="fa fa-facebook"></span>
								Mlle Fantasia
							</a>
						</Col>
					</Row>
					<Row className="bordure ">
						<Col xs={12} md={12}>
							<p>Etudes en architecture intérieure, BTS et Diplôme Supérieur d'Arts Appliqués</p>
						</Col>
					</Row>
				</Grid>
				<NavIcons />
			</div>
		);
	}
}

export default CvPage;
