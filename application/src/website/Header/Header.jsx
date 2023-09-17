import { React, useEffect, useState} from 'react'
import { ReactComponent as Searchicon } from '../../ico/searchicon.svg';
import { ReactComponent as Logo } from '../../ico/mythiclibrary.svg';
import { useLocation, useNavigate} from 'react-router-dom'
import Pages from './Pages'
import Tags from './Tags';

function Header() {
    const location = useLocation();
    const navigate = useNavigate()
    
    const [isBlacklisted, setIsBlacklisted] = useState(false)
    const blacklist = [
        '/signup',
        '/signin'
    ]
    const checkBlacklisted = () => {
    if(blacklist.indexOf(location.pathname) !== -1) {
    setIsBlacklisted(true)} else (setIsBlacklisted(false))}

    useEffect(() => {checkBlacklisted()}, [])

   useEffect(() => {checkBlacklisted()}, [location.pathname])

    if (!isBlacklisted) {

        return (
          <>
              <header>
              {/* Header Logo */}
                  <div className='header-logo'>
                  <div>
                      <Logo className='logo-src-header'/>
                  </div>
                  <div className='logo-src-text'>
                      MobLibrary
                  </div>
                  </div>
                  {/* Header Mid Section */}
                  <div className='header-center'>
                  <div className='header-searchbar'>
                      <input placeholder='Search' type='text' className='searchbar-input'/>
                      <div className='test'>
                         <Searchicon className='searchicon'/>
                      </div>
                  </div>
                  </div>
                  {/* Header left Menu Section */}
                  <div className='profile-header'>
                      <div className='sign-in-button'>
                          <div className='sign-in-button-outside'>
                          <button className='sign-in-button-inside' onClick={() => navigate('/signup')}>Sign In</button>
                          </div>
                      </div>
                  </div>
              </header>)
              <div className='subheader'>
                  <Pages />
              </div>
              <Tags />
          </>
        ) 
    }
}

export default Header