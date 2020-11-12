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
		this.setState({ projetOC: nextProps.projetOC });
		this.getArticleList(nextProps.projetOC);
	}

	componentDidMount() {
		const { projetOC } = this.state;
		this.getArticleList(projetOC);
	}

	async AddArticle(id) {
		const { projetOC, projetAModifier } = this.state;
		await this.callbackFunction();
		if (projetOC) {
			if (id) {
				this.setState({ projetAModifier: id });
				this.setState({ ajouter: true });
			} else if (!id && projetAModifier) {
				this.setState({ projetAModifier: null });
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
	/* 	liste() {
		this.setState({ ajouter: false });
	} */

	hiddenArticle(event, article) {
		event.preventDefault();
		const { projetOC } = this.state;
		//console.log("article", article);
		let url = projetOC
			? process.env.REACT_APP_API_MARINAFRONT + "/admin/projets/hide/" + article.id
			: process.env.REACT_APP_API_MARINAFRONT + "/admin/articles/hide/" + article.id;
		axios.put(url, { hidden: !article.hidden }, { headers: { Authorization: localStorage.getItem("token") } }).then(async (response) => {
			if (response.data.error) {
				console.log("tu as une erreur");
				return true;
			}
			this.getArticleList(projetOC);
		});
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
	callbackFunction = () => {
		this.setState({ articlaAModifier: null });
		this.setState({ projetAModifier: null });
		this.setState({ ajouter: false });
		this.getArticleList(this.state.projetOC);
	};

	showFormAddArticle() {
		const { ajouter, projetOC } = this.state;
		if (ajouter) {
			if (projetOC) {
				return <AdminProjetsForm parentCallback={this.callbackFunction} projetAModifier={this.state.projetAModifier} />;
			} else {
				return <AdminArticlesForm parentCallback={this.callbackFunction} articlaAModifier={this.state.articlaAModifier} />;
			}
		} else {
			return "";
		}
	}

	miniature(object) {
		const { projetOC } = this.state;
		return projetOC ? (
			""
		) : (
			<img
				className="uneRea imgReaAdmin img-fluid"
				src={process.env.REACT_APP_API_MARINAFRONT + "/articles/" + object.id + "/miniature"}
				alt="miniature projet"
			/>
		);
	}

	listArticles() {
		const { articles } = this.state;
		return articles.map((object) => (
			<Row key={object.id}>
				<div className="margin itemListAdmin">
					<Col xs={12} sm={5} md={1} className="">
						{this.miniature(object)}
					</Col>
					<Col xs={12} sm={7} md={7} className="admin-margin">
						<div className="texte titreRea titreReaAdmin">
							{object.title} -- ORDRE : {object.order}
						</div>
					</Col>
					<Col xs={12} sm={7} md={4} className="admin-margin">
						<button className="btn btn-rea btn-rea-suite" onClick={() => this.AddArticle(object.id)}>
							Modifier
						</button>
						<Link to={"/fantasia/admin" + object.id + "#top"}>
							<button className="btn btn-rea btn-warning" type="button" onClick={(e) => this.hiddenArticle(e, object)}>
								{object.hidden ? "Publier" : "Masquer"}
							</button>
						</Link>
					</Col>
					<Col xs={12} sm={12} md={12}>
						<hr />
					</Col>
				</div>
			</Row>
		));
	}

	render() {
		return (
			<Col xs={12} sm={12} md={12}>
				{this.listArticles()}
				<Row className="row-btnAjouter">
					<Col md={12} className="container-admin-btnAjouter">
						<div className="container-bordure">
							<button className=" btn btn-rea admin-btnAjouter" onClick={() => this.AddArticle()}>
								Ajouter
							</button>
						</div>
					</Col>
				</Row>
				{this.showFormAddArticle()}
			</Col>
		);
	}
}
export default AdminArticlesList;
