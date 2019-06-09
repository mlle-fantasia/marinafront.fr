import {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import React from "react";
import './Admin.css';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import axios from "axios";
import AdminArticlesList from "./AdminArticlesList";


class AdminArticlesForm extends Component{

    constructor() {
        super();
        this.showDataArticle();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        title: "test",
        miniature:"",
        site:"",
        langage:"",
        resume:"",
        contenu:"",
        articleAdded:false

    };
    showDataArticle(){
        //todo
        //mettre à jour le state avec les données de l'article à modifier si on veut modifier.
    }
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.post("http://localhost:3001/admin/articles/add", {
            title: this.state.title,
            miniature:this.state.miniature,
            site:this.state.site,
            langage:this.state.langage,
            resume:this.state.resume,
            contenu:this.state.contenu,
        }).then((response) => {
            if (response.data.error) {
                console.log("tu as une erreur");
                return true;
            }
            this.setState({articleAdded:true});
        });
    }


    render(){

        const articleAdded = this.state.articleAdded ? (
            <Col md={12} >
                <p className="AlertOK">l'article à bien été ajouté</p>
            </Col>
        ):(<div></div>);

        return(
            <Grid className=" ">
                <Row >
                    {articleAdded}
                </Row>
                <form className="formAdmin">
                    <Row className="">
                        <Col md={6}>
                            <label>Titre
                            <input id="title" name="title" value={this.state.title}  onChange={this.handleChange} className="form-control"/>
                            </label>
                        </Col>
                        <Col md={6}>
                            <label htmlFor="miniature">Miniature</label>
                            <input type="text" id="miniature" name="miniature" value={this.state.miniature} onChange={this.handleChange} className="form-control"/>
                        </Col>
                    </Row>
                    <Row className="">
                        <Col md={6}>
                            <label htmlFor="langage">Langages</label>
                            <input type="text" id="langage" name="langage" value={this.state.langage} onChange={this.handleChange} className="form-control"/>
                        </Col>
                        <Col md={6}>
                            <label htmlFor="site">Site</label>
                            <input type="text" id="site" name="site" value={this.state.site} onChange={this.handleChange} className="form-control"/>
                        </Col>
                    </Row>
                    <Row className="">
                        <Col md={12}>
                            <label htmlFor="resume">Résumé</label>
                            <textarea name="resume" id="resume" rows="5" value={this.state.resume} onChange={this.handleChange}  className="form-control"></textarea>
                        </Col>
                    </Row>
                    <Row className="">
                        <Col md={12}>
                            <label htmlFor="contenu">Contenu</label>
                            <textarea name="contenu" id="contenu" rows="50" value={this.state.contenu} onChange={this.handleChange} className="form-control"></textarea>
                        </Col>
                    </Row>
                    <Row className="">
                        <button type="submit" className="btn btn-rea" >Ajouter</button>
                    </Row>
                </form>
            </Grid>
        );
    }
}
export default AdminArticlesForm;