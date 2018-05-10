import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MenuNavigation from './composants/MenuNavigation.js';
import Cv from './composants/Cv.js';
import HeaderAccueil from './composants/HeaderAccueil.js';
import Footer from './composants/Footer.js';
import Button from 'react-bootstrap/lib/Button';

class App extends Component {
  render() {
    return (
      <div>
      <MenuNavigation/>
      <HeaderAccueil/>
      <Footer/>
      </div>
      );
  }
}

export default App;
