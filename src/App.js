import React, {Component} from 'react';
//route
import {Route, BrowserRouter} from 'react-router-dom'
import {HashLink as Link} from 'react-router-hash-link';


//css
import './App.css';
import './composants/MenuNavigation.css';
import './composants/pageAccueil/Liens.css';
import {Grid, Row, Col, Nav, Navbar, NavItem} from 'react-bootstrap';

//component
import Footer from './composants/Footer.js';
import AccueilPage from './composants/pageAccueil/AccueilPage.js';
import NavIcons from "./composants/NavIcons";


const LIENVERSACCUEIL = [{route: "/", nom: "retour à l'accueil", component: AccueilPage, exact: true}];


class App extends Component {


    getEtat(nom) {
        const {pageActive} = this.state;
        return pageActive.nom === nom ? 'pageActive' : 'pageInactive';
    }


    render() {


        const listeLiensNav = this.props.tabLiens.map((element, i) => (
            <NavItem componentClass={Link} href={element.route} to={element.route} key={i}>
                {element.nom}
            </NavItem>


        ));

        const LienAccueil = LIENVERSACCUEIL.map((element, i) => (
            <Link to={element.route} key={i}>
                <div>
                    <img src={require("./composants/images/logoInfo50px.png")} alt="logo Marina Front"/>
                    <div className="marque">Marina Front</div>
                </div>
            </Link>
        ));


        return (
            <BrowserRouter>
                <div id="top">

                    <Navbar inverse collapseOnSelect>
                        <Navbar.Header>
                            <Navbar.Brand>
                                {LienAccueil}
                            </Navbar.Brand>
                            <Navbar.Toggle/>
                        </Navbar.Header>
                        <Navbar.Collapse>
                            <Nav>
                                {listeLiensNav}
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>


                    <Route path="/" exact component={AccueilPage}/>
                    {this.props.tabRoute}

                    <NavIcons tabLiens={ this.props.tabLiens }/>
                    <Footer/>

                </div>
            </BrowserRouter>
        );
    }
}

export default App;
