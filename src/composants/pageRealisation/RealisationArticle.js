import React, {Component} from 'react';

import './RealisationsPage.css';
import '@ladjs/bootstrap-social/bootstrap-social.css';
import 'font-awesome/css/font-awesome.css';
import {Grid, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import axios from 'axios';
import RawHtml from "react-raw-html"

const API = "http://api-marinafront";

class RealisationArticle extends Component {

    state = {
        article: [],
        realisations: [],
        articleDemande: this.props.match.params.id,
    };

    componentDidMount() {
        const {articleDemande} = this.state;
        axios.get(API + "/realisation-article.php?id=" + articleDemande).then((response) => {
            if (response.data.error) {
                console.log("tu as une erreur");
                return true;
            }
            let article = response.data.payloadArticle;
            this.setState({article});
        });
    }

    render() {

        const {articleDemande, article, realisations} = this.state;

        let listeAside = realisations.filter((object, i) => {
            if (object.id !== articleDemande) {
                return (
                    <div key={i}>
                        <Link to={"/realisations/" + object.id}>
                            <a>
                                <div className="">{object.titre}</div>
                            </a>
                        </Link>
                    </div>
                )
            }return false;
        });

        return (
            <div>
                <Grid className="article">
                    <Row>
                        <Col xs={12} md={9}>
                            <h2>
                                <div className="petitTitre">{article.titre}</div>
                            </h2>
                            <RawHtml.div>{article.contenu}</RawHtml.div>
                            <Link to={"/realisations"}>
                                <button className="btnRetour">retour
                                </button>
                            </Link>
                            <div className="listeAside">
                                <h3 className="asideTitre">Les autres réalisations</h3>
                                {listeAside}
                            </div>
                        </Col>
                        <Col xs={12} sm={4} md={3} className="images">
                            <div>
                                <h3 className="galerieTitre">Les images</h3>


                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default RealisationArticle;