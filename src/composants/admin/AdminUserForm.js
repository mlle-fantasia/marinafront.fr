import { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import React from "react";
import "./Admin.css";
import axios from "axios";

class AdminArticlesForm extends Component {
	constructor(props) {
		super(props);
		this.showDataUser();
		this.handleChangeFile = this.handleChangeFile.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.fileInput = React.createRef();
	}
	state = {
		email: "",
		tel: "",
		address: "",
		city: "",
		area: "",
		cv: "",
		id: "",
		message: false,
		messageText: "",
		fileSelected: { image: null, binary: null },
	};

	showDataUser() {
		axios.get(process.env.REACT_APP_API_MARINAFRONT + "/user").then((response) => {
			if (response.data.error) {
				console.log("tu as une erreur");
				return true;
			}
			const { email, tel, city, address, area, cv, id } = response.data[0];
			this.setState({
				email: email,
				tel: tel,
				address: address,
				city: city,
				area: area,
				cv: cv,
				id: id,
			});
		});
	}
	//lorsqu'on selectionne un fichier
	handleChangeFile(event) {
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

		this.setState({
			fileSelected: file,
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

	handleSubmit(event) {
		event.preventDefault();
		let { id, email, tel, city, address, area, fileSelected } = this.state;

		let newMessage = "l'article à bien été modifié";
		axios
			.put(
				process.env.REACT_APP_API_MARINAFRONT + "/admin/user/modifier/" + id,
				{
					email: email,
					tel: tel,
					address: address,
					city: city,
					area: area,
				},
				{ headers: { Authorization: localStorage.getItem("token") } }
			)
			.then(async (response) => {
				if (response.data.error) {
					console.log("tu as une erreur");
					return true;
				}
				console.log("fileSelected", fileSelected);
				if (fileSelected.cv) {
					await this.saveCv();
				}
				this.setState({ message: true, messageText: newMessage });
			});
	}
	saveCv() {
		const { fileSelected } = this.state;
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

	render() {
		const notificationMessage = this.state.message ? (
			<Col md={12}>
				<p className="AlertOK">{this.state.messageText}</p>
			</Col>
		) : (
			<div></div>
		);

		return (
			<Grid className=" ">
				<form className="formAdmin" onSubmit={this.handleSubmit}>
					<Row className="">
						<Col md={6}>
							<label htmlFor="titre">Email</label>
							<input id="email" name="email" value={this.state.email} onChange={this.handleChange} className="form-control" />
						</Col>
						<Col md={6}>
							<label htmlFor="langage">Téléphone</label>
							<input type="text" id="tel" name="tel" value={this.state.tel} onChange={this.handleChange} className="form-control" />
						</Col>
					</Row>
					<Row className="">
						<Col md={6}>
							<label htmlFor="site">Adresse</label>
							<input
								type="text"
								id="address"
								name="address"
								value={this.state.address}
								onChange={this.handleChange}
								className="form-control"
							/>
						</Col>
						<Col md={6}>
							<label htmlFor="site">Code postal + Ville</label>
							<input type="text" id="city" name="city" value={this.state.city} onChange={this.handleChange} className="form-control" />
						</Col>
					</Row>
					<Row className="d-flex flex-row align-items-end">
						<Col md={6}>
							<label htmlFor="langage">Région (dans le footer)</label>
							<input type="text" id="area" name="area" value={this.state.area} onChange={this.handleChange} className="form-control" />
						</Col>
						<Col md={6}>
							<label htmlFor="miniature">CV</label>
							<input
								type="file"
								id="miniature"
								name="miniature"
								//value={this.state.miniature}
								onChange={this.handleChangeFile}
								className="form-control"
								ref={this.fileInput}
							/>
							<p className="small">Cv publié : {this.state.cv}</p>
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
}
export default AdminArticlesForm;
