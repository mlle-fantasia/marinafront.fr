import { Grid, Row, Col } from "react-bootstrap";
import React, { useState, useEffect, useRef } from "react";
import "./Admin.css";
import axios from "axios";
import { HashLink as Link } from "react-router-hash-link";
import JoditEditor from "jodit-react";

function AdminProjetsForm(props) {
	const [projetId] = useState(props.id);
	const [projet, setProjet] = useState({});
	const [message, setMessage] = useState({ value: false, txt: "" });

	useEffect(() => {
		//mettre à jour le state avec les données de l'article à modifier si on veut modifier.
		if (props.id) {
			axios
				.get(process.env.REACT_APP_API_MARINAFRONT + "/projets/" + props.id, {
					headers: { Authorization: localStorage.getItem("token") },
				})
				.then((response) => {
					if (response.data.error) {
						console.log("tu as une erreur");
						return true;
					}
					setProjet(response.data);
				});
			//console.log("article", article);
		}
	}, [props.id]);

	function handleCancel() {
		props.resetForm();
	}
	function deleteProjet() {
		if (props.id) {
			axios
				.delete(process.env.REACT_APP_API_MARINAFRONT + "/admin/projets/" + props.id, {
					headers: { Authorization: localStorage.getItem("token") },
				})
				.then((response) => {
					if (response.data.error) {
						console.log("tu as une erreur");
						return true;
					}

					props.resetForm();
					props.reloadList();
				});
		}
	}

	function handleChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		setProjet({ ...projet, [name]: value });
	}

	function handleChangeJodit(data) {
		setProjet({ ...projet, contenu: data });
	}

	function handleSubmit(event) {
		event.preventDefault();

		let newMessage = "";
		if (props.id) {
			newMessage = "l'article à bien été modifié";
			axios
				.put(process.env.REACT_APP_API_MARINAFRONT + "/admin/projets/modifier/" + props.id, projet, {
					headers: { Authorization: localStorage.getItem("token") },
				})
				.then(async (response) => {
					if (response.data.error) {
						console.log("tu as une erreur");
						return true;
					}
					setMessage({ value: true, txt: newMessage });
					props.resetForm();
					props.reloadList();
				});
		} else {
			newMessage = "l'article à bien été ajouté";
			axios
				.post(process.env.REACT_APP_API_MARINAFRONT + "/admin/projets/add", projet, {
					headers: { Authorization: localStorage.getItem("token") },
				})
				.then((response) => {
					if (response.data.error) {
						console.log("tu as une erreur");
						return true;
					}
					setMessage({ value: true, txt: newMessage });
					props.resetForm();
					props.reloadList();
				});
		}
	}
	/**
	 * @property Jodit jodit instance of native Jodit
	 */
	const config = { readonly: false };
	const editor = useRef(null);
	// jodit;
	// setRef = (jodit) => (this.jodit = jodit);

	const textForBtnAdd = props.id ? "Modifier" : "Ajouter";
	const notificationMessage = message.value ? (
		<Col md={12}>
			<p className="AlertOK">{message.txt}</p>
		</Col>
	) : (
		<div></div>
	);

	return (
		<Grid className=" ">
			<Row>{notificationMessage}</Row>
			<form className="formAdmin" onSubmit={handleSubmit}>
				<Row className="">
					<Col md={6}>
						<label htmlFor="titre">Titre</label>
						<input id="title" name="title" value={projet.title} onChange={handleChange} className="form-control" />
					</Col>
					<Col md={6}>
						<label htmlFor="order">Ordre</label>
						<input type="number" id="order" name="order" value={projet.order} onChange={handleChange} className="form-control" />
					</Col>
				</Row>
				<Row className="">
					<Col md={6}>
						<label htmlFor="langage">Langages (ne pas mettre les parenthèses)</label>
						<input type="text" id="langage" name="langage" value={projet.langage} onChange={handleChange} className="form-control" />
					</Col>
					<Col md={6}>
						<label htmlFor="site">Site</label>
						<input type="text" id="site" name="site" value={projet.site} onChange={handleChange} className="form-control" />
					</Col>
				</Row>
				<Row className="">
					<Col md={12}>
						<label htmlFor="contenu">Contenu</label>
						<JoditEditor
							value={projet.contenu}
							ref={editor}
							config={config}
							tabIndex={1}
							onBlur={(jodit) => {
								const data = jodit.target.innerHTML;
								handleChangeJodit(data);
							}}
						/>
					</Col>
				</Row>
				<Row className="">
					<Col md={7}>
						<button className="btn btn-rea btn-danger" onClick={() => deleteProjet()}>
							Supprimer
						</button>
					</Col>
					<Col md={5}>
						<button className="btn btn-rea btn-secondary" onClick={handleCancel}>
							Annuler
						</button>
						<button className="btn btn-rea">{textForBtnAdd}</button>
						<Link to={"/realisations/" + props.id + "#top"}>
							<button className="btn btn-rea">Afficher</button>
						</Link>
					</Col>
				</Row>
			</form>
		</Grid>
	);
}
export default AdminProjetsForm;
