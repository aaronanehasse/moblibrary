import { React, useEffect, useState} from 'react'
import Signup from './Signup'
import Signin from './Signin'

function Sign({type, user, getUser}) {
  
  return (type === 'signup' ? 
    (<div className='signpage signpagestart'>
      <Signup  user={user} getUser={getUser}/>
    </div>) 
    : 
    (<div className='signpage signpagestart'>
      <Signin user={user} getUser={getUser}/>
    </div> )
  )
}

export default Sign