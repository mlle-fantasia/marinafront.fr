import React, {Component} from 'react';

import './RealisationsPage.css'
import '@ladjs/bootstrap-social/bootstrap-social.css'
import 'font-awesome/css/font-awesome.css'
import {Grid, Row, Col} from 'react-bootstrap';

import axios from 'axios';

const API = "http://api-marinafront";

class RealisationsPage extends Component {


    state = {
        realisations: [],
        article: [],
        articleDemande : '',

    }


    componentDidMount() {
        axios.get(API + "/realisation-article.php").then((response) => {
            if (response.data.error) {
                console.log("tu as une erreur");
                return true;
            }
            const realisations = response.data.payload;
            this.setState({realisations});
            console.log(realisations);
        });
    };

    /*
      componentWillUnmount() {
        this.serverRequest.abort();
      };*/

    handleClickeUneRea(id) {
        const {article, realisations, articleDemande} = this.state;
        axios.get(API + "/realisation-article.php?id=" + id).then((response) => {
            if (response.data.error) {
                console.log("tu as une erreur");
                return true;
            }

            let article = response.data.payload;
            this.setState({article});

            let idArticleDemande = id;
            this.setState({articleDemande : idArticleDemande});
            console.log(id);
        });
    }


    retour() {
        this.setState({article: []});
    }


    render() {
        const {realisations, article, articleDemande} = this.state;


        let listeAside = realisations.map((object, i) => {

            if (object.id != articleDemande) {
                return (
                    <div key={i}>
                        <a>
                            <div className="texte" onClick={() => {
                                this.handleClickeUneRea(object.id)
                            }}>{object.titre}</div>
                        </a>
                    </div>
                )
            }
        });


        console.log(listeAside);

        const resultat = article.length == 0 ? (
            <Grid className="realisation">
                <Row>
                    <Col xs={12} md={6}>
                        <h2><span className="glyfTitre glyphicon glyphicon-comment"></span>
                            <div className="petitTitre">Quelques réalisations:</div>
                        </h2>
                    </Col>
                </Row>
                <Row>
                    {realisations.map((object, i) =>
                        <Col xs={12} sm={6} md={4} key={i} className="margin">
                            <div className={`uneRea ${object.image}`} onClick={() => {
                                this.handleClickeUneRea(object.id)
                            }}></div>
                            <div className="texte">{object.titre}</div>
                        </Col>)}

                </Row>
            </Grid>
        ) : (
            <Grid className="article">
                <Row>
                    <Col xs={12} md={9}>
                        <h2>
                            <div className="petitTitre">{article.titre}</div>
                        </h2>
                    </Col>
                </Row>
                <Row>

                    <Col xs={12} sm={8} md={9} className="margin">
                        <div>{article.contenu}</div>
                        <button onClick={() => {
                            this.retour()
                        }}>retour
                        </button>
                    </Col>
                    <Col xs={12} sm={4} md={3} className="aside">
                    <h3 className="asideTitre">Les réalisations</h3>
                        {listeAside}

                    </Col>

                </Row>
            </Grid>

        )


        return (

            <div>
                {resultat}
            </div>
        )
            ;
    }
}

export default RealisationsPage;
