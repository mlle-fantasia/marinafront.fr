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
		contenu: "texte",
		message: false,
		messageText: "",
	};

	showDataArticle() {
		//mettre à jour le state avec les données de l'article à modifier si on veut modifier.
		if (this.state.articlaAModifier) {
			axios.get(process.env.REACT_APP_API_MARINAFRONT + "/articles/" + this.state.articlaAModifier, {}).then((response) => {
				if (response.data.error) {
					console.log("tu as une erreur");
					return true;
				}
				const { title, miniature, site, langage, resume, contenu } = response.data;
				this.setState({
					title: title,
					miniature: miniature,
					site: site ? site : "",
					langage: langage,
					resume: resume,
					contenu: contenu,
				});
			});
		}
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
		const { title, miniature, site, langage, resume, contenu } = this.state;
		let url = "";
		let newMessage = "";
		this.state.articlaAModifier
			? (url = process.env.REACT_APP_API_MARINAFRONT + "/admin/articles/modifier/" + this.state.articlaAModifier)
			: (url = process.env.REACT_APP_API_MARINAFRONT + "/admin/articles/add");
		this.state.articlaAModifier ? (newMessage = "l'article à bien été modifié") : (newMessage = "l'article à bien été ajouté");
		axios
			.post(url, {
				title: title,
				miniature: miniature,
				site: site,
				langage: langage,
				resume: resume,
				contenu: contenu,
			})
			.then((response) => {
				if (response.data.error) {
					console.log("tu as une erreur");
					return true;
				}
				this.setState({ message: true, messageText: newMessage });
			});
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
					<Row className="">
						<Col md={6}>
							<label htmlFor="lien">Liens</label>
							<input
								type="text"
								id="lien"
								name="lien"
								value="ce champs ne fonctionne pas encore, remplir les liens direct dans la base"
								onChange={this.handleChange}
								className="form-control"
							/>
						</Col>
					</Row>
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
