import React, { Component } from 'react';

import PropTypes from 'prop-types'
import './MenuNavigation.css'

import NavItem from 'react-bootstrap/lib/NavItem';


const MenuNavigation = ({nom, etat, index, onClick}) =>
  
                <NavItem className={`${etat}`} onClick={() => onClick(nom)}>
                  {nom}
                </NavItem> 




export default MenuNavigation;


