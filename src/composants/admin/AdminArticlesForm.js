import { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import React from "react";
import "./Admin.css";
import axios from "axios";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { HashLink as Link } from "react-router-hash-link";

class AdminArticlesForm extends Component {
	constructor(props) {
		super(props);
		this.showDataArticle();
		this.handleChangeLien = this.handleChangeLien.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	state = {
		articlaAModifier: this.props.articlaAModifier,
		title: "",
		miniature: "",
		site: "",
		langage: "",
		resume: "",
		contenu: "",
		liens: [],
		message: false,
		messageText: "",
	};

	showDataArticle() {
		//mettre à jour le state avec les données de l'article à modifier si on veut modifier.
		if (this.state.articlaAModifier) {
			axios
				.get(process.env.REACT_APP_API_MARINAFRONT + "/articles/" + this.state.articlaAModifier, {
					headers: { Authorization: localStorage.getItem("token") },
				})
				.then((response) => {
					if (response.data.error) {
						console.log("tu as une erreur");
						return true;
					}
					const { title, miniature, site, langage, resume, contenu, liens } = response.data.article;
					this.setState({
						title: title,
						miniature: miniature,
						site: site ? site : "",
						langage: langage,
						resume: resume,
						contenu: contenu,
						liens: liens,
					});
				});
		}
	}
	handleChangeLien(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		const index = parseInt(target.id.split("_")[1]);
		this.state.liens[index][name] = value;
		this.setState({
			liens: [...this.state.liens],
		});
	}
	handleChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		this.setState({
			[name]: value,
		});
	}
	handleChangeCKEditor(data) {
		this.setState({
			contenu: data,
		});
	}

	handleSubmit() {
		const { title, miniature, site, langage, resume, contenu, liens } = this.state;
		let newMessage = "";
		console.log("this.state.articlaAModifier", this.state.articlaAModifier);
		if (this.state.articlaAModifier) {
			newMessage = "l'article à bien été modifié";
			console.log({ title: title, miniature: miniature, site: site, langage: langage, resume: resume, contenu: contenu });
			axios
				.put(
					process.env.REACT_APP_API_MARINAFRONT + "/admin/articles/modifier/" + this.state.articlaAModifier,
					{
						title: title,
						miniature: miniature,
						site: site,
						langage: langage,
						resume: resume,
						contenu: contenu,
						liens: liens,
					},
					{ headers: { Authorization: localStorage.getItem("token") } }
				)
				.then((response) => {
					if (response.data.error) {
						console.log("tu as une erreur");
						return true;
					}
					this.setState({ message: true, messageText: newMessage });
				});
		} else {
			/* newMessage = "l'article à bien été ajouté";
			axios
				.post(
					process.env.REACT_APP_API_MARINAFRONT + "/admin/articles/add",
					{
						title: title,
						miniature: miniature,
						site: site,
						langage: langage,
						resume: resume,
						contenu: contenu,
						liens:liens
					},
					{ headers: { Authorization: localStorage.getItem("token") } }
				)
				.then((response) => {
					if (response.data.error) {
						console.log("tu as une erreur");
						return true;
					}
					this.setState({ message: true, messageText: newMessage });
				}); */
		}
	}

	render() {
		const textForBtnAdd = this.state.articlaAModifier ? "Modifier" : "Ajouter";

		const notificationMessage = this.state.message ? (
			<Col md={12}>
				<p className="AlertOK">{this.state.messageText}</p>
			</Col>
		) : (
			<div></div>
		);

		const boucleLink = this.state.liens ? (
			this.state.liens.map((lien, i) => (
				<Row className="" key={i}>
					<Col md={6}>
						<label htmlFor="lien">Liens</label>
						<input type="text" id={"lien_" + i} name="lien" value={lien.url} onChange={this.handleChangeLien} className="form-control" />
					</Col>
					<Col md={6}>
						<label htmlFor="lien">Nom du lien</label>
						<input
							type="text"
							id={"nomlien_" + i}
							name="nom"
							value={lien.nom}
							onChange={this.handleChangeLien}
							className="form-control"
						/>
					</Col>
				</Row>
			))
		) : (
			<Row className="">
				<Col md={6}>
					<label htmlFor="lien">Liens</label>
					<input type="text" id="newlien" name="lien" value="https://..." onChange={this.handleChange} className="form-control" />
				</Col>
				<Col md={6}>
					<label htmlFor="lien">Nom du lien</label>
					<input type="text" id="newnomlien" name="nomlien" value="" onChange={this.handleChange} className="form-control" />
				</Col>
			</Row>
		);

		return (
			<Grid className=" ">
				<form className="formAdmin">
					<Row className="">
						<Col md={6}>
							<label htmlFor="titre">Titre</label>
							<input id="title" name="title" value={this.state.title} onChange={this.handleChange} className="form-control" />
						</Col>
						<Col md={6}>
							<label htmlFor="miniature">Miniature</label>
							<input
								type="text"
								id="miniature"
								name="miniature"
								value={this.state.miniature}
								onChange={this.handleChange}
								className="form-control"
							/>
						</Col>
					</Row>
					<Row className="">
						<Col md={6}>
							<label htmlFor="langage">Langages (ne pas mettre les parenthèses)</label>
							<input
								type="text"
								id="langage"
								name="langage"
								value={this.state.langage}
								onChange={this.handleChange}
								className="form-control"
							/>
						</Col>
						<Col md={6}>
							<label htmlFor="site">Site</label>
							<input type="text" id="site" name="site" value={this.state.site} onChange={this.handleChange} className="form-control" />
						</Col>
					</Row>
					<Row>
						<Col md={2}>
							<h3>Les liens</h3>
						</Col>
						<Col md={1}>
							<button className="btn "> Ajouter </button>
						</Col>
					</Row>
					{boucleLink}
					<Row className="">
						<Col md={12}>
							<label htmlFor="resume">Résumé</label>
							<textarea
								name="resume"
								id="resume"
								rows="5"
								value={this.state.resume}
								onChange={this.handleChange}
								className="form-control"
							/>
						</Col>
					</Row>
					<Row className="">
						<Col md={12}>
							<label htmlFor="contenu">Contenu</label>
							<CKEditor
								editor={ClassicEditor}
								data={this.state.contenu}
								onInit={(editor) => {
									// You can store the "editor" and use when it is needed.
									console.log("Editor is ready to use!", editor);
								}}
								onChange={(event, editor) => {
									const data = editor.getData();
									this.handleChangeCKEditor(data);
								}}
							/>
						</Col>
					</Row>
					<Row className="">
						<Col md={12}>
							<button className="btn btn-rea" onClick={this.handleSubmit}>
								{textForBtnAdd}
							</button>
							<Link to={"/realisations/" + this.state.articlaAModifier + "#top"}>
								<button className="btn btn-rea">Afficher</button>
							</Link>
						</Col>
					</Row>
					<Row>{notificationMessage}</Row>
				</form>
			</Grid>
		);
	}
}
export default AdminArticlesForm;
