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
        // const {realisations} = this.state;

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
                        {this.context.tabRea.map((object, i) =>
                            <Link to={"/realisations/" + object.id} key={i}>
                                <Col xs={12} sm={6} md={4} className="margin">
                                    <div className={`uneRea ${object.image}`}></div>
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
