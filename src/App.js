import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom'

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import Footer from './composants/Footer.js';
import MenuNavigation from './composants/MenuNavigation.js';

import AccueilHeader from './composants/pageAccueil/AccueilHeader.js';
import AccueilPage from './composants/pageAccueil/AccueilPage.js';
import BtnLien from './composants/pageAccueil/BtnLien.js';

import RealisationsPage from './composants/pageRealisation/RealisationsPage.js';

import CvHeader from './composants/pageCv/CvHeader.js';
import CvPage from './composants/pageCv/CvPage.js';


const LIENS = ['CV','Realisations','Contact'];

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

  if( newPage.nom == 'Realisations'){
     page= [<CvHeader/>,<RealisationsPage/>];
  }
  if( newPage.nom == 'CV'){
     page= [<CvHeader/>,<CvPage/>];
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



    return (
      <div>
        <MenuNavigation/>
        
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
