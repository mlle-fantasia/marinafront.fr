import { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import React from "react";
import "./Admin.css";
import axios from "axios";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { HashLink as Link } from "react-router-hash-link";

class AdminProjetsForm extends Component {
	constructor(props) {
		super(props);
		this.showDataProjet();
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
	}

	state = {
		projetAModifier: this.props.projetAModifier,
		title: "",
		site: "",
		langage: "",
		contenu: "",
		order: 0,
		message: false,
		messageText: "",
	};
	handleCancel() {
		this.props.parentCallback();
	}
	deleteProjet() {
		if (this.state.projetAModifier) {
			axios
				.delete(process.env.REACT_APP_API_MARINAFRONT + "/admin/projets/" + this.state.projetAModifier, {
					headers: { Authorization: localStorage.getItem("token") },
				})
				.then((response) => {
					if (response.data.error) {
						console.log("tu as une erreur");
						return true;
					}
					this.setState({ redirection: true });
					this.props.parentCallback();
				});
		}
	}

	showDataProjet() {
		//mettre à jour le state avec les données de l'article à modifier si on veut modifier.
		if (this.state.projetAModifier) {
			axios
				.get(process.env.REACT_APP_API_MARINAFRONT + "/projets/" + this.state.projetAModifier, {
					headers: { Authorization: localStorage.getItem("token") },
				})
				.then((response) => {
					if (response.data.error) {
						console.log("tu as une erreur");
						return true;
					}
					const { title, site, langage, contenu, order } = response.data;
					this.setState({
						title: title,
						site: site ? site : "",
						langage: langage,
						contenu: contenu,
						order: order,
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
		const { title, site, langage, contenu, order } = this.state;
		let newMessage = "";
		if (this.state.projetAModifier) {
			newMessage = "l'article à bien été modifié";
			axios
				.put(
					process.env.REACT_APP_API_MARINAFRONT + "/admin/projets/modifier/" + this.state.projetAModifier,
					{
						title: title,
						site: site,
						langage: langage,
						contenu: contenu,
						order: order,
					},
					{ headers: { Authorization: localStorage.getItem("token") } }
				)
				.then((response) => {
					if (response.data.error) {
						console.log("tu as une erreur");
						return true;
					}
					this.setState({ message: true, messageText: newMessage });
					this.props.parentCallback();
				});
		} else {
			newMessage = "l'article à bien été ajouté";
			axios
				.post(
					process.env.REACT_APP_API_MARINAFRONT + "/admin/projets/add",
					{
						title: title,
						site: site,
						langage: langage,
						contenu: contenu,
						order: order,
					},
					{ headers: { Authorization: localStorage.getItem("token") } }
				)
				.then((response) => {
					if (response.data.error) {
						console.log("tu as une erreur");
						return true;
					}
					this.setState({ message: true, messageText: newMessage });
					this.props.parentCallback();
				});
		}
	}

	render() {
		const textForBtnAdd = this.state.projetAModifier ? "Modifier" : "Ajouter";

		const notificationMessage = this.state.message ? (
			<Col md={12}>
				<p className="AlertOK">{this.state.messageText}</p>
			</Col>
		) : (
			<div></div>
		);

		return (
			<Grid className=" ">
				<Row>{notificationMessage}</Row>
				<form className="formAdmin">
					<Row className="">
						<Col md={6}>
							<label htmlFor="titre">Titre</label>
							<input id="title" name="title" value={this.state.title} onChange={this.handleChange} className="form-control" />
						</Col>
						<Col md={6}>
							<label htmlFor="order">Ordre</label>
							<input
								type="number"
								id="order"
								name="order"
								value={this.state.order}
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
						<Col md={7}>
							<button className="btn btn-rea btn-danger" onClick={() => this.deleteProjet()}>
								Supprimer
							</button>
						</Col>
						<Col md={5}>
							<button className="btn btn-rea btn-secondary" onClick={this.handleCancel}>
								Annuler
							</button>
							<button className="btn btn-rea" onClick={this.handleSubmit}>
								{textForBtnAdd}
							</button>
							<Link to={"/realisations/" + this.state.projetAModifier + "#top"}>
								<button className="btn btn-rea">Afficher</button>
							</Link>
						</Col>
					</Row>
				</form>
			</Grid>
		);
	}
}
export default AdminProjetsForm;
