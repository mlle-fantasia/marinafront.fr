import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Provider extends Component {
    // Définition des données du contexte
    getChildContext() {
        return {
            tabRea: this.props.tabRea
        }
    }

    // Définition du type du contexte
    static childContextTypes = {
        tabRea: PropTypes.array
    };

    // Rendu de l'application
    render() {
        return React.Children.only(this.props.children);
    }
}

export default Provider;