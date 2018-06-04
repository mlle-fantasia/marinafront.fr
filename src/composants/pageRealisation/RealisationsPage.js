import React, {Component} from 'react';

import CvHeader from '../pageCv/CvHeader.js';
import './RealisationsPage.css';
import '@ladjs/bootstrap-social/bootstrap-social.css';
import 'font-awesome/css/font-awesome.css';
import {Grid, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import axios from 'axios';

const API = "http://api-marinafront";


class RealisationsPage extends Component {

    state = {
        realisations: [],
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


    render() {
        const {realisations} = this.state;

        return (

            <div>
                <CvHeader/>
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
                            <Link to={"/realisations/"+object.id}>
                                <Col xs={12} sm={6} md={4} key={i} className="margin">
                                    <div className={`uneRea ${object.image}`} ></div>
                                    <div className="texte">{object.titre}</div>
                                </Col>
                            </Link>
                        )}

                    </Row>
                </Grid>
            </div>
        );
    }
}

export default RealisationsPage;
