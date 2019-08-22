import { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import React from "react";
import "./Login.css";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: ""
		};
	}

	handleConnexion(event) {
		var apiBaseUrl = "http://localhost:3001/";
		var self = this;
		var payload = {
			email: this.state.username,
			password: this.state.password
		};
		axios
			.post(apiBaseUrl + "utilisateurs/authentification", payload)
			.then(function(response) {
				console.log(response);
				if (response.data.code == 200) {
					console.log("Login successfull");
				} else if (response.data.code == 204) {
					console.log("Username password do not match");
				} else {
					console.log("Username does not exists");
				}
			})
			.catch(function(error) {
				console.log(error);
			});
	}

	render() {
		return (
			<Grid className=" ">
				<div className="login">
					<Row className="">
						<Col md={12} className=" header ">
							<h1 className="text-center">Salut Marina !</h1>
							<div className="form">
								<form onSubmit={this.handleConnexion()}>
									<div className="input formLogin">
										<label htmlFor="">login</label>
										<br />
										<input type="text" onChange={(event, newValue) => this.setState({ username: newValue })} />
									</div>
									<div className="input formPass">
										<label htmlFor="">mot de passe</label>
										<br />
										<input type="password" onChange={(event, newValue) => this.setState({ password: newValue })} />
									</div>
									<div className="formBtn">
										<button type="submit" className="btn btn-rea-suite">
											Se connecter
										</button>
									</div>
								</form>
							</div>
						</Col>
					</Row>
				</div>
			</Grid>
		);
	}
}
export default Login;
