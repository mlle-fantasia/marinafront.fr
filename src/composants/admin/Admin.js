import {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import React from "react";
import './Admin.css';
import AdminArticlesList from "./AdminArticlesList";


class Admin extends Component{


    state = {
        onglet:0,

    };

    majOnglet(onglet){
         this.setState({onglet});
    }


    render(){

        return(
            <Grid className=" ">
                <div className="admin">
                    <Row className="">
                        <Col md={12} className=" ">


                            <Row className="navAdmin d-flex flex-row justify-content-around">
                                <Col md={3} className="admin-sousTitre" onClick={()=>this.majOnglet(1)}><p>Les articles</p></Col>
                                <Col md={3} className="admin-sousTitre" onClick={()=>this.majOnglet(2)}><p>Les Posts</p></Col>
                                <Col md={3} className="admin-sousTitre" onClick={()=>this.majOnglet(3)}><p>Les certificats</p></Col>
                                <Col md={3} className="admin-sousTitre" onClick={()=>this.majOnglet(4)}><p>Les info perso</p></Col>
                            </Row>

                            <Row className="onglet">
                                {(() => {
                                    switch(this.state.onglet) {
                                        case 1:
                                            return <AdminArticlesList/>;
                                        case 2:
                                            return 'posts';
                                        case 3:
                                            return 'certif';
                                        case 4:
                                            return 'infos';
                                        default:
                                            return  <h1 className="text-center">Bienvenue dans l'espace admin !</h1>;
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