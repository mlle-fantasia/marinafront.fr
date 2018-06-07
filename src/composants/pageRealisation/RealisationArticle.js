import React, {Component} from 'react';
import './RealisationsPage.css';
import '@ladjs/bootstrap-social/bootstrap-social.css';
import 'font-awesome/css/font-awesome.css';
import {Grid, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import axios from 'axios';
import RawHtml from "react-raw-html"
import PropTypes from 'prop-types';
import MyLightbox from "./MyLightbox";
import ListeAsideRealisations from "./ListeAsideRealisations";

const API = "http://api-marinafront";

// const photos = [
//     {src: '/images/imprimEcranEx.jpg', width: 4, height: 3},
//     {src: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(98).jpg', width: 4, height: 7},
//     {src: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(131).jpg', width: 4, height: 7},
//     {src: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(123).jpg', width: 4, height: 7},
//     {src: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(118).jpg', width: 4, height: 7},
//     {src: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(128).jpg', width: 4, height: 7},
//     {src: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(133).jpg', width: 4, height: 7},
//     {src: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(132).jpg', width: 4, height: 3},
//     {src: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(115).jpg', width: 4, height: 3},
// ];


class RealisationArticle extends Component {


        state = {
            article: [],
            articleDemande: this.props.match.params.id,
            listeAside: [],
            photos:[],
        };

    static contextTypes = {
        tabRea: PropTypes.array
    };




    componentDidMount() {
        const {articleDemande} = this.state;
        console.log("coucou1");
        axios.get(API + "/realisation-article.php?id=" + articleDemande).then((response) => {
            if (response.data.error) {
                console.log("tu as une erreur");
                return true;
            }
            console.log("coucou2");
            let article = response.data.payloadArticle;
            this.setState({article});
            console.log(article);
        });

        axios.get(API + "/realisation-images.php?id=" + articleDemande).then((response) => {
            if (response.data.error) {
                console.log("tu as une erreur");
                return true;
            }
            console.log("coucou3");
            let photos = response.data.payloadImages;
            this.setState({photos});
            console.log(photos);
        });

    }



    render() {
        const {article, articleDemande,photos} = this.state;



        return (
            <div>
                <Grid className="article">
                    <Row>
                        <Col xs={12} md={9} className="unArticle">
                            <Row>
                                <Col xs={12} md={12}>
                                    <h2>
                                        <div className="titreArticle">{article.titre}</div>
                                    </h2>
                                    <RawHtml.div className="texte">{article.contenu}</RawHtml.div>
                                </Col>
                                <Col xs={12} md={6}>
                                        <Link to={"/realisations#top"}>
                                            <button className="form-control btnRetour">retour à la liste des réalisations</button>
                                        </Link>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <a href="#top">
                                            <button className="form-control btnRetour">retour en haut de la page</button>
                                        </a>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12} sm={4} md={3} className="images">
                            <div>
                                <h3 className="galerieTitre">Les images</h3>
                                <div>
                                    <div className="mt-5 galerieImages">
                                        <MyLightbox photos={photos}/>
                                    </div>
                                </div>
                            </div>
                            <div className="listeAsideCSS">
                                <h3 className="asideTitre">Les autres réalisations</h3>
                                <p className="asideTexte">
                                    <ListeAsideRealisations id={articleDemande}/>
                                </p>
                            </div>
                        </Col>
                    </Row>

                </Grid>
            </div>
        );
    }
}

export default RealisationArticle;