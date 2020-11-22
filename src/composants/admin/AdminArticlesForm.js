import { Grid, Row, Col } from "react-bootstrap";
import React, { useState, useEffect, useRef } from "react";
import "./Admin.css";
import axios from "axios";
import { HashLink as Link } from "react-router-hash-link";

import JoditEditor from "jodit-react";

function AdminArticlesForm(props) {
	/* constructor(props) {
		super(props);
		this.showDataArticle();
		this.handleChangeLien = this.handleChangeLien.bind(this);
		this.handleChangeFile = this.handleChangeFile.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.handleChangeJodit = this.handleChangeJodit.bind(this);
		this.addlink = this.addlink.bind(this);
		this.fileInput = React.createRef();
	} */

	const [articleId] = useState(props.articleId);
	const [liens, setliens] = useState([]);
	const [article, setArticle] = useState({});
	const [message, setMessage] = useState({ value: false, txt: "" });
	const [fileSelected, setfileSelected] = useState({ image: null, binary: null });

	useEffect(() => {
		//mettre à jour le state avec les données de l'article à modifier si on veut modifier.
		//console.log("articleId", articleId);
		if (articleId) {
			axios
				.get(process.env.REACT_APP_API_MARINAFRONT + "/articles/" + articleId, {
					headers: { Authorization: localStorage.getItem("token") },
				})
				.then((response) => {
					if (response.data.error) {
						console.log("tu as une erreur");
						return true;
					}
					setArticle(response.data.article);
					setliens(response.data.article.liens);
				});
		}
	}, []);

	// lorsqu'on change un lien
	function handleChangeLien(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		const index = parseInt(target.id.split("_")[1]);
		let newArr = [...liens];
		newArr[index][name] = value;
		setliens(newArr);
	}
	function addlink() {
		// copying the old datas array
		let newArr = [...liens];
		newArr.push({
			url: "url",
			nom: "nom",
		});
		setliens(newArr);
	}
	//lorsqu'on selectionne un fichier
	function handleChangeFile(event) {
		event.preventDefault();

		let file = { image: null, binary: null };
		file.image = this.fileInput.current.files[0];
		var reader = new FileReader();
		reader.onload = (function (theFile) {
			return function (e) {
				file.binary = e.target.result;
			};
		})(this.fileInput.current.files[0]);
		reader.readAsDataURL(this.fileInput.current.files[0]);
		setfileSelected(file);
	}

	function handleChange(event) {
		const target = event.target;
		const value = target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;
		setArticle({ ...article, [name]: value });
	}
	function handleChangeJodit(data) {
		setArticle({ ...article, contenu: data });
	}
	function handleCancel() {
		props.parentCallback();
	}
	function DeleteArticle() {
		if (articleId) {
			axios
				.delete(process.env.REACT_APP_API_MARINAFRONT + "/admin/articles/" + articleId, {
					headers: { Authorization: localStorage.getItem("token") },
				})
				.then((response) => {
					if (response.data.error) {
						console.log("tu as une erreur");
						return true;
					}
					props.parentCallback();
				});
		}
	}
	function handleSubmit(event) {
		event.preventDefault();

		let newMessage = "";
		let lesLiens = liens.filter((lien) => {
			return lien.url !== "url" || lien.url !== "" || lien.non !== "nom" || lien.non !== "";
		});
		article.liens = lesLiens;
		if (articleId) {
			newMessage = "l'article à bien été modifié";
			console.log("article", article);
			axios
				.put(process.env.REACT_APP_API_MARINAFRONT + "/admin/articles/modifier/" + articleId, article, {
					headers: { Authorization: localStorage.getItem("token") },
				})
				.then(async (response) => {
					if (response.data.error) {
						console.log("tu as une erreur");
						return true;
					}
					if (fileSelected.image) {
						//console.log("fileSelected.image", fileSelected.image);
						await saveImage(response.data.id);
					}
					setMessage({ value: true, txt: newMessage });
					props.parentCallback();
				});
		} else {
			newMessage = "l'article à bien été ajouté";
			axios
				.post(process.env.REACT_APP_API_MARINAFRONT + "/admin/articles/add", article, {
					headers: { Authorization: localStorage.getItem("token") },
				})
				.then(async (response) => {
					if (response.data.error) {
						console.log("tu as une erreur");
						return true;
					}
					if (fileSelected.image) {
						await saveImage(response.data.id);
					}
					setMessage({ value: true, txt: newMessage });
					props.parentCallback();
				});
		}
	}
	function saveImage(id) {
		let formData = new FormData();
		formData.append("image", fileSelected.image, fileSelected.image.name);
		axios.post(process.env.REACT_APP_API_MARINAFRONT + "/admin/articles/" + articleId + "/image", formData, {
			headers: {
				Authorization: localStorage.getItem("token"),
				"Content-Type": "multipart/form-data",
			},
		});
	}
	/**
	 * @property Jodit jodit instance of native Jodit
	 */
	/* 	const jodit ;
	setRef = (jodit) => (this.jodit = jodit); */
	const config = { readonly: false };
	const editor = useRef(null);

	const textForBtnAdd = articleId ? "Modifier" : "Ajouter";
	const fileInput = React.createRef();
	const notificationMessage = message.value ? (
		<Col md={12}>
			<p className="AlertOK">{message.txt}</p>
		</Col>
	) : (
		<div></div>
	);

	const boucleLink = liens
		? liens.map((lien, i) => (
				<Row className="" key={i}>
					<Col md={6}>
						<label htmlFor="lien">Liens</label>
						<input type="text" id={"lien_" + i} name="url" value={lien.url} onChange={handleChangeLien} className="form-control" />
					</Col>
					<Col md={6}>
						<label htmlFor="lien">Nom du lien</label>
						<input type="text" id={"nomlien_" + i} name="nom" value={lien.nom} onChange={handleChangeLien} className="form-control" />
					</Col>
				</Row>
		  ))
		: "";

	return (
		<Grid className=" ">
			<form className="formAdmin" onSubmit={handleSubmit}>
				<Row className="">
					<Col md={6}>
						<label htmlFor="titre">Titre</label>
						<input id="title" name="title" value={article.title} onChange={handleChange} className="form-control" />
					</Col>
					<Col md={6}>
						<label htmlFor="miniature">Miniature</label>
						<input
							type="file"
							id="miniature"
							name="miniature"
							//value={this.state.miniature}
							onChange={handleChangeFile}
							className="form-control"
							ref={fileInput}
						/>
					</Col>
				</Row>
				<Row className="">
					<Col md={6}>
						<label htmlFor="langage">Langages (ne pas mettre les parenthèses)</label>
						<input type="text" id="langage" name="langage" value={article.langage} onChange={handleChange} className="form-control" />
					</Col>
					<Col md={6}>
						<label htmlFor="site">Site</label>
						<input type="text" id="site" name="site" value={article.site} onChange={handleChange} className="form-control" />
					</Col>
				</Row>
				<Row className="d-flex flex-row align-items-end">
					<Col md={2}>
						<h3>Les liens</h3>
					</Col>
					<Col md={1}>
						<button className="btn btn-ajouter-link" type="button" onClick={addlink}>
							{" "}
							Ajouter{" "}
						</button>
					</Col>
				</Row>
				{boucleLink}
				<Row>
					<Col md={6}>
						<label>
							<input name="oc" type="checkbox" checked={article.oc} onChange={handleChange} />
							Article projet OC :
						</label>
					</Col>
					<Col md={6}>
						<label htmlFor="order">Ordre</label>
						<input type="number" id="order" name="order" value={article.order} onChange={handleChange} className="form-control" />
					</Col>
				</Row>
				<Row className="">
					<Col md={12}>
						<label htmlFor="resume">Résumé</label>
						<textarea name="resume" id="resume" rows="5" value={article.resume} onChange={handleChange} className="form-control" />
					</Col>
				</Row>
				<Row className="">
					<Col md={12}>
						<label htmlFor="contenu">Contenu</label>
						<div>
							Technique : copier coller le html dans source, revenir dans editeur normal, cliquer ailleur dans la page, puis
							enregistrer. <br /> pour les images la mettre en html et l'ajouter dans public/images/...{" "}
						</div>
						<JoditEditor
							value={article.contenu}
							ref={editor}
							config={config}
							tabIndex={1}
							onBlur={(jodit) => {
								console.log("editor", jodit);
								const data = jodit.target.innerHTML;
								handleChangeJodit(data);
							}}
						/>
					</Col>
				</Row>
				<Row className="">
					<Col md={6}>
						<button className="btn btn-rea btn-danger" onClick={() => DeleteArticle()}>
							Supprimer
						</button>
					</Col>
					<Col md={6}>
						<button className="btn btn-rea" onClick={handleCancel}>
							Annuler
						</button>
						<button className="btn btn-rea">{textForBtnAdd}</button>
						<Link to={"/realisations/" + articleId + "#top"}>
							<button className="btn btn-rea">Afficher</button>
						</Link>
					</Col>
				</Row>
				<Row>{notificationMessage}</Row>
			</form>
		</Grid>
	);
}
export default AdminArticlesForm;
