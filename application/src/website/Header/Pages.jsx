import React from 'react'
import { useLocation, useNavigate  } from 'react-router-dom'

function Pages() {
  const location = useLocation();
  const navigate = useNavigate();


  const pageslist = [
    {
      name: 'Home',
      link: '/'
    },
    {
      name: 'Models',
      link: '/models'
    },
    {
      name: 'Packs',
      link: '/packs'
    },
    {
      name: 'Threads',
      link: '/threads'
    },
    {
      name: 'Community',
      link: '/community'
    }
  ]


  return (
    <div className='content-type-menu'>
      {pageslist.map(e => {
        if (location.pathname === e.link) {
          return (<>
            <div className='content-type-menu-element-selected'>
                {e.name}
                <div className='content-type-menu-element-selectionbar'/>
            </div>
          </>)
        } else {
          return (<>
            <div onClick={() => navigate(e.link)} className='content-type-menu-element'>
                {e.name}
            </div>
          </>)
        }
      })}
    </div>
  )
}

export default Pages