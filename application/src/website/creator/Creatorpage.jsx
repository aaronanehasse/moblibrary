import { React, useEffect, useState, useRef} from 'react'
import './creator.css'
import Packcreator from './Packcreator'
import { useLocation, useNavigate} from 'react-router-dom'
import Threadcreator from './Threadcreator'

function Creatorpage() {
    const location = useLocation();
    const navigate = useNavigate()
    const [section, setSection] = useState('thread')
    const [title, setTitle]  = useState('')
    const [description, setDescription] = useState('')
    const changeSection = (section) => {
        setSection(section)
        navigate(`${section}`)
    }

    useEffect(() => {
        checkIfThread()
        checkIfPack()
        checkIfModel()
    }, [])

    const checkIfThread = () => {
    if(location.pathname.indexOf('/create/thread') !== -1) {
    setSection('thread')}}
    const checkIfPack = () => {
    if(location.pathname.indexOf('/create/pack') !== -1) {
    setSection('pack')}}
    const checkIfModel = () => {
    if(location.pathname.indexOf('/create/model') !== -1) {
    setSection('model')}}

  return (
    <div className='creatorpage'>
        <div className='creatorcard'>
            <div className='creatorcardcontent'>
                {section === 'thread' && (<Threadcreator title={title} setTitle={setTitle} description={description} setDescription={setDescription}/>)}
                {section === 'pack' && (<Packcreator title={title} setTitle={setTitle} description={description} setDescription={setDescription}/>)}
            </div>
        </div>
    </div>
  )
}

export default Creatorpage