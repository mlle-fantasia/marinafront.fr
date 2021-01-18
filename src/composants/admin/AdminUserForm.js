import { Grid, Row, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import "./Admin.css";
import axios from "axios";

function AdminArticlesForm(props) {
	const [user, setUser] = useState({});
	const [message, setMessage] = useState({ value: false, txt: "" });
	const [fileSelected, setfileSelected] = useState({ cv: null, binary: null });

	useEffect(() => {
		axios
			.get(process.env.REACT_APP_API_MARINAFRONT + "/user", {
				headers: { Authorization: localStorage.getItem("token") },
			})
			.then((response) => {
				if (response.data.error) {
					console.log("tu as une erreur");
					return true;
				}
				console.log("response.data", response.data);
				setUser(response.data[0]);
			});
		//console.log("article", article);
	}, []);

	//lorsqu'on selectionne un fichier
	function handleChangeFile(event) {
		event.preventDefault();

		let file = { cv: null };
		file.cv = this.fileInput.current.files[0];
		console.log("file", file);
		/* var reader = new FileReader();
		reader.onload = (function (theFile) {
			return function (e) {
				file.binary = e.target.result;
			};
		})(this.fileInput.current.files[0]);
		reader.readAsDataURL(this.fileInput.current.files[0]); */

		setfileSelected(file);
		/* 		this.setState({
			fileSelected: file,
		}); */
	}

	function handleChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		setUser({ ...user, [name]: value });
	}

	function handleSubmit(event) {
		event.preventDefault();

		let newMessage = "Infos enregistrées";
		axios
			.put(process.env.REACT_APP_API_MARINAFRONT + "/admin/user/modifier/" + user.id, user, {
				headers: { Authorization: localStorage.getItem("token") },
			})
			.then(async (response) => {
				if (response.data.error) {
					console.log("tu as une erreur");
					return true;
				}
				console.log("fileSelected", fileSelected);
				if (fileSelected.cv) {
					await saveCv();
				}
				setMessage({ value: true, txt: newMessage });
			});
	}
	function saveCv() {
		//const { fileSelected } = this.state;
		let formData = new FormData();
		formData.append("cv", fileSelected.cv, fileSelected.cv.name);
		console.log("formData", formData);
		axios.post(process.env.REACT_APP_API_MARINAFRONT + "/admin/user/modifiercv", formData, {
			headers: {
				Authorization: localStorage.getItem("token"),
				"Content-Type": "multipart/form-data",
			},
		});
	}
	const fileInput = React.createRef();
	const notificationMessage = message.value ? (
		<Col md={12}>
			<p className="AlertOK">{message.txt}</p>
		</Col>
	) : (
		<div></div>
	);

	return (
		<Grid className=" ">
			<form className="formAdmin" onSubmit={handleSubmit}>
				<Row className="">
					<Col md={6}>
						<label htmlFor="titre">Email</label>
						<input id="email" name="email" value={user.email} onChange={handleChange} className="form-control" />
					</Col>
					<Col md={6}>
						<label htmlFor="langage">Téléphone</label>
						<input type="text" id="tel" name="tel" value={user.tel} onChange={handleChange} className="form-control" />
					</Col>
				</Row>
				<Row className="">
					<Col md={6}>
						<label htmlFor="site">Adresse</label>
						<input type="text" id="address" name="address" value={user.address} onChange={handleChange} className="form-control" />
					</Col>
					<Col md={6}>
						<label htmlFor="site">Code postal + Ville</label>
						<input type="text" id="city" name="city" value={user.city} onChange={handleChange} className="form-control" />
					</Col>
				</Row>
				<Row className="d-flex flex-row align-items-end">
					<Col md={6}>
						<label htmlFor="langage">Région (dans le footer)</label>
						<input type="text" id="area" name="area" value={user.area} onChange={handleChange} className="form-control" />
					</Col>
					<Col md={6}>
						<label htmlFor="miniature">CV</label>
						<input
							type="file"
							id="miniature"
							name="miniature"
							//value={this.state.miniature}
							onChange={handleChangeFile}
							className="form-control"
							ref={fileInput}
						/>
						<p className="small">Cv publié : {user.cv}</p>
					</Col>
				</Row>

				<Row>{notificationMessage}</Row>
				<Row>
					<Col md={10}></Col>
					<Col md={2}>
						<button className="btn btn-rea">Enregistrer</button>
					</Col>
				</Row>
			</form>
		</Grid>
	);
}
export default AdminArticlesForm;
