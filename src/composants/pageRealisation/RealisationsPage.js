import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CvHeader from '../pageCv/CvHeader.js';
import './RealisationsPage.css';
import '@ladjs/bootstrap-social/bootstrap-social.css';
import 'font-awesome/css/font-awesome.css';
import {Grid, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom'


class RealisationsPage extends Component {



    static contextTypes = {
        tabRea: PropTypes.array
    };


    render() {

        return (

            <div>
                <CvHeader/>
                <Grid className="realisation">
                    <Row>
                        <Col xs={12} md={6}>
                            <h2><span className="glyfTitre glyphicon glyphicon-comment"></span>
                                <div className="petitTitre">Quelques réalisations :</div>
                            </h2>
                        </Col>
                    </Row>
                    <Row>
                        {this.context.tabRea.map((object, i) =>
                            <div className="margin">
                                <Link to={"/realisations/" + object.id + "#top"} key={i}>
                                    <Col xs={12} sm={5} md={4} className="margin">
                                        <div className={`uneRea ${object.image}`}></div>
                                    </Col>
                                </Link>
                                    <Col xs={12} sm={7} md={8} className="margin">
                                        <div className="texte titreRea">{object.titre} <span className="langagesRea">({object.Langages})</span></div>

                                        <p className="resumeRea">{object.resume}</p>
                                        <Link to={"/realisations/" + object.id + "#top"} key={i}><button className="btn btn-rea btn-rea-suite">Lire la suite</button></Link>
                                            <span>{object.site ?
                                        (<a href ={object.site} target ="_bank" rel="noopener noreferre"><button className="btn btn-rea">lien vers le site</button></a>)
                                        : ("")}</span>
                                    </Col>
                                <Col xs={12} sm={12} md={12} >
                                    <hr/>
                                </Col>
                            </div>
                        )}
                    </Row>
                    <Row>
                        <Col xs={12} md={6}>
                            <h3 className="github">
                                Dépôts Github :
                                <a href="https://github.com/mlle-fantasia" target="_blank" rel="noopener noreferrer" >
                                   <button className="btn form-control btn-rea btn-lien-github">Les dépots des mes réalisations</button>
                                </a>
                            </h3>

                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default RealisationsPage;
