import React, {Component} from 'react';
import AccueilHeader from './AccueilHeader.js';
import './AccueilPage.css'
import '@ladjs/bootstrap-social/bootstrap-social.css'
import 'font-awesome/css/font-awesome.css'
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import NavIcons from "../NavIcons";


class AccueilPage extends Component {
    render() {
        return (
            <div>
                <AccueilHeader/>
                <Grid fluid className="sansPadding">
                    <Col xs={12} sm={7} md={8}>
                        <Row className="quelquesMots">
                            <Col xs={12} md={8} mdOffset={2} className="texte">
                                <h2><span className="glyfTitre glyphicon glyphicon-comment"></span>
                                    <div className="petitTitre">En quelques mots :</div>
                                </h2>
                                <p>Après un cursus d'études supérieures en architecture intérieure, je me suis réorientée vers l'informatique et plus précisément le développement web qui est devenu
                                    une passion.
                                    Ma dernière formation et mes recherches personnelles m'ont permis d'avoir de bonnes bases dans de nombreux langages. </p>
                            </Col>
                        </Row>
                        <Row className="actuellemnt">
                            <Col xs={12} md={8} mdOffset={2} className="texte">
                                <h2><span className="glyfTitre glyphicon glyphicon-refresh"></span>
                                    <div className="petitTitre">Actuellement :</div>
                                </h2>
                                <p>Je suis actuellement à la recherche d'un emploi de développeuse web (front-end / back-end) dans la région de Sophia Antipolis.
                                    <br/>En attente de vos défis je continue de me former.</p>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={12} sm={5} md={4} className="sansPadding">
                        <div className="identite">
                        </div>
                    </Col>
                </Grid>

                <NavIcons/>

            </div>
        );
    }
}

export default AccueilPage;




		