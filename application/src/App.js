// import { ReactComponent as Logo } from './mythiclibrary.svg';
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
// import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Homescreen from './website/Homescreen/Homescreen.jsx';
import Header from './website/Header/Header';
import Signup from './website/sign/Signup';

function App() {
  return (
  <BrowserRouter>
  <Header />
      <Routes >
          <Route path='/' element={<Homescreen />} />
          <Route path='/signup' element={<Signup />} />
      </Routes>
  </BrowserRouter>);
}

export default App;
