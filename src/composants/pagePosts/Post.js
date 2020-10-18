import React, { Component } from "react";
import "./PostsPage.css";
import { Grid, Row, Col } from "react-bootstrap";
import NavIcons from "../NavIcons";
import RawHtml from "react-raw-html";
import axios from "axios";

class Post extends Component {
	state = {
		post: [],
		postDemande: null,
	};

	/* componentDidMount() {
		const { postDemande } = this.props.match.params.id;
		this.setState({ postDemande });
		this.getPost(postDemande);
	} */

	componentWillMount() {
		console.log("componentDidMount :", this.state.articleDemande);
		this.getPost(this.state.articleDemande);
	}
	componentWillReceiveProps(nextProps) {
		console.log("componentWillReceiveProps : ", nextProps.match.params.id);
		this.setState({ postDemande: nextProps.match.params.id });
		this.getPost(nextProps.match.params.id);
	}

	getPost(postDemandeId) {
		axios.get(process.env.REACT_APP_API_MARINAFRONT + "/posts/" + postDemandeId).then((response) => {
			if (response.data.error) {
				console.log("tu as une erreur");
				return true;
			}
			let post = response.data;
			this.setState({ post });
		});
	}

	render() {
		const { post } = this.state;

		return (
			<div>
				<Grid className="realisation">
					<Row>
						<Col xs={12}>
							<img
								className=" img-fluid"
								src={process.env.REACT_APP_API_MARINAFRONT + "/posts/" + post.id + "/image2"}
								alt="Rechargez la page s'il vous plait"
							/>
						</Col>
					</Row>
					<Row className="mb-5">
						<h2>
							<div className="petitTitre">{post.title}</div>
						</h2>
						<RawHtml.div className="texte">{post.contenu}</RawHtml.div>
					</Row>
				</Grid>

				<NavIcons />
			</div>
		);
	}
}

export default Post;
