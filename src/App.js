import React, { Component } from 'react';

import './App.css';

import {Grid, Row, Nav, Navbar } from 'react-bootstrap';

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



  this.setState({ pageActive: newPage, renderPage: []});
  let page = [];

  if( newPage.nom === 'Réalisations'){
     page= [<CvHeader/>,<RealisationsPage/>];
  }
  if( newPage.nom === 'CV'){
     page= [<CvHeader/>,<CvPage/>];
  }
  if( newPage.nom === 'Contact'){
     page= [<CvHeader/>,<ContactPage/>];
  }  

this.setState({ renderPage: page});

return page;
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

    const listeLiensNav = LIENS.map((nom) =>(
                  <MenuNavigation
                    nom= {nom}
                    key={nom.id}
                    onClick={(e) => this.lienClick(e, {nom})}/>
                  ));



    return (
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
