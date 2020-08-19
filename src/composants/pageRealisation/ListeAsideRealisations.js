import React, { Component } from "react";
import "./RealisationsPage.css";
import "@ladjs/bootstrap-social/bootstrap-social.css";
import "font-awesome/css/font-awesome.css";

import { HashLink as Link } from "react-router-hash-link";

import axios from "axios";

class ListeAsideRealisations extends Component {
	state = {
		articleDemande: this.props.id,
		article: [],
	};
	componentWillMount() {
		this.getListAside(this.state.articleDemande);
	}

	getListAside() {
		console.log(this.props.id);
		axios.get(process.env.REACT_APP_API_MARINAFRONT + "/articles/listeaside/" + this.props.id, {}).then((response) => {
			if (response.data.error) {
				console.log("tu as une erreur");
				return true;
			}
			this.setState({ article: response.data });
		});
	}

	render() {
		const rendu = this.state.article.map((object) => {
			return (
				<Link to={"/realisations/" + object.id + "#top"} key={object.id}>
					{object.title} <br />
				</Link>
			);
		});

		return <p className="asideTexte">{rendu}</p>;
	}
}

export default ListeAsideRealisations;
