import React, {Component} from 'react';
import {Col, Row} from 'react-bootstrap';
import './Admin.css';
import {Link} from "react-router-dom";
import axios from "axios";
import AdminArticlesForm from "./AdminArticlesForm"


class AdminArticlesList extends Component{

    constructor() {
       super();
        this.getArticleList();
    }

    state = {
        articles: [],
        ajouter: false
    };

    ajouter(){
        this.setState({ajouter: true});
    }
    liste(){
        this.setState({ajouter: false});
    }

    getArticleList() {

        axios.get("http://localhost:3001/admin/articles/list").then((response) => {
            if (response.data.error) {
                console.log("tu as une erreur");
                return true;
            }

            let articles = response.data;
            this.setState({articles});
        });
    }

    render(){
        const {ajouter, articles} = this.state;

        const listOrAjout = ajouter ?
            (
                <AdminArticlesForm/>
            )
                :
            (
                articles.map((object, i) =>
                <Row key={i}>
                    <div className="margin itemListAdmin" >
                        <Col xs={12} sm={5} md={1} className="">
                            <div className={`uneRea imgReaAdmin ${object.miniature}`}/>
                        </Col>
                        <Col xs={12} sm={7} md={7} className="admin-margin">
                            <div className="texte titreRea titreReaAdmin">{object.title} </div>
                        </Col>
                        <Col xs={12} sm={7} md={4} className="admin-margin">
                            <Link to={"/fantasia/admin" + object.id + "#top"}><button className="btn btn-rea btn-rea-suite">Modifier</button></Link>
                            <Link to={"/fantasia/admin" + object.id + "#top"}><button className="btn btn-rea btn-danger">Supprimer</button></Link>
                        </Col>
                        <Col xs={12} sm={12} md={12} >
                            <hr/>
                        </Col>
                    </div>
                </Row>
                )
         );

        return(
            <Col xs={12} sm={12} md={12}>
                <div>
                    <Row className="row-btnAjouter">
                        <Col md={12} className="container-admin-btnAjouter">
                            <button className=" btn btn-rea admin-btnAjouter" onClick={()=>this.ajouter()}>Ajouter</button>
                            <button className=" btn btn-rea admin-btnAjouter" onClick={()=>this.liste()}>Liste</button>
                        </Col>
                    </Row>
                </div>
                {listOrAjout}
            </Col>
        );
    }
}
export default AdminArticlesList;