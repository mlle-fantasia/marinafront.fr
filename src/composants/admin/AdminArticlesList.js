import React, {Component} from 'react';
import {Col, Row} from 'react-bootstrap';
import './Admin.css';
import {Link} from "react-router-dom";
import axios from "axios";


class AdminArticlesList extends Component{

    constructor() {
       super();
        this.getArticleList();
    }

    state = {
        articles: [],
    };

    getArticleList() {
        console.log("coucou");

        axios.get("http://localhost:3001/articles").then((response) => {
            if (response.data.error) {
                console.log("tu as une erreur");
                return true;
            }
            console.log(response.data[0].title);
            let articles = response.data;
            this.setState({articles});
        });
    }

    render(){
        return(
            <div>
                {this.state.articles.map((object, i) =>
                    <div className="margin" key={i}>
                        <Row>
                            <Col xs={12} sm={5} md={2} className="">
                                <div className={`uneRea imgReaAdmin ${object.miniature}`}></div>
                            </Col>
                            <Col xs={12} sm={7} md={10} className="admin-margin">
                                <div className="texte titreRea titreReaAdmin">{object.title} </div>


                                <Link to={"/fantasia/admin" + object.id + "#top"}><button className="btn btn-rea btn-rea-suite">Modifier</button></Link>
                                <span>
                                    <Link to={"/fantasia/admin" + object.id + "#top"}><button className="btn btn-rea btn-danger">Supprimer</button></Link>
                                </span>
                            </Col>
                            <Col xs={12} sm={12} md={12} >
                                <hr/>
                            </Col>
                        </Row>
                    </div>
                )}
            </div>
        );
    }
}
export default AdminArticlesList;