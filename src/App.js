import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom'

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Nav  from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';


import Footer from './composants/Footer.js';
import MenuNavigation from './composants/MenuNavigation.js';

import AccueilHeader from './composants/pageAccueil/AccueilHeader.js';
import AccueilPage from './composants/pageAccueil/AccueilPage.js';
import BtnLien from './composants/pageAccueil/BtnLien.js';

import RealisationsPage from './composants/pageRealisation/RealisationsPage.js';

import CvHeader from './composants/pageCv/CvHeader.js';
import CvPage from './composants/pageCv/CvPage.js';

import ContactPage from './composants/pageContact/ContactPage.js';


const LIENS = ['CV','Réalisations','Contact'];

class App extends Component {

state= {
  pageActive : 'Accueil',
  renderPage : [<AccueilHeader/>,<AccueilPage/>],
 
}


lienClick(e, newPage){ 

  const {} = this.state;

  this.setState({ pageActive: newPage, renderPage: []});
  let page = [];
  let retourPage;

  if( newPage.nom == 'Réalisations'){
     page= [<CvHeader/>,<RealisationsPage/>];
  }
  if( newPage.nom == 'CV'){
     page= [<CvHeader/>,<CvPage/>];
  }
  if( newPage.nom == 'Contact'){
     page= [<CvHeader/>,<ContactPage/>];
  }  

this.setState({ renderPage: page});



return page;
}



  render() {
    const {renderPage, pageActive } = this.state

    const listeLiens = LIENS.map((nom, etat, index) =>(
                  <BtnLien
                    nom= {nom}
                    onClick={(e) => this.lienClick(e, {nom})}/>
                  ));

    const listeLiensNav = LIENS.map((nom, etat, index) =>(
                  <MenuNavigation
                    nom= {nom}
                    onClick={(e) => this.lienClick(e, {nom})}/>
                  ));



    return (
      <div>

        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              
              <a href="/"><img src={require("./composants/images/logoInfo50px.png")}/><div className="marque">Marina Front</div></a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              {listeLiensNav}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        

          {renderPage.map(el => {
                    return <div >
                       {el} 
                    </div>
                })}
    
   
     
            <div className="liens">
                <Grid fluid>
                    <Row>
                    <Grid >
                         {listeLiens}
                    </Grid>
                    </Row>
                </Grid>
            </div>

        <Footer/>

      </div>
      );
  }
}

export default App;
