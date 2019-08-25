import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Projet.css";
import "@ladjs/bootstrap-social/bootstrap-social.css";
import "font-awesome/css/font-awesome.css";
import RawHtml from "react-raw-html"
import {Col} from "react-bootstrap";



class ProjetComponent extends Component {

    state = {
        project:this.props.project,
        idProjet:this.props.projetID,
        projectClicked : false,
    };

    static contextTypes = {
        api: PropTypes.string,
        tabProjets:PropTypes.array
    };


    hideShowDataProject() {
        console.log(this.state.projectClicked);
        if(this.state.projectClicked === true){
            this.setState({projectClicked : false});
        }else{
            this.setState({projectClicked : true});
        }
    }

    
    render() {

        const linkToProject = this.state.project.lien ? (
            <div className="linkToProject" >
                <a href={this.state.project.lien} target="_blank"><button className="form-control btnRetour btnLinkProject">{this.state.project.titre}</button></a>
            </div>
            ):
            (<div></div>);

        const article =  this.state.projectClicked ?(
                <div className="projectArticle">
                    <RawHtml.div className="texte">{this.state.project.article}</RawHtml.div>
                    {linkToProject}
                </div>
            ):
            (<div></div>);

        return (
            <div>
                <div className="projet" onClick={this.hideShowDataProject.bind(this)}>
                    <h5> {this.state.project.titre}<span className="glyphicon glyphicon-chevron-down"></span></h5>
                </div>
                {article}
            </div>
        );
    }
}

export default ProjetComponent;
