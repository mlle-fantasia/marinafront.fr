import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { Col, Grid, Row } from "react-bootstrap";
import PropTypes from "prop-types";

class Footer extends Component {
	static contextTypes = {
		user: PropTypes.object,
	};

	render() {
		return (
			<div className="footer">
				<Grid>
					<Row>
						<Col xs={12} sm={4} md={4}>
							<h3>Mes Infos :</h3>
							<p>
								Marina Front
								<br />
								Développeuse Web
								<br />
								Région {this.context.user.area}
								<br />
								<Link to="/">Retour à l'accueil</Link>
							</p>
						</Col>
						<Col xs={12} sm={4} md={4}>
							<h3>Me contacter :</h3>
							<p>
								{this.context.user.email}
								<br />
								{this.context.user.tel}
								<br />
							</p>
						</Col>
						<Col xs={12} sm={4} md={4}>
							<h3>Mon CV :</h3>
							<a href={require("../assets/pdf/CV2018+fiche.pdf")} target="_blank" rel="noopener noreferrer">
								<button className="btn">Mon CV</button>
							</a>
						</Col>
					</Row>
					<Row className="ligneSeparation">
						<p>
							Ce site a été réalisé avec React-Bootstrap | <Link to="/mentions-legales">Mentions légales</Link>
						</p>
					</Row>
				</Grid>
			</div>
		);
	}
}

export default Footer;
