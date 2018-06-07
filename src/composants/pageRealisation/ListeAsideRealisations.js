import React, {Component} from 'react';
import './RealisationsPage.css';
import '@ladjs/bootstrap-social/bootstrap-social.css';
import 'font-awesome/css/font-awesome.css';

import {Link} from 'react-router-dom'

import PropTypes from 'prop-types';




class ListeAsideRealisations extends Component {


    state = {
        articleDemande: this.props.id,

    };

    static contextTypes = {
        tabRea: PropTypes.array
    };


    render(){
    const {articleDemande} = this.state;

        let listAside = this.context.tabRea.filter((object) => {
            if (parseInt(object.id) === parseInt(articleDemande)) {
                return false;
            }
            return object;
        });

        const rendu = listAside.map((object, i) => {
            return (
                <Link to={"/realisations/" + object.id} key={i}>
                    {object.titre}<br/>
                </Link>
            )
        });


        return(
            <p className="asideTexte">
                {rendu}
            </p>

        )
    }
}

export default ListeAsideRealisations;