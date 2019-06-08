import {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import React from "react";
import './Admin.css';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import axios from "axios";
import AdminArticlesList from "./AdminArticlesList";


class AdminArticlesForm extends Component{

    constructor() {
        super();
        //this.getArticleList();
    }

    state = {
        articles: [],
        posts:[],
        certificats:[],
        infoPerso:[],
        onglet:3,

    };



    render(){

        return(
            <Grid className=" ">
                <Row className="">


                </Row>
            </Grid>
        );
    }
}
export default AdminArticlesForm;