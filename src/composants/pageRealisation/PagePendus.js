import {Component} from 'react';
import {Grid, Row, Col, Image} from 'react-bootstrap';
import React from "react";
import './PagePendus.css';

class PagePendus extends Component{

    render(){
        return(
            <Grid className=" backgroundColor" fluid>
                <div className="pendus">
                    <div className="container-fluid ">
                        <div className="container">
                            <Row className="marginTop">
                                <Col md={12} className=" header">
                                    <h1 className="text-center">Un pendu - Deux solutions</h1>
                                    <h2 className="text-center">Testez et choisissez celle qui vous convient le mieux
                                        !</h2>
                                    <p className="text-center">J'ai réalisé deux jeux du pendu, L'un en
                                        utilisant <strong>RéactJs</strong> et l'autre en utilisant <strong>Angular
                                            6</strong>.
                                        Les deux jeux sont presque identique. J'ai ainsi pu observer les différences
                                        entre les deux langages.</p>
                                    <p className="text-center">Vous pouvez cliquer sur les boutons et jouer.</p>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className="container">
                        <Row className=" marginTop marginBot">

                            <Col md={6}>
                                <div className="cadre cadrereact">
                                    <div className="text-center">
                                        <Image className="imageLogo" src="../images/react-logo.png" alt="logo de React"  />
                                    </div>
                                    <button className="btn  btn-secondary btn-block btn-jouer btnReact"><a
                                        className="text-decoration-none text-uppercase">Jouer</a></button>
                                    <div className="details">
                                        <p>Syntaxe simplifiée avec JSX</p>
                                        <p>Optimisation du rendu avec une DOM virtuel</p>
                                        <p>Communiquation vers les composants enfants avec les Props</p>
                                        <p>Des pages dynamiques avec l'Etat local</p>
                                        <p>Une communiquation entre tous les composants avec le Context</p>
                                    </div>
                                </div>
                            </Col>

                            <Col md={6} >
                                <div className="cadre cadreAngular">
                                    <div className="text-center">
                                        <Image className="imageLogo" src="../images/angular.png" alt="logo de Angular" />
                                    </div>
                                    <button className="btn btn-secondary btn-block btn-jouer btnAngular"><a
                                        className="text-decoration-none text-uppercase">Jouer</a></button>
                                    <div className="details">
                                        <p>Séparation du template et du code applicatif</p>
                                        <p>Composants dynamiques avec l'interpolation, Property binding et Two-way
                                            binding </p>
                                        <p>Directives structurelles *ngIf et *ngFor</p>
                                        <p>Des composants qui communiquent avec les observables de Rxjs</p>
                                        <p>Centralisation de code dans des services</p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Grid>
        );
    }


}
export default PagePendus;