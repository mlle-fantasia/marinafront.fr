import {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import React from "react";
import './Admin.css';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';


class Admin extends Component{

    static contextTypes = {
        tabRea: PropTypes.array
    };

    render(){
        return(
            <Grid className=" ">
                <div className="admin">
                    <Row className="">
                        <Col md={12} className=" ">
                            <h1 className="text-center">bienvenue dans l'espace admin !</h1>
                            <div className="admin-sousTitre">
                                <div className="admin-sousTitreTitre">Les articles</div>
                                <button className="btn btn-rea admin-btnAjouter">Ajouter un article</button>
                            </div>

                            <div className="listeArticle">

                                {this.context.tabRea.map((object, i) =>
                                    <div className="margin" key={i}>

                                            <Col xs={12} sm={5} md={2} className="">
                                                <div className={`uneRea ${object.image}`}></div>
                                            </Col>

                                        <Col xs={12} sm={7} md={10} className="admin-margin">
                                            <div className="texte titreRea">{object.titre} </div>


                                            <Link to={"/fantasia/admin" + object.id + "#top"}><button className="btn btn-rea btn-rea-suite">Modifier</button></Link>
                                            <span>
                                                <Link to={"/fantasia/admin" + object.id + "#top"}><button className="btn btn-rea btn-danger">Supprimer</button></Link>
                                            </span>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} >
                                            <hr/>
                                        </Col>
                                    </div>
                                )}

                            </div>

                        </Col>
                    </Row>
                </div>
            </Grid>
        );
    }
}
export default Admin;