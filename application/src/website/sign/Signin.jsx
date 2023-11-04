import { useLocation, useNavigate } from 'react-router-dom'
import { ReactComponent as Logo } from '../../../src/ico/mythiclibrary.svg'
import { ReactComponent as Backbutton } from '../../../src/ico/backbutton.svg'
import { proxy } from '../../utilies/utilies.js'
import { React, useEffect, useState, useRef} from 'react'
import Cookies from 'js-cookie';


function Signup({user, getUser}) {
  // Inputs
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const [stage, setstage] = useState(1)
  
  const [errormessage, setErrorMessage] = useState('')
  const [errorinterval, setErrorInterval] = useState(0)
  var navigate = useNavigate()
  
  const card = useRef(null)

const errorhandler = async() => {
  if (!email) {
    setErrorMessage('An email is required')
    setErrorInterval(10)
    return }
  if (!validateEmail(email)){
      setErrorMessage('The email is not a valid email address');
      setErrorInterval(10)
      return }
  if (!password) {
    setErrorMessage('A password is required');
    setErrorInterval(10)

    return }

  regAccepted()
}

const regAccepted = async () => {
  console.log(proxy)
    const res = await fetch(`${proxy}/api/user/login`, {method: 'POST', headers:{'Content-Type': 'application/json' }, body:JSON.stringify({email: email, password: password})})
    if (res.status ===  202) {
      const x = await res.json()
     
      Cookies.set('usrpassx', x.user)
      Cookies.set('preusr', x.user)
      getUser(x.user)
      navigate("..", { relative: "path" })

    }
    if (res.status === 404) {
      setErrorMessage('The credentials are invalid');
      setErrorInterval(10)
    }

  }

// validateEmail uses REGEX to validate if is an email format
const validateEmail = (x) => {
  return String(x)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

// This is really useful, it creates a countdown
// In this case is used to make the error fade away after a
//  specified time
useEffect(() => {
  if (errorinterval <= 0) return;

  const intervalId = setInterval(() => {
      setErrorInterval(prev => {
          if (prev === 1) {
              setErrorMessage('');
              clearInterval(intervalId);
          }
          return prev - 1;
      });
  }, 700);

  // console.log(errorinterval)

  return () => {
      clearInterval(intervalId);
  };
}, [errorinterval]);

return(<>
<div className='signcard' style={{width: 'auto'}} ref={card}>
  {stage === 1 && (<>
  
        <div className='sign-inputs' style={{position: 'relative'}}>
          <div style={{cursor: 'pointer', aspectRatio: '1/1',position:'absolute', height:'30px', top: '7px', left: '10px', zIndex:'40'}}>
            <div onClick={() => navigate("..", { relative: "path" })} className='backbutton'>
              <Backbutton fill='white'/>
            </div>
          </div>
            <div className='signup-title'>Sign In</div>

            <div style={{marginTop: '14px', marginBottom: '14px'}}>

                <input type='text' value={email} className='input-level2' placeholder='Email' onChange={(e) => {
                      const value = e.target.value
                      setEmail(value)}}/>

                <input type='password' value={password} className='input-level2' placeholder='Password' onChange={(e) => {
                      const value = e.target.value
                      setPassword(value)}}/>
            </div>
            <div className='signup-subtitle'>I forgot my password</div>
            <div style={{display: 'flex', justifyContent: 'center', margin: '20px'}}>
              <div className='createbutton'>

                <div className='sign-in-button'>
                    <div className='sign-in-button-outside'>
                        <button onClick={() => errorhandler()} className='sign-in-button-inside'>Sign In</button>
                    </div>
                </div>
                
              </div>
            </div>
                  <div className='warning' style={{color: 'white', textAlign: 'center'}}>
                      {errormessage}
                  </div>
        </div>
  </>)}

  </div>
</>)
}
export default Signup