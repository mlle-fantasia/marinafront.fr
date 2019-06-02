import React, {Component} from 'react';
import './RealisationsPage.css';
import '@ladjs/bootstrap-social/bootstrap-social.css';
import 'font-awesome/css/font-awesome.css';
import {Grid, Row, Col} from 'react-bootstrap';
import {HashLink as Link} from 'react-router-hash-link';
import axios from 'axios';
import RawHtml from "react-raw-html"
import PropTypes from 'prop-types';
import MyLightbox from "./MyLightbox";
import ListeAsideRealisations from "./ListeAsideRealisations";
import NavIcons from "../NavIcons";

const API = "https://api.marinafront.fr";
//const API = "http://api-site-web";



class RealisationArticle extends Component {


    state = {
        article: [],
        articleDemande: this.props.match.params.id,
        listeAside: [],
        photos: [],
    };

    static contextTypes = {
        tabRea: PropTypes.array
    };


    componentWillMount() {
        this.recupererInformationArticle(this.state.articleDemande);
    }

    componentWillReceiveProps(nextProps) {

        this.setState({articleDemande: nextProps.match.params.id});
        this.recupererInformationArticle(nextProps.match.params.id);
    }

    recupererInformationArticle(articleDemande) {

        // this.setState({articleDemande : articleDemande2});

        axios.get(API + "/realisation-article.php?id=" + articleDemande).then((response) => {
            if (response.data.error) {
                console.log("il y a une erreur");
                return true;
            }
            let article = response.data.payload;
            this.setState({article});

        });

        axios.get(API + "/realisation-images.php?id=" + articleDemande).then((response) => {
            if (response.data.error) {
                console.log("tu as une erreur");
                return true;
            }
            let photos = response.data.payload;
            this.setState({photos});
        });
    }



    render() {
        const {article, articleDemande, photos} = this.state;

        const galerie = photos.length !== 0 ?
            (<div>
                <h3 className="galerieTitre">Les images</h3>
                <div>
                    <div className="mt-5 galerieImages">
                        <MyLightbox photos={photos}/>
                    </div>
                </div>
            </div>)
            : (<div></div>);


        const leLiens = article.liens ?
            (<div>
                <h3 className="galerieTitre">Les liens</h3>
                <div>
                    <div className="mt-5 galerieImages">
                        {article.liens.map ((a , i) =>
                            <div className="btnLienAside" key={i}>
                                <a href ={a.lien} target ="_bank" rel="noopener noreferre" className="btn form-control btn-lien">{a.lienNom}</a>
                            </div>
                        )}
                    </div>
                </div>
            </div>)
            : (<div></div>);


        return (
            <div>
                <Grid className="article">
                    <Row>
                        <Col xs={12} md={9} className="unArticle">
                            <Row>
                                <Col xs={12} md={12} className="texteArticle">
                                    <h2>
                                        <div className="titreArticle">{article.titre}</div>
                                    </h2>
                                    <RawHtml.div className="texte">{article.contenu}</RawHtml.div>
                                </Col>
                                <Col xs={12} md={6} sm={6}>
                                    <Link to={"/realisations#top"}>
                                        <button className="form-control btnRetour">retour à la liste des réalisations</button>
                                    </Link>
                                </Col>
                                <Col xs={12} md={6} sm={6}>
                                    <a href="#top">
                                        <button className="form-control btnRetour">retour en haut de la page</button>
                                    </a>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12} sm={12}  md={3} className="images">

                            {leLiens}
                            {galerie}
                            <div className="listeAsideCSS">
                                <h3 className="asideTitre">Les autres réalisations</h3>
                                <div className="asideTexte">
                                    <ListeAsideRealisations id={articleDemande}/>
                                </div>
                            </div>
                        </Col>
                    </Row>

                </Grid>
                <NavIcons/>
            </div>
        );
    }
}

export default RealisationArticle;