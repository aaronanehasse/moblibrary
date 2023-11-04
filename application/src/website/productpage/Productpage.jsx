import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { ReactComponent as LikeIco } from '../Homescreen/like.svg'
import ImageGallery from "react-image-gallery";
import './Product.css'
import { ReactComponent as CommentIco } from '../Homescreen/comment.svg'
import { ReactComponent as DownloadIco } from '../Homescreen/download.svg'
import { proxy } from '../../utilies/utilies.js'
function Productpage() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([])
  const [download, setDownload] = useState('')

  useEffect(() => {fetchProduct()}, [])

  const fetchProduct = async () => {
    const res = await fetch(`${proxy}/api/product/get/${id}`, {
      method: 'GET',
    });
    const response = await res.json();
    setProduct(response)
    console.log(id, response)
  }
  const getDownload = () => {
    if (!product.files || product.files.length < 1) return 
    product.files.forEach(x => {
      if (x.type === 'download') {
        setDownload(`https://stelar.nyc3.digitaloceanspaces.com/${x.url}`)
      }
    })
  } 
  const loadimages = async () => {
    if (!product.files || product.files.length < 1) return 
    product.files.forEach(x => {
      if (x.type === 'thumbnail') {
        setImages(prev => [...prev, {
          original: `https://stelar.nyc3.digitaloceanspaces.com/${x.url}`,
          thumbnail: `https://stelar.nyc3.digitaloceanspaces.com/${x.url}`,
        }])
      }
      if (x.type === 'image') {
        setImages(prev => [...prev, {
          original: `https://stelar.nyc3.digitaloceanspaces.com/${x.url}`,
          thumbnail: `https://stelar.nyc3.digitaloceanspaces.com/${x.url}`,
        }])
      }
    })
  }
  useEffect(() => {
    getDownload()
    loadimages()}, [product])


  return (<div className='productpage'>
    <div className='packpage-headersection'>
      <div className='square-slider'>
          <ImageGallery items={images} />
      </div>
      <div className='packpage-content'>
        <div className='packpage-title'>
          {product && product.title}
          <span className='packpage-subtitle'>by {product.owner}</span>
        </div>
        <div className='downloadbutton'>
            <button className="button-level3" style={{width: '105px'}} onClick={() => window.open(download)}>Download</button>
        </div>
      </div>
    </div>
  </div>)}

export default Productpage