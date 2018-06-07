import React from 'react';

import './MenuNavigation.css'

import NavItem from 'react-bootstrap/lib/NavItem';


const MenuNavigation = ({nom}) =>
                    <NavItem>
                        {nom}
                    </NavItem>

export default MenuNavigation;


