import React, {Component} from 'react';
import PropTypes from 'prop-types';


class Provider extends Component {
    // 1.1. Définition des données du contexte
    getChildContext() {
        return {
            tabRea: this.props.tabRea
        }
    }

    // 1.3. Définition du type du contexte
    static childContextTypes = {
        tabRea: PropTypes.array
    };

    // 1.2. Rendu de l'application
    render() {
        return React.Children.only(this.props.children);
    }
}


export default Provider;