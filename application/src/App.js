// import { ReactComponent as Logo } from './mythiclibrary.svg';
import {React, useState, useEffect} from "react";
import { proxy } from './utilies/utilies.js';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Cookies from 'js-cookie';

import './App.css';
import Dashboard from './website/Dashboard/Dashboard'
import Homescreen from './website/Homescreen/Homescreen.jsx';
import Header from './website/Header/Header';
import Sign from './website/sign/Sign';
import Creator from './website/creator/Creatorpage';
import Productpage from './website/productpage/Productpage.jsx';

function App() {
  const [user, setUser] = useState({})

  const getUser = async (token) => {
    if (Cookies.get('usrpassx')) {
      const res = await fetch(`${proxy}/api/user/getuser`, {method: 'POST', headers:{'Content-Type': 'application/json' }, body:JSON.stringify({token: token || Cookies.get('usrpassx')})})
      setUser(await res.json())
    }
  }
  useEffect(() => {
    console.log(user)
  }, [user])

  useEffect(() => {
    getUser()
  }, [])
  return (
    <BrowserRouter>
    <Header user={user}/>
        <div className="page">
            <Routes >
                <Route path='/dashboard/*' element={<Dashboard />}/>
                <Route path='/' element={<Homescreen user={user}/>} />
                <Route path='/signin' element={<Sign type='signin' user={user} getUser={getUser}/>} />
                <Route path='/signup' element={<Sign type='signup' user={user} getUser={getUser}/>} />
                <Route path='/product/:id' element={<Productpage />} />
                <Route path='/create/*' element={<Creator />}/>
            </Routes>
        </div>
    </BrowserRouter>
    );
}

export default App;
