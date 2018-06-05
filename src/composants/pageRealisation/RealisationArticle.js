import React, {Component} from 'react';
import './RealisationsPage.css';
import '@ladjs/bootstrap-social/bootstrap-social.css';
import 'font-awesome/css/font-awesome.css';
import {Grid, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import axios from 'axios';
import RawHtml from "react-raw-html"
import PropTypes from 'prop-types';
import MyLightbox from "../MyLightbox";

const API = "http://api-marinafront";

const photos = [
    {src: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(117).jpg', width: 4, height: 3},
    {src: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(98).jpg', width: 4, height: 3},
    {src: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(131).jpg', width: 4, height: 3},
    {src: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(123).jpg', width: 4, height: 3},
    {src: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(118).jpg', width: 4, height: 3},
    {src: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(128).jpg', width: 4, height: 3},
    {src: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(133).jpg', width: 4, height: 3},
    {src: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(132).jpg', width: 4, height: 3},
    {src: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(115).jpg', width: 4, height: 3},
];


class RealisationArticle extends Component {

    state = {
        article: [],
        articleDemande: this.props.match.params.id,
        listeAside: [],
    };

    static contextTypes = {
        tabRea: PropTypes.array
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
            console.log(article.titre);
        });


    }

    render() {
        const {article, articleDemande} = this.state;

        let listAside = this.context.tabRea.filter((object) => {
            if (parseInt(object.id) === parseInt(articleDemande)) {
                return false;
            }
            return object;
        });

        const rendu = listAside.map((object, i) => {
            return (
                <Link to={"/realisations/" + object.id} key={i}>
                    salut : {object.titre}
                </Link>
            )
        });

        return (
            <div>
                <Grid className="article">
                    <Row>
                        <Col xs={12} md={9} className="unArticle">
                            <h2>
                                <div className="petitTitre">{article.titre}</div>
                            </h2>
                            <RawHtml.div>{article.contenu}</RawHtml.div>
                            <Link to={"/realisations"}>
                                <button className="btnRetour">retour
                                </button>
                            </Link>
                        </Col>
                        <Col xs={12} sm={4} md={3} className="images">
                            <div>
                                <h3 className="galerieTitre">Les images</h3>
                                <div>
                                    <div className="mt-5">
                                        <MyLightbox photos={[photos[0]]}/>
                                        <MyLightbox photos={[photos[2], photos[3]]}/>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={12}>
                            <div className="listeAsideCSS">
                                <h3 className="asideTitre">Les autres réalisations</h3>
                                <div>
                                    {rendu}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default RealisationArticle;