import { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import React from "react";
import "./Login.css";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";

class Login extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value,
		});
	}
	handleSubmit() {
		const { login, pass } = this.state;
		axios
			.post(process.env.REACT_APP_API_MARINAFRONT + "/login", {
				login: login,
				pass: pass,
			})
			.then((response) => {
				if (response.data.error) {
					console.log("il y a une erreur");
					return true;
				}
				console.log(response);
				if (response.data === "ok") {
					this.setState({ loginOK: true });
				}
			});
	}
	redirectToAdmin() {
		if (this.state.loginOK) {
			console.log("this.state.loginOK ", this.state.loginOK);
			return <Redirect to="/fantasia/admin/" />;
		}
	}

	render() {
		return (
			<Grid className=" ">
				{this.redirectToAdmin()}
				<div className="login">
					<Row className="">
						<Col md={12} className=" header ">
							<h1 className="text-center">Salut Marina !</h1>
							<div className="form">
								<h3 className="text-center">Prouve que tu es moi</h3>
								<div>
									<div className="input formLogin">
										<label htmlFor="">login</label>
										<br />
										<input
											className="form-control"
											name="login"
											value={this.state.login}
											type="text"
											onChange={this.handleChange}
										/>
									</div>
									<div className="input formPass">
										<label htmlFor="">mot de passe</label>
										<br />
										<input
											className="form-control"
											name="pass"
											value={this.state.pass}
											type="password"
											onChange={this.handleChange}
										/>
									</div>
									<div className="formBtn">
										<button className="btn btn-rea-suite" onClick={this.handleSubmit}>
											Se connecter
										</button>
									</div>
								</div>
							</div>
						</Col>
					</Row>
				</div>
			</Grid>
		);
	}
}
export default Login;
