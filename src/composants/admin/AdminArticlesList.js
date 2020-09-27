import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import "./Admin.css";
import { Link } from "react-router-dom";
import axios from "axios";
import AdminArticlesForm from "./AdminArticlesForm";
import AdminProjetsForm from "./AdminProjetsForm";

class AdminArticlesList extends Component {
	state = {
		articles: [],
		ajouter: false,
		articlaAModifier: null,
		projetAModifier: null,
		projetOC: this.props.projetOC,
	};

	componentWillReceiveProps(nextProps) {
		console.log("je passe dans componentWillReceiveProps");
		this.setState({ projetOC: nextProps.projetOC });
		this.getArticleList(nextProps.projetOC);
	}

	componentDidMount() {
		console.log("je passe dans componentDidMount");
		const { projetOC } = this.state;
		this.getArticleList(projetOC);
	}

	ajouter(id) {
		console.log(id);
		const { projetOC } = this.state;
		if (projetOC) {
			if (id) {
				this.setState({ projetAModifier: id });
				this.setState({ ajouter: true });
			} else {
				this.setState({ ajouter: true });
			}
		} else {
			if (id) {
				this.setState({ articlaAModifier: id });
				this.setState({ ajouter: true });
			} else {
				this.setState({ ajouter: true });
			}
		}
	}
	liste() {
		this.setState({ ajouter: false });
	}

	getArticleList(projetOC) {
		let url = projetOC
			? process.env.REACT_APP_API_MARINAFRONT + "/admin/projets/list"
			: process.env.REACT_APP_API_MARINAFRONT + "/admin/articles/list";

		axios.get(url, { headers: { Authorization: localStorage.getItem("token") } }).then(
			(response) => {
				if (response.data.error) {
					console.log("tu as une erreur");
					return true;
				}
				let articles = response.data;
				this.setState({ articles });
			},
			(error) => {
				// si erreur 400
				if (error.response.status === 401 || error.response.status === 500) {
					window.location.href = "/fantasia";
				}
				console.log(error.response.status);
			}
		);
	}
	listOrAjout() {
		const { ajouter, articles, projetOC } = this.state;
		if (!ajouter) {
			return articles.map((object) => (
				<Row key={object.id}>
					<div className="margin itemListAdmin">
						<Col xs={12} sm={5} md={1} className="">
							<div className={`uneRea imgReaAdmin ${object.miniature}`} />
						</Col>
						<Col xs={12} sm={7} md={7} className="admin-margin">
							<div className="texte titreRea titreReaAdmin">{object.title} </div>
						</Col>
						<Col xs={12} sm={7} md={4} className="admin-margin">
							<button className="btn btn-rea btn-rea-suite" onClick={() => this.ajouter(object.id)}>
								Modifier
							</button>
							<Link to={"/fantasia/admin" + object.id + "#top"}>
								<button className="btn btn-rea btn-danger">Supprimer</button>
							</Link>
						</Col>
						<Col xs={12} sm={12} md={12}>
							<hr />
						</Col>
					</div>
				</Row>
			));
		} else if (projetOC && ajouter) {
			return <AdminProjetsForm projetAModifier={this.state.projetAModifier} />;
		} else if (!projetOC && ajouter) {
			return <AdminArticlesForm articlaAModifier={this.state.articlaAModifier} />;
		}
	}

	render() {
		let btnPosition = this.state.projetOC ? "" : <button className=" btn btn-rea admin-btnAjouter">position articles</button>;
		return (
			<Col xs={12} sm={12} md={12}>
				<div>
					<Row className="row-btnAjouter">
						<Col md={12} className="container-admin-btnAjouter">
							<div className="container-bordure">
								<button className=" btn btn-rea admin-btnAjouter" onClick={() => this.ajouter()}>
									Ajouter
								</button>
								<button className=" btn btn-rea admin-btnAjouter" onClick={() => this.liste()}>
									Liste
								</button>
								{btnPosition}
							</div>
						</Col>
					</Row>
				</div>
				{this.listOrAjout()}
			</Col>
		);
	}
}
export default AdminArticlesList;
