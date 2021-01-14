import { Grid, Row, Col } from "react-bootstrap";
import React, { useState, useEffect, useRef } from "react";
import "./Admin.css";
import axios from "axios";
import { HashLink as Link } from "react-router-hash-link";
import JoditEditor from "jodit-react";

function AdminProjetsForm(props) {
	const [postId] = useState(props.id);
	const [post, setPost] = useState({});
	const [fileSelected, setfileSelected] = useState({ image: null, binary: null });
	const [fileSelected2, setfileSelected2] = useState({ image: null, binary: null });
	const [message, setMessage] = useState({ value: false, txt: "" });

	useEffect(() => {
		//console.log("postId", postId);
		if (props.id) {
			axios
				.get(process.env.REACT_APP_API_MARINAFRONT + "/posts/" + props.id, {
					headers: { Authorization: localStorage.getItem("token") },
				})
				.then((response) => {
					if (response.data.error) {
						console.log("tu as une erreur");
						return true;
					}
					console.log("response.data", response.data);
					setPost(response.data);
				});
		}
	}, [props.id]);

	function deletePost(event) {
		event.preventDefault();
		if (post.id) {
			axios
				.delete(process.env.REACT_APP_API_MARINAFRONT + "/admin/posts/" + post.id, {
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
	//lorsqu'on selectionne un fichier 2
	function handleChangeFile2(event) {
		event.preventDefault();
		let file = { image: null, binary: null };
		file.image = this.fileInput2.current.files[0];
		var reader = new FileReader();
		reader.onload = (function (theFile) {
			return function (e) {
				file.binary = e.target.result;
			};
		})(this.fileInput2.current.files[0]);
		reader.readAsDataURL(this.fileInput2.current.files[0]);

		setfileSelected2(file);
	}
	//losque qu'on change les champs du formulaire
	function handleChange(event) {
		const target = event.target;
		const value = target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;
		setPost({ ...post, [name]: value });
	}
	function handleChangeJodit(data) {
		setPost({ ...post, contenu: data });
	}

	function handleSubmit(event) {
		event.preventDefault();
		if (post.id) {
			axios
				.put(process.env.REACT_APP_API_MARINAFRONT + "/admin/posts/edit/" + post.id, post, {
					headers: { Authorization: localStorage.getItem("token") },
				})
				.then(async (response) => {
					if (response.data.error) {
						console.log("tu as une erreur");
						return true;
					}
					if (fileSelected.image) {
						await saveImage(response.data.id, fileSelected.image, 1);
					}
					if (fileSelected2 && fileSelected2.image) {
						await saveImage(response.data.id, fileSelected2.image, 2);
					}
					setMessage({ value: true, txt: "Le post à bien été modifié" });
					props.resetForm();
					props.reloadList();
				});
		} else {
			axios
				.post(process.env.REACT_APP_API_MARINAFRONT + "/admin/posts/add/", post, {
					headers: { Authorization: localStorage.getItem("token") },
				})
				.then(async (response) => {
					if (response.data.error) {
						console.log("tu as une erreur");
						return true;
					}
					if (fileSelected.image) {
						await saveImage(response.data.id, fileSelected.image, 1);
					}

					if (fileSelected2.image) {
						await saveImage(response.data.id, fileSelected2.image, 2);
					}
					setMessage({ value: true, txt: "Le post à bien été ajouté" });
					props.resetForm();
					props.reloadList();
				});
		}
	}
	async function saveImage(id, file, numero) {
		console.log("file", file);
		let formData = new FormData();
		formData.append("image", file, file.name);
		console.log("formData", formData);
		let url =
			numero === 2
				? process.env.REACT_APP_API_MARINAFRONT + "/admin/posts/" + id + "/image2"
				: process.env.REACT_APP_API_MARINAFRONT + "/admin/posts/" + id + "/image";
		axios.post(url, formData, {
			headers: {
				Authorization: localStorage.getItem("token"),
				"Content-Type": "multipart/form-data",
			},
		});
	}

	// jodit
	const config = { readonly: false };
	const editor = useRef(null);
	// ref input file
	const fileInput = React.createRef();
	const fileInput2 = React.createRef();

	return (
		<Grid className=" ">
			<Row>
				{message.value ? (
					<Col md={12}>
						<p className="AlertOK">{message.txt}</p>
					</Col>
				) : (
					<div></div>
				)}
			</Row>
			<Row>
				<Col>
					<form className="formAdmin" onSubmit={handleSubmit}>
						<Row className="">
							<Col md={6}>
								<label htmlFor="titre">Titre</label>
								<input id="title" name="title" value={post.title} onChange={handleChange} className="form-control" />
							</Col>
						</Row>
						<Row className="">
							<Col md={6}>
								<label htmlFor="image">Image</label>
								<input type="file" id="image" name="image" onChange={handleChangeFile} className="form-control" ref={fileInput} />
							</Col>
							<Col md={6}>
								<label htmlFor="image2">Image pour la page du post (1200x500)</label>
								<input type="file" id="image2" name="image2" onChange={handleChangeFile2} className="form-control" ref={fileInput2} />
							</Col>
						</Row>
						<Row className="">
							<Col md={6}>
								<label htmlFor="date">Date</label>
								<input type="date" id="date" name="date" value={post.date} onChange={handleChange} className="form-control" />
							</Col>
							<Col md={6}>
								<label htmlFor="order">Ordre</label>
								<input type="number" id="order" name="order" value={post.order} onChange={handleChange} className="form-control" />
							</Col>
						</Row>
						<Row className="">
							<Col md={12}>
								<label htmlFor="resume">Résumé</label>
								<textarea name="resume" id="resume" rows="5" value={post.resume} onChange={handleChange} className="form-control" />
							</Col>
						</Row>

						<Row className="">
							<Col md={12}>
								<label htmlFor="contenu">Contenu</label>
								<JoditEditor
									value={post.contenu}
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
							<Col md={6}>
								<input type="checkbox" id="hidden" name="hidden" checked={post.hidden} onChange={handleChange} />
								<label htmlFor="hidden">Invisible</label>
							</Col>
						</Row>

						<Row className="">
							<Col md={6}>
								<button className="btn btn-rea btn-danger" onClick={(e) => deletePost(e)}>
									Supprimer
								</button>
							</Col>
							<Col md={6}>
								<button className="btn btn-rea">{post.id ? "Modifier" : "Ajouter"}</button>
								<Link to={"/posts/" + post.id + "#top"}>
									<button className="btn btn-rea">Afficher</button>
								</Link>
							</Col>
						</Row>
					</form>
				</Col>
			</Row>
		</Grid>
	);
}

export default AdminProjetsForm;
