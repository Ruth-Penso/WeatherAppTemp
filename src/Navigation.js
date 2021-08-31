
import {  Nav,Navbar, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './nav.css';
import React from 'react';
import { Router } from '@material-ui/icons';
import 'react-bootstrap/Navbar';


export default function Navugation()
{       

    return(
    <>
      <Nav id="navbar" className="navbar1" style={{marginTop:"-80px"}}>
          <Link className="nav-link" to="/Favorite">מועדפים</Link>
          <Link className="nav-link" to="/AutoCoCities">/תחזית</Link>
      </Nav>

      </>
    );
}