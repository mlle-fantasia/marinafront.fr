import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Projet.css";
import "@ladjs/bootstrap-social/bootstrap-social.css";
import "font-awesome/css/font-awesome.css";
import axios from "axios";
import {Link} from "react-router-dom";


class ProjetComponent extends Component {

    state = {
        projets : [],
        projet:[],
        // projetDemande:this.props.match.params.id,
    };

    static contextTypes = {
        api: PropTypes.string
    };
    
    componentWillMount() {
        this.getProjects();
    }
    
    componentWillReceiveProps() {
        this.getProjects();
    }

    getProjects() {
        axios.get(this.context.api + "/realisation-oc.php").then((response) => {
            if (response.data.error) {
                console.log("il y a une erreur");
                return true;
            }
            let projets = response.data.payload;
            this.setState({projets});

        });
    }
    getProject(projetDemande) {
        axios.get(this.context.api + "/realisation-oc.php?id="+ projetDemande).then((response) => {
            if (response.data.error) {
                console.log("il y a une erreur");
                return true;
            }
            let projet = response.data.payload;
            this.setState({projet});

        });
    }
    
    
    render() {
        return (
            <div>
                {/*{this.props.projets.map((object, i) => (*/}
                    {/*<Link to={"/realisations/" + object.id + "#top"}>*/}
                        <div className="projet">
                            <h5>Projet 1<span className="glyphicon glyphicon-chevron-down"></span></h5>
                        </div>
                    {/*</Link>*/}
                {/*))}*/}
            </div>
        );
    }
}

export default ProjetComponent;
