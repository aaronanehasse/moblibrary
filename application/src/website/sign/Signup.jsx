import { React, useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ReactComponent as Logo } from '../../../src/ico/mythiclibrary.svg'
import { ReactComponent as Backbutton } from '../../../src/ico/backbutton.svg'

function Signup() {
  var navigate = useNavigate()
  return (
    <div className='signpage'>
      <div className='signcard'>
        <div className='sign-banner'>
          <div className='sign-banner-title'>
            MOBS ITEMS THREADS LIKES COMMENTS CODE PACKS SQUARES  ▢  MYTHIC MOB PARTICLES
          </div>
          <div>
            <Logo className='sign-logo'/>
          </div>
        </div>
        <div className='sign-inputs' style={{position: 'relative'}}>
          <div style={{cursor: 'pointer', aspectRatio: '1/1',position:'absolute', height:'30px', top: '7px', left: '10px', zIndex:'40'}}>
            <div className='backbutton'>
              <Backbutton fill='white' onClick={() => navigate("..", { relative: "path" })}/>
            </div>
          </div>
            <div className='signup-title'>Create Account</div>

            <div style={{marginTop: '14px', marginBottom: '14px'}}>
                <input type='text' className='input-level2' placeholder='Username'/>
                <input type='text' className='input-level2' placeholder='Email'/>
                <input type='password' className='input-level2' placeholder='Password'/>
                <input type='password' className='input-level2' placeholder='Password again'/>
            </div>
            <div className='signup-subtitle'>By creating an account you are accepting our Terms and Policy</div>
            <div style={{display: 'flex', justifyContent: 'center', margin: '20px'}}>
              <div className='createbutton'>

                <div className='sign-in-button'>
                    <div className='sign-in-button-outside'>
                        <button className='sign-in-button-inside'>Create!</button>
                    </div>
                </div>
                
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Signup