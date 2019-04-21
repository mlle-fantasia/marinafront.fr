import {Component} from 'react';
import {Grid, Row, Col, Image} from 'react-bootstrap';
import React from "react";
import './PagePendus.css';
import {Link} from "react-router-dom";

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
                                        utilisant <strong>ReactJs</strong> et l'autre en utilisant <strong>Angular
                                            6</strong>.
                                        Les deux jeux sont presque identiques. J'ai ainsi pu observer les différences
                                        entre les deux langages.
                                        <Link to={"/realisations/4#top"}>
                                            <span> Article React VS Angular</span>
                                        </Link>
                                    </p>
                                    <h3 className="text-center">Vous pouvez cliquer sur les boutons et jouer.</h3>
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
                                    <a href="https://pendureact.exs3.com"  target="bank" className="text-decoration-none text-uppercase">
                                        <button className="btn  btn-secondary btn-block btn-jouer btnReact">Jouer</button>
                                    </a>
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
                                    <a href="https://penduangular.exs3.com" className="text-decoration-none text-uppercase">
                                        <button className="btn btn-secondary btn-block btn-jouer btnAngular">Jouer</button>
                                    </a>
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