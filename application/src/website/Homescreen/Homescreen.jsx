import { React, useEffect, useState } from 'react'
import './Homescreen.css'
import { useLocation, useNavigate } from 'react-router-dom'
import View3D from "@egjs/react-view3d";
import x from "../../ico/untitled.glb"

import { ReactComponent as LikeIco } from './like.svg'
import { ReactComponent as CommentIco } from './comment.svg'
import { ReactComponent as DownloadIco } from './download.svg'
import EchoTest from '../../ico/echotest.png'
import { proxy } from '../../utilies/utilies.js'

function Homescreen() {
  var navigate = useNavigate()
  var title = 'Beats Animated Weapons & Tools Set'
  var title2 = 'Swords Pack #4'
  var description = 'This is just a test to visualize the pack. This pack has been found in MCModels'
  const [packs, setPacks] = useState([])
  const fetchAllPacks = async () => {
    try {
      const res = await fetch(`${proxy}/api/product/fetchallpacks`, {
        method: 'POST',
        body: {}, // Use FormData to send the file
      });
      const response = await res.json()
      setPacks(response)
      console.log(response)
    } catch (error) {
      
    }
  }
  useEffect(() => {fetchAllPacks()}, [])

  return (
    <div className='homescreen'>


      <div className='banner-section'>
        <div className='banner'>
          <div></div>
        </div>
      </div>
      <div className='productsectiontitle'>
        <span>News</span>
      </div>
      <div className='newsbanner'>
          <div className='newbannercontainer'>
            <div className='newbannertitle'>
                <span className='newbannertitle-first'>
                  First
                </span>
                <span className='newbannertitle-relase'>
                  Relase
                </span>
            </div>
            <div className='newsbannertext'>
                <span>Welcome to MobLibrary! We just spawned! New, mods, models, comunities, and more! More importantly, a new friend, Echo!</span>
                <div className='discovermorebutton'>Discover</div>
            </div>
            <div className='newbannerecho' style={{opacity: '85%'}}>
            <View3D
          tag="div"
          src={x}
          rotate={false}
          shadow={false}
          translate={false}
          yaw={150}
          exposure={1.3}
          maintainSize={false}
          autoResize={true}
          pitch={5}
          initialZoom={6}
          pivot={[0,0.4,0]}
          zoom={false}
          onReady={e => {
            // DO_SOMETHING
          }
      }>

      </View3D>
            </div>
          </div>

      </div>
      <div className='productsectiontitle'>
        <span>Featured Packs</span>
      </div>
      <div className='product-section'>
      {packs.map(pack => (<>
          <div className='productcard-model' onClick={() => navigate(`/product/${pack.pid}`)}>
              <div className='productcard-model-image'>
              {pack.files.map(file => {
                  if (file.type === 'thumbnail') {
                    return (
                      <img src={`https://stelar.nyc3.digitaloceanspaces.com/${file.url}`} alt='...'/>
                    );
                  }
                  return null; // or any other content if 'thumbnail' is not found
                })}

              </div>
              <div className='productcard-model-title'>
                <div className='card-title'>{
                  pack.title.length > 59 ? pack.title.slice(0, 59) + '...' : pack.title
                }</div>
              </div>
              <div className='card-description'>
                {
                pack.description.length > 90 ? pack.description.slice(0, 90) + '...' : pack.description
                }
              </div>
              <div className='card-social-placeholders'>
                <div className='card-placeholder'>
                  <LikeIco className='loveico'/>
                  200
                </div>
                <div className='card-placeholder'>
                  <CommentIco className='loveico'/>
                  5
                </div>
                <div className='card-placeholder'>
                  <DownloadIco className='loveico'/>
                  2K
                </div>
              </div>
          </div>
      </>))}
      
      </div>
    </div>
  )
}

export default Homescreen