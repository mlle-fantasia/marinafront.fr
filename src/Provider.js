import React, { Component } from "react";
import PropTypes from "prop-types";

class Provider extends Component {
	// Définition des données du contexte
	getChildContext() {
		return {
			user: this.props.user,
			tabLiens: this.props.tabLiens,
		};
	}

	// Définition du type du contexte
	static childContextTypes = {
		user: PropTypes.array,
		tabLiens: PropTypes.array,
	};

	// Rendu de l'application
	render() {
		return React.Children.only(this.props.children);
	}
}

export default Provider;
