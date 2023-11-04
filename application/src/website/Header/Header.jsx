/* eslint-disable no-mixed-operators */
/* eslint-disable react/jsx-no-comment-textnodes */
import { React, useEffect, useState, useRef} from 'react'
import { ReactComponent as Searchicon } from '../../ico/searchicon.svg';
import { ReactComponent as Logo } from '../../ico/mythiclibrary.svg';
import { useLocation, useNavigate} from 'react-router-dom'
import { ReactComponent as Logoutico } from '../../ico/logout_icon.svg';
import { ReactComponent as Settingico } from '../../ico/settings.svg';
import { ReactComponent as Dashboardico } from '../../ico/dashboard.svg';
import { ReactComponent as Adquiredico } from '../../ico/acquired.svg';
import { ReactComponent as Creator } from '../../ico/creator.svg';
import { ReactComponent as Create } from '../../ico/create.svg';
import Pages from './Pages'

import Tags from './Tags';
import Cookies from 'js-cookie';
import { ReactComponent as Inbox } from '../../ico/inbox.svg'

function Header({ user }) {
    const location = useLocation();
    const navigate = useNavigate()
    
    const [logedin, setlogedin] = useState(false)
    const [showmenu, setshowmenu] = useState(false)
    const [isBlacklisted, setIsBlacklisted] = useState(false)
    const [hasTag, setHasTag] = useState(true)
    const menublacklist = [
        '/create/thread',
        '/create/model',
        '/dashboard',
        '/dashboard/content',
        '/dashboard/echochat',
        '/dashboard/activity',
        '/dashboard/wallet',
        '/dashboard/preview'
    ]
    const blacklist = [
        '/signup',
        '/signin',
    ]
    const notags = [
        '/create/pack', 
        '/product',
        '/create',
        '/product/*',
        '/create/thread',
        '/create/model',
        ''
    ]

    useEffect(()=>{if(Cookies.get('usrpassx')){setlogedin(true)}}, [])

    const checkifManuIsListed = () => {
        if(menublacklist.indexOf(location.pathname) === -1) {
            setshowmenu(true)} else (setshowmenu(false))}

    const checkBlacklisted = () => {
    if(blacklist.indexOf(location.pathname) !== -1) {
    setIsBlacklisted(true)} else (setIsBlacklisted(false))}

    const checkiftags = () => {
        if (notags.some(tag => location.pathname.startsWith(tag))) {
            setHasTag(false);
        } else {
            setHasTag(true);
        }
    }

    useEffect(() => {checkBlacklisted()}, [])
    useEffect(() => {checkiftags()}, [])

    useEffect(() => {
        checkBlacklisted()
        checkiftags()
        checkifManuIsListed()
        if(Cookies.get('usrpassx')){setlogedin(true)}
    }, [location.pathname])

    let menuRef = useRef(null)
    let profile = useRef(null)

    useEffect(() => {
        let handler = (e) =>{
            if (profile.current && menuRef.current && !menuRef.current.contains(e.target) && !profile.current.contains(e.target)){
                setMenu(false)
            }
        }
        document.addEventListener('mousedown', handler)
    }, [])


    const logout = () => {
        Cookies.remove('usrpassx')
        window.location.reload()
    }
    const [menu, setMenu] = useState(false)




    if (!isBlacklisted) {

        return (
          <>
          {menu && (<>
            <div className='p-menu' ref={menuRef} onClick={() => {setMenu(false)}}>
                    <div className='usercard-menu'>
                        <div className='usercard-menu-profilepic'>
                            
                        </div>
                        <div className='usercard-menu-content'>
                            <div className='usercard-menu-content-header'>
                            {user && user.username || '/USERNAME/'}
                            </div>
                            <div className='usercard-menu-content-body'>
                                0 followers
                            </div>
                        </div>
                    </div>
                    <div className='p-menu-list'>

                        <div className='element-p-menu-list' /*onClick={() => logout()}*/>
                            <div className='ico-p-menu-list'>
                                <Adquiredico />
                            </div>
                            <div className='title-p-menu-list'>
                                Following
                            </div>
                        </div>
                        
                        <div className='element-p-menu-list' onClick={() => navigate('/dashboard/preview')}>
                            <div className='ico-p-menu-list'>
                                <Dashboardico />
                            </div>
                            <div className='title-p-menu-list'>
                                Dashboard
                            </div>
                        </div>

                        <div className='element-p-menu-list' /*onClick={() => logout()}*/>
                            <div className='ico-p-menu-list'>
                                <Settingico />
                            </div>
                            <div className='title-p-menu-list'>
                                Settings
                            </div>
                        </div>

                        <div className='element-p-menu-list' /*onClick={() => logout()}*/>
                            <div className='ico-p-menu-list'>
                                <Creator />
                            </div>
                            <div className='title-p-menu-list'>
                                Become a Creator!
                            </div>
                        </div>


                        <div className='element-p-menu-list' onClick={() => logout()}>
                            <div className='ico-p-menu-list'>
                                <Logoutico />
                            </div>
                            <div className='title-p-menu-list'>
                                Logout
                            </div>
                        </div>

                    </div>
                </div>
          </>)}
            <header>

              {/* Header Logo */}
                  <div className='header-logo'  onClick={() => navigate('/')}>
                  <div>
                      <Logo className='logo-src-header'/>
                  </div>
                  <div className='logo-src-text'>
                      <div>MobLibrary</div>
                      <div style={{fontSize: '14px', textAlign: 'end', opacity: '50%'}}>Beta</div>
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
            {logedin === false ? (<>
                  <div className='profile-header'>
                    <div className='signinslash'>
                        /
                    </div>
                    <div className='signintitle' onClick={() => navigate('/signin')}>
                        Sign in
                    </div>
                      <div className='sign-in-button'>
                          <div className='sign-in-button-outside'>
                          <button className='sign-in-button-inside' onClick={() => navigate('/signup')}>Sign Up</button>
                          </div>
                      </div>
                  </div>
            </>):(<>
                <div className='profile-header'>
                    <div>
                        <Inbox className='inboxico' fill='white' width='24px' height='24px'/>
                    </div>
                    <div className='headerprofile' ref={profile} onClick={() => setMenu(!menu)}>
                        
                    </div>      
                </div>
            </>)}
              </header>
              {showmenu && (<>
                <div className='subheader'>
                    <Pages />
                </div>
              </>)}
              {
                hasTag && (<>
                    <Tags />
                </>)
              }
              
          </>
        ) 
    }
}

export default Header