import React, { Component } from "react";
import PropTypes from "prop-types";

class Provider extends Component {
	// Définition des données du contexte
	getChildContext() {
		return {
			user: this.props.user,
			tabLiens: this.props.tabLiens,
			tabLiensIcons: this.props.tabLiensIcons,
		};
	}

	// Définition du type du contexte
	static childContextTypes = {
		user: PropTypes.object,
		tabLiens: PropTypes.array,
		tabLiensIcons: PropTypes.array,
	};

	// Rendu de l'application
	render() {
		return React.Children.only(this.props.children);
	}
}

export default Provider;
