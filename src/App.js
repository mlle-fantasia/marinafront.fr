import React, { Component } from 'react';
//route
import {Link, Route,BrowserRouter} from 'react-router-dom'
//css
import './App.css';
import './composants/MenuNavigation.css'
import {Grid, Row, Nav, Navbar, NavItem } from 'react-bootstrap';
//component
import Footer from './composants/Footer.js';


import AccueilPage from './composants/pageAccueil/AccueilPage.js';
import BtnLien from './composants/pageAccueil/BtnLien.js';

import RealisationsPage from './composants/pageRealisation/RealisationsPage.js';

import CvPage from './composants/pageCv/CvPage.js';

import ContactPage from './composants/pageContact/ContactPage.js';


const LIENS = [
    {route: "/", nom: "Accueil", component: AccueilPage, exact: true},
    {route: "/cv", nom: "CV", component: CvPage, exact: false},
    {route: "/realisations", nom: "Réalisation", component: RealisationsPage, exact: false},
    {route: "/contact", nom: "Contact", component: ContactPage, exact: false}
];

class App extends Component {

state= {
  pageActive : 'Accueil',
  //renderPage : [<AccueilHeader/>,<AccueilPage/>],
 
}


lienClick(e, newPage){
  /*this.setState({ pageActive: newPage, renderPage: []});
  let page = [];

  if( newPage.nom === 'Réalisations'){
     page= [<CvHeader/>,<RealisationsPage/>];
  }
  if( newPage.nom === 'CV'){
     page= [<CvHeader/>,<CvPage/>];
  }
  if( newPage.nom === 'Contact'){
     page= [<ContactPage/>];
  }  

this.setState({ renderPage: page});
return page;*/
}

getEtat(nom){
  const {pageActive} = this.state;
  return pageActive.nom === nom ? 'pageActive' : 'pageInactive' ;
}


  render() {
    const {renderPage} = this.state

    const listeLiens = LIENS.map((nom, etat) =>(
                  <BtnLien
                    nom= {nom}
                    key={nom.id}
                    onClick={(e) => this.lienClick(e, {nom})}
                    etat = {this.getEtat(nom)}/>
                  ));


      const listeLiensNav = LIENS.map((element) => (
                  <NavItem>
                      <Link to={element.route}>
                          {element.nom}
                      </Link>
                  </NavItem>

      ));

      const listeLiensRouter = LIENS.map((element) => (
          <Route path={element.route} exact={element.exact} component={element.component}/>
      ));



    return (
        <BrowserRouter>
          <div>

            <Navbar inverse collapseOnSelect>
              <Navbar.Header>
                <Navbar.Brand>

                  <a href="/"><img src={require("./composants/images/logoInfo50px.png")} alt="logo Marina Front"/><div className="marque">Marina Front</div></a>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav>
                  {listeLiensNav}

                </Nav>
              </Navbar.Collapse>
            </Navbar>

              {listeLiensRouter}




             <div className="liens">
                <Grid fluid>
                   <Row>
                       <Grid>

                       </Grid>
                   </Row>
                </Grid>
             </div>

             <Footer/>

          </div>
        </BrowserRouter>
      );
  }
}

export default App;
