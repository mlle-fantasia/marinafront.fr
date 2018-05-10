import React, { Component } from 'react';

import PropTypes from 'prop-types'
import './MenuNavigation.css'
import Nav  from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';


class MenuNavigation extends Component {
  render() {
    return (
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#brand">Marina Front</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="#">
                Accueil
              </NavItem>
              <NavItem eventKey={2} href="#">
                CV
              </NavItem>
              <NavItem eventKey={1} href="#">
                Journal
              </NavItem>
              <NavDropdown eventKey={3} title="Réalisations" id="basic-nav-dropdown">
                <MenuItem eventKey={3.1}>jeu du pendu-React</MenuItem>
                <MenuItem eventKey={3.2}>mini jeu de combat-PHP Objet</MenuItem>
                <MenuItem eventKey={3.3}>un site de randonnées</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={3.3}>Pour les loisirs</MenuItem>
              </NavDropdown>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={2} href="#">
                Me contacter
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
  }
}

export default MenuNavigation;