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
        console.log(onglet);
         this.setState({onglet});
    }


    render(){

        return(
            <Grid className=" ">
                <div className="admin">
                    <Row className="">
                        <Col md={12} className=" ">


                            <Row className="navAdmin d-flex flex-row justify-content-around">
                                <Col md={3} className="admin-sousTitre" type="button" onClick={()=>this.majOnglet(1)}>Les articles</Col>
                                <Col md={3} className="admin-sousTitre" type="button" onClick={()=>this.majOnglet(2)}>Les Posts</Col>
                                <Col md={3} className="admin-sousTitre" type="button" onClick={()=>this.majOnglet(3)}>Les certificats</Col>
                                <Col md={3} className="admin-sousTitre" type="button" onClick={()=>this.majOnglet(4)}>Les info perso</Col>
                            </Row>

                            <div className="divBlanche">
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
                                            return  <h1 className="text-center">bienvenue dans l'espace admin !</h1>;
                                    }
                                })()}
                            </div>

                        </Col>
                    </Row>
                </div>
            </Grid>
        );
    }
}
export default Admin;