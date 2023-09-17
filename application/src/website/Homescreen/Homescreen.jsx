import React from 'react'
import './Homescreen.css'
import { ReactComponent as LikeIco } from './like.svg'
import { ReactComponent as CommentIco } from './comment.svg'
import { ReactComponent as DownloadIco } from './download.svg'
function Homescreen() {
  var title = 'Beats Animated Weapons & Tools Set'
  var title2 = 'Swords Pack #4'
  var description = 'This is just a test to visualize the pack. This pack has been found in MCModels'
  
  return (
    <div className='homescreen'>
      <div className='banner-section'>
        <div className='banner'>
          <div></div>
        </div>
      </div>
      <div className='product-section'>
      <div className='productcard-model'>
          <div className='productcard-model-image'>
            <img src='/Beats-Set-Preview-01.webp' alt='...'/>

          </div>
          <div className='productcard-model-title'>
            <div className='card-title'>{
              title.length > 59 ? title.slice(0, 59) + '...' : title
            }</div>
          </div>
          <div className='card-description'>
            {
            description.length > 90 ? description.slice(0, 90) + '...' : description
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
            <div className='productcard-model'>
                <div className='productcard-model-image'>
                  <img src='/swords4_2.webp' alt='...'/>

                </div>
                <div className='productcard-model-title'>
                  <div className='card-title'>{
                    title2.length > 59 ? title2.slice(0, 59) + '...' : title2
                  }</div>
                </div>
                <div className='card-description'>
                  {
                  description.length > 90 ? description.slice(0, 90) + '...' : description
                  }
                </div>
                <div className='card-social-placeholders'>
                  <div className='card-placeholder'>
                    <LikeIco className='loveico'/>
                    9
                  </div>
                  <div className='card-placeholder'>
                    <CommentIco className='loveico'/>
                    5
                  </div>
                  <div className='card-placeholder'>
                    <DownloadIco className='loveico'/>
                    800
                  </div>
                </div>
            </div>
      </div>
    </div>
  )
}

export default Homescreen