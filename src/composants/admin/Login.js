import {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import React from "react";
import './Login.css';
import {Link} from "react-router-dom";


class Login extends Component{

    render(){
        return(
            <Grid className=" ">
                <div className="login">
                    <Row className="">
                        <Col md={12} className=" header ">
                            <h1 className="text-center">Salut Marina !</h1>
                            <div className="form">
                                <form action="" >
                                    <div className="input formLogin">
                                        <label htmlFor="">login</label><br/>
                                        <input type="text"/>
                                    </div>
                                    <div className="input formPass">
                                        <label htmlFor="">mot de passe</label><br/>
                                        <input type="password"/>
                                    </div>
                                    <div className="formBtn">
                                        <Link to={"/fantasia/admin"}>
                                            <button className="btn btn-rea-suite">Se connecter</button>
                                        </Link>

                                    </div>

                                </form>
                            </div>

                        </Col>
                    </Row>
                </div>
            </Grid>
        );
    }


}
export default Login;