import { Grid, Row, Col } from "react-bootstrap";
import React, { useState, useEffect, useRef } from "react";
import "./Admin.css";
import axios from "axios";
import { HashLink as Link } from "react-router-hash-link";
import JoditEditor from "jodit-react";

function AdminProjetsForm(props) {
	const [posts, setPosts] = useState([]);
	const [post, setPost] = useState({});
	const [ajouter, setAjouter] = useState(false);
	const [fileSelected, setfileSelected] = useState({ image: null, binary: null });
	const [fileSelected2, setfileSelected2] = useState({ image: null, binary: null });
	const [message, setMessage] = useState({ value: false, txt: "" });
	const [reloadPosts, setReloadPosts] = useState(0);

	useEffect(() => {
		axios.get(process.env.REACT_APP_API_MARINAFRONT + "/admin/posts/list", { headers: { Authorization: localStorage.getItem("token") } }).then(
			(response) => {
				if (response.data.error) {
					console.log("tu as une erreur");
					return true;
				}
				let posts = response.data;
				setPosts(posts);
			},
			(error) => {
				// si erreur 400
				if (error.response.status === 401 || error.response.status === 500) {
					window.location.href = "/fantasia";
				}
				console.log(error.response.status);
			}
		);
	}, [reloadPosts]);

	function resetDataPost() {
		setAjouter(false);
		setPost({});
		setfileSelected({ image: null, binary: null });
		setfileSelected2({ image: null, binary: null });
	}

	function showDataPost(post) {
		setPost(post);
		setAjouter(true);
	}
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
					resetDataPost();
					setReloadPosts(reloadPosts + 1);
				});
		}
	}
	function AddPost() {
		resetDataPost();
		setAjouter(true);
	}

	//lorsqu'on selectionne un fichier
	function handleChangeFile(event) {
		event.preventDefault();
		let file = { image: null, binary: null };
		file.image = fileInput.current.files[0];
		var reader = new FileReader();
		reader.onload = (function (theFile) {
			return function (e) {
				file.binary = e.target.result;
			};
		})(fileInput.current.files[0]);
		reader.readAsDataURL(fileInput.current.files[0]);

		setfileSelected(file);
	}
	//lorsqu'on selectionne un fichier 2
	function handleChangeFile2(event) {
		event.preventDefault();
		let file = { image: null, binary: null };
		file.image = fileInput2.current.files[0];
		var reader = new FileReader();
		reader.onload = (function (theFile) {
			return function (e) {
				file.binary = e.target.result;
			};
		})(fileInput2.current.files[0]);
		reader.readAsDataURL(fileInput2.current.files[0]);

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
					resetDataPost();
					setReloadPosts(reloadPosts + 1);
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
					resetDataPost();
					setReloadPosts(reloadPosts + 1);
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

	function hiddenArticle(event, item) {
		event.preventDefault();
		axios
			.put(
				process.env.REACT_APP_API_MARINAFRONT + "/admin/posts/hidden/" + item.id,
				{ hidden: !item.hidden },
				{ headers: { Authorization: localStorage.getItem("token") } }
			)
			.then(async (response) => {
				if (response.data.error) {
					console.log("tu as une erreur");
					return true;
				}
				setReloadPosts(reloadPosts + 1);
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
				{posts.map((object) => (
					<Row key={object.id}>
						<div className="margin itemListAdmin">
							<Col xs={12} sm={5} md={1} className="">
								<img
									className="uneRea imgReaAdmin img-fluid"
									src={process.env.REACT_APP_API_MARINAFRONT + "/posts/" + object.id + "/image"}
									alt="post"
								/>
							</Col>
							<Col xs={12} sm={7} md={7} className="admin-margin">
								<div className="texte titreRea titreReaAdmin">
									{object.title} -- ORDRE : {object.order}
								</div>
							</Col>
							<Col xs={12} sm={7} md={4} className="admin-margin">
								<button className="btn btn-rea btn-rea-suite" onClick={() => showDataPost(object)}>
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
			</Row>
			<Row>
				{message.value ? (
					<Col md={12}>
						<p className="AlertOK">{message.txt}</p>
					</Col>
				) : (
					<div></div>
				)}
			</Row>
			<Row className="row-btnAjouter">
				<Col md={12} className="container-admin-btnAjouter">
					<div className="container-bordure">
						<button className=" btn btn-rea admin-btnAjouter" onClick={() => AddPost()}>
							Ajouter
						</button>
					</div>
				</Col>
			</Row>
			<Row>
				<Col>
					{ajouter ? (
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
									<input
										type="file"
										id="image2"
										name="image2"
										onChange={handleChangeFile2}
										className="form-control"
										ref={fileInput2}
									/>
								</Col>
							</Row>
							<Row className="">
								<Col md={6}>
									<label htmlFor="date">Date</label>
									<input type="date" id="date" name="date" value={post.date} onChange={handleChange} className="form-control" />
								</Col>
								<Col md={6}>
									<label htmlFor="order">Ordre</label>
									<input
										type="number"
										id="order"
										name="order"
										value={post.order}
										onChange={handleChange}
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
										value={post.resume}
										onChange={handleChange}
										className="form-control"
									/>
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
					) : (
						""
					)}
				</Col>
			</Row>
		</Grid>
	);
}

export default AdminProjetsForm;
