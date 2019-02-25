import {Component} from "react";
import {Col, Grid, Row} from "react-bootstrap";
import React from "react";
import {HashLink as Link} from "react-router-hash-link";


class NavIcons extends Component{


    render(){

        const listeLiens = this.props.tabLiens.map((element, i) => (
            <Link to={element.route + "#top"} key={i}>
                <Col xs={12} sm={4} md={4}>
                    <div className="center-block">
                        <div className={element.icon}></div>
                        <div className="text">{element.nom}</div>
                    </div>
                </Col>
            </Link>
        ));


        return(
            <div className="liens">
                <Grid fluid>
                    <Row>
                        <Grid>
                            {listeLiens}
                        </Grid>
                    </Row>
                </Grid>
            </div>
        );
    }

}
export default NavIcons;