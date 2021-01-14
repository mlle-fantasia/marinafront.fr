import { Grid, Row, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import "./Admin.css";
import AdminArticlesForm from "./AdminArticlesForm";
import AdminProjetsForm from "./AdminProjetsForm";
import AdminPostsForm from "./AdminPostsForm";
import AdminUserForm from "./AdminUserForm";
import axios from "axios";
import { Link } from "react-router-dom";

function Admin() {
	const [onglet, setOnglet] = useState("articles");
	const [reload, setReload] = useState(0);
	const [articles, setArticles] = useState([]);
	const [showform, setShowform] = useState(false);
	const [articleAModifier, setArticleAModifier] = useState(null);

	useEffect(() => {
		axios
			.get(process.env.REACT_APP_API_MARINAFRONT + "/admin/" + onglet + "/list", { headers: { Authorization: localStorage.getItem("token") } })
			.then(
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
	}, [onglet, reload]);

	function hiddenArticle(event, article) {
		event.preventDefault();
		axios
			.put(
				process.env.REACT_APP_API_MARINAFRONT + "/admin/" + onglet + "/hide/" + article.id,
				{ hidden: !article.hidden },
				{ headers: { Authorization: localStorage.getItem("token") } }
			)
			.then(async (response) => {
				if (response.data.error) {
					console.log("tu as une erreur");
					return true;
				}
			});
		setReload(reload + 1);
	}

	/**
	 *
	 * set la variable ajouter à true ce qui va ouvrir le formulaire
	 * set l'id de l'article à modifier soit avec l'id soit avec null si on a appuyé sur le bouton "ajouter nouvel article"
	 *
	 * @param {number} id id de l'article ou du projet ou rien
	 */
	async function AddArticle() {
		setArticleAModifier(null);
		setShowform(true);
	}

	async function editArticle(id) {
		console.log("id", id);
		setArticleAModifier(id);
		//setShowform(false);
		setShowform(true);
	}

	function resetForm() {
		setArticleAModifier(null);
		setShowform(false);
	}

	return (
		<Grid>
			{/* {this.redirectToLogin()} */}
			<div className="admin">
				<Row className="">
					<Col md={12}>
						<Row className="navAdmin d-flex flex-row justify-content-around">
							<Col
								md={2}
								className={`"admin-sousTitre" ${onglet === "articles" ? "onglet-actif" : ""}`}
								onClick={() => setOnglet("articles")}
							>
								<p>Les articles</p>
							</Col>
							<Col
								md={2}
								className={`"admin-sousTitre" ${onglet === "projets" ? "onglet-actif" : ""}`}
								onClick={() => setOnglet("projets")}
							>
								<p>Les projets oc</p>
							</Col>
							<Col
								md={2}
								className={`"admin-sousTitre" ${onglet === "posts" ? "onglet-actif" : ""}`}
								onClick={() => setOnglet("posts")}
							>
								<p>Les Posts</p>
							</Col>
							<Col md={2} className={`"admin-sousTitre" ${onglet === "4" ? "onglet-actif" : ""}`} onClick={() => setOnglet("4")}>
								<p>Les certificats</p>
							</Col>
							<Col md={2} className={`"admin-sousTitre" ${onglet === "5" ? "onglet-actif" : ""}`} onClick={() => setOnglet("5")}>
								<p>Infos perso</p>
							</Col>
						</Row>
						{articles.map((object) => (
							<Row key={object.id}>
								<div className="margin itemListAdmin">
									<Col xs={12} sm={5} md={1}>
										{onglet === "articles" || onglet === "posts" ? (
											<img
												className="uneRea imgReaAdmin img-fluid"
												src={process.env.REACT_APP_API_MARINAFRONT + "/" + onglet + "/" + object.id + "/miniature"}
												alt="miniature projet"
											/>
										) : (
											""
										)}
									</Col>
									<Col xs={12} sm={7} md={7} className="admin-margin">
										<div className="texte titreRea titreReaAdmin">
											{object.title} -- ORDRE : {object.order}
										</div>
									</Col>
									<Col xs={12} sm={7} md={4} className="admin-margin">
										<button className="btn btn-rea btn-rea-suite" onClick={() => editArticle(object.id)}>
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
						{showform ? (
							<Row>
								{(() => {
									switch (onglet) {
										case "articles":
											return (
												<AdminArticlesForm
													id={articleAModifier}
													resetForm={resetForm}
													reloadList={() => setReload(reload + 1)}
												/>
											);
										case "projets":
											return (
												<AdminProjetsForm
													id={articleAModifier}
													resetForm={resetForm}
													reloadList={() => setReload(reload + 1)}
												/>
											);
										case "posts":
											return (
												<AdminPostsForm
													id={articleAModifier}
													resetForm={resetForm}
													reloadList={() => setReload(reload + 1)}
												/>
											);
										case "4":
											return "les certificats";
										case "5":
											return <AdminUserForm />;
									}
								})()}
							</Row>
						) : (
							""
						)}
					</Col>
				</Row>
			</div>
		</Grid>
	);
}
export default Admin;
