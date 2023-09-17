// import { ReactComponent as Logo } from './mythiclibrary.svg';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Homescreen from './website/Homescreen/Homescreen.jsx';
import Header from './website/Header/Header';
import Signup from './website/sign/Signup';

function App() {
  return (
  <BrowserRouter>
  <html>
  <Header />
      <Routes >
          <Route path='/' element={<Homescreen />} />
          <Route path='/signup' element={<Signup />} />
      </Routes>
  </html>
  </BrowserRouter>);
}

export default App;
