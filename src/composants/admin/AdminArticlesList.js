import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import "./Admin.css";
import { Link } from "react-router-dom";
import axios from "axios";
import AdminArticlesForm from "./AdminArticlesForm";
import AdminProjetsForm from "./AdminProjetsForm";

function AdminArticlesList(props) {
	const [articles, setArticles] = useState([]);
	const [ajouter, setAjouter] = useState(false);
	const [articlaAModifier, setArticleAModifier] = useState(null);
	const [projetAModifier, setProjetAModifier] = useState(null);
	const [projetOC] = useState(props.projetOC);
	const [reloadList, setReloadList] = useState(0);

	useEffect(() => {
		console.log("projetOC", projetOC);
		let url = projetOC
			? process.env.REACT_APP_API_MARINAFRONT + "/admin/projets/list"
			: process.env.REACT_APP_API_MARINAFRONT + "/admin/articles/list";

		axios.get(url, { headers: { Authorization: localStorage.getItem("token") } }).then(
			(response) => {
				if (response.data.error) {
					console.log("tu as une erreur");
					return true;
				}
				setArticles(response.data);
			},
			(error) => {
				// si erreur
				window.location.href = "/fantasia";
				/* if (error.response.status === 401 || error.response.status === 500) {
				} */
				console.log(error);
			}
		);
	}, [projetOC]);

	/**
	 *
	 * set la variable ajouter à true ce qui va ouvrir le formulaire
	 * set l'id de l'article à modifier soit avec l'id soit avec null si on a appuyé sur le bouton "ajouter nouvel article"
	 *
	 * @param {number} id id de l'article ou du projet ou rien
	 */
	async function AddArticle(id) {
		await callbackFunction();
		if (projetOC) {
			if (id) {
				setProjetAModifier(id);
			} else if (!id && projetAModifier) {
				setProjetAModifier(null);
			}
		} else {
			if (id) {
				setArticleAModifier(id);
			} else if (!id && articlaAModifier) {
				setArticleAModifier(null);
			}
		}
		setAjouter(true);
	}

	function hiddenArticle(event, article) {
		event.preventDefault();
		let url = projetOC
			? process.env.REACT_APP_API_MARINAFRONT + "/admin/projets/hide/" + article.id
			: process.env.REACT_APP_API_MARINAFRONT + "/admin/articles/hide/" + article.id;
		axios.put(url, { hidden: !article.hidden }, { headers: { Authorization: localStorage.getItem("token") } }).then(async (response) => {
			if (response.data.error) {
				console.log("tu as une erreur");
				return true;
			}
			//this.getArticleList(projetOC);
		});
	}

	function callbackFunction() {
		setArticleAModifier(null);
		setProjetAModifier(null);
		setAjouter(false);
		//this.getArticleList(this.state.projetOC);
	}

	function showFormAddArticle() {
		if (ajouter) {
			if (projetOC) {
				return <AdminProjetsForm parentCallback={callbackFunction} projetAModifier={projetAModifier} />;
			} else {
				return <AdminArticlesForm parentCallback={callbackFunction} articleId={articlaAModifier} />;
			}
		} else {
			return "";
		}
	}

	return (
		<Col xs={12} sm={12} md={12}>
			{articles.map((object) => (
				<Row key={object.id}>
					<div className="margin itemListAdmin">
						<Col xs={12} sm={5} md={1}>
							{projetOC ? (
								""
							) : (
								<img
									className="uneRea imgReaAdmin img-fluid"
									src={process.env.REACT_APP_API_MARINAFRONT + "/articles/" + object.id + "/miniature"}
									alt="miniature projet"
								/>
							)}
						</Col>
						<Col xs={12} sm={7} md={7} className="admin-margin">
							<div className="texte titreRea titreReaAdmin">
								{object.title} -- ORDRE : {object.order}
							</div>
						</Col>
						<Col xs={12} sm={7} md={4} className="admin-margin">
							<button className="btn btn-rea btn-rea-suite" onClick={() => AddArticle(object.id)}>
								Modifier
							</button>
							<Link to={"/fantasia/admin" + object.id + "#top"}>
								<button className="btn btn-rea btn-warning" type="button" onClick={(e) => hiddenArticle(e, object)}>
									{object.hidden ? "Publier" : "Masquer"}
								</button>
							</Link>
						</Col>
						<Col xs={12} sm={12} md={12}>
							<hr />
						</Col>
					</div>
				</Row>
			))}
			<Row className="row-btnAjouter">
				<Col md={12} className="container-admin-btnAjouter">
					<div className="container-bordure">
						<button className=" btn btn-rea admin-btnAjouter" onClick={() => AddArticle()}>
							Ajouter
						</button>
					</div>
				</Col>
			</Row>
			{showFormAddArticle()}
		</Col>
	);
}
export default AdminArticlesList;
