import React from 'react';

import './MenuNavigation.css'

import NavItem from 'react-bootstrap/lib/NavItem';


const MenuNavigation = ({nom, onClick}) =>

    <NavItem onClick={() => onClick(nom)}>
        {nom}
    </NavItem>


export default MenuNavigation;


