import {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import React from "react";
import './Admin.css';
import AdminArticlesList from "./AdminArticlesList";


class Admin extends Component{


    state = {
        onglet:1,

    };

    majOnglet(onglet){
         this.setState({onglet});
    }

    getStyleOngletActif(onglet){
        return  onglet === this.state.onglet ? "onglet-actif" :"";
    }

    render(){

        return(
            <Grid className=" ">
                <div className="admin">
                    <Row className="">
                        <Col md={12} className=" ">


                            <Row className="navAdmin d-flex flex-row justify-content-around">
                                <Col md={2} className={`"admin-sousTitre" ${this.getStyleOngletActif(1)}`} onClick={()=>this.majOnglet(1)}><p>Les articles</p></Col>
                                <Col md={2} className={`"admin-sousTitre" ${this.getStyleOngletActif(2)}`} onClick={()=>this.majOnglet(2)}><p>Les projets oc</p></Col>
                                <Col md={2} className={`"admin-sousTitre" ${this.getStyleOngletActif(3)}`} onClick={()=>this.majOnglet(3)}><p>Les Posts</p></Col>
                                <Col md={2} className={`"admin-sousTitre" ${this.getStyleOngletActif(4)}`} onClick={()=>this.majOnglet(4)}><p>Les certificats</p></Col>
                                <Col md={2} className={`"admin-sousTitre" ${this.getStyleOngletActif(5)}`} onClick={()=>this.majOnglet(5)}><p>Infos perso</p></Col>
                            </Row>

                            <Row className="onglet">
                                {(() => {
                                    switch(this.state.onglet) {
                                        case 1:
                                            return <AdminArticlesList/>;
                                        case 2:
                                            return <AdminArticlesList projetOC={true}/>;
                                        case 3:
                                            return 'posts';
                                        case 4:
                                            return 'certif';
                                        case 5:
                                            return 'infos';
                                        default:
                                            return  <AdminArticlesList/>;
                                    }
                                })()}
                            </Row>

                        </Col>
                    </Row>
                </div>
            </Grid>
        );
    }
}
export default Admin;