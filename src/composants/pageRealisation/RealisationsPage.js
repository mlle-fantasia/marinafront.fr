import React, {Component} from 'react';
import Lightbox from 'react-images';
import './RealisationsPage.css';
import '@ladjs/bootstrap-social/bootstrap-social.css';
import 'font-awesome/css/font-awesome.css';
import {Grid, Row, Col} from 'react-bootstrap';
import imprimEcranEx from '../images/imprimEcranEx.jpg';
import diagramCasUtilisationexemples from '../images/diagramCasUtilisationexemples.jpg';
import axios from 'axios';

const API = "http://api-marinafront";

class RealisationsPage extends Component {


    state = {
        realisations: [],
        article: [],
        images:[],
        articleDemande : '',

    }


    componentDidMount() {
        axios.get(API + "/realisation-article.php").then((response) => {
            if (response.data.error) {

                console.log("tu as une erreur");
                return true;
            }
            const realisations = response.data.payloadArticle;
            this.setState({realisations});
            console.log(realisations);

        });
    };

    /*
      componentWillUnmount() {
        this.serverRequest.abort();
      };*/

    handleClickeUneRea(id) {
        const {} = this.state;
        axios.get(API + "/realisation-article.php?id=" + id).then((response) => {
            if (response.data.error) {
                console.log("tu as une erreur");
                return true;
            }
            let article = response.data.payloadArticle;
            this.setState({article});

            let idArticleDemande = id;
            this.setState({articleDemande : idArticleDemande});
            console.log(id);
        });

            axios.get(API + "/realisation-images.php?id=" + id).then((response) => {
                if (response.data.error) {
                    console.log("tu as une erreur");
                    return true;
                }
                let newImages = response.data.payloadImages;
                this.setState({images : newImages});
                console.log(newImages);
        });


    }


    retour() {
        this.setState({article: []});
    }


    render() {
        const {realisations, article,images, articleDemande} = this.state;


            const imagestest = [
                {
                    src: '../images/imprimEcranEx.jpg',
                    title: "captures d'écran",
                    description: 'image description'
                },
                {
                    src: '../images/diagramCasUtilisationexemples.jpg',
                    title: "captures d'écran",
                    description: 'image description'
                }
            ];


            console.log(imagestest);
        /*const listeImages =images.map((object, i) =>
            <div key={i}>

                <Lightbox
                    images={[
                        { src: '{object.image}' },

                    ]}
                    isOpen={this.state.lightboxIsOpen}
                    onClickPrev={this.gotoPrevious}
                    onClickNext={this.gotoNext}
                    onClose={this.closeLightbox}
                />
            </div>);

        /*const listeImage = images.map((object, i) =>
            <div key={i}>

                    <div className="uneImage" onClick={() => {this.handleClickeUneImage()}}>
                        <img src={object.image} alt={object.alt}/>
                    </div>
            </div>
        );*/

        let listeAside = realisations.map((object, i) => {
            if (object.id !== articleDemande) {
                return (
                    <div key={i}>
                        <a>
                            <div className="" onClick={() => {
                                this.handleClickeUneRea(object.id)
                            }}>{object.titre}</div>
                        </a>
                    </div>
                )
            }
        });


        const resultat = article.length === 0 ? (
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
                        <div>{article.contenu}</div>
                        <button className="btnRetour" onClick={() => {
                            this.retour()
                            }}>retour
                        </button>
                        <div className="listeAside">
                            <h3 className="asideTitre">Les autres réalisations</h3>
                            {listeAside}
                        </div>
                    </Col>
                    <Col xs={12} sm={4} md={3} className="images">
                        <h3 className="galerieTitre">Les images</h3>
                        <Lightbox images={imagestest}
                                  isOpen={this.state.lightboxIsOpen}
                                  onClickPrev={this.gotoPrevious}
                                  onClickNext={this.gotoNext}
                                  onClose={this.closeLightbox}
                        />

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
