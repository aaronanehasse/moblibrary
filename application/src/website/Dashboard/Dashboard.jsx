import { React, useEffect, useState, useRef} from 'react'
import { useLocation, useNavigate} from 'react-router-dom'

import {
    Routes,
    Route,
  } from "react-router-dom";

  
import './Dashboard.css'
import { ReactComponent as Previewico } from '../../ico/preview.svg'
import { ReactComponent as Historyico } from '../../ico/history.svg'
import { ReactComponent as Contentico } from '../../ico/content.svg'
import { ReactComponent as Echoico } from '../../ico/echochat.svg'
import { ReactComponent as Moneyico } from '../../ico/money.svg'
import { proxy } from '../../utilies/utilies';

function Dashboard() {
    const [inputValue, setInputValue] = useState('');
    const [chat, setChat] = useState([]);
    const [streamData, setStreamData] = useState('');
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };
    
    const handleSubmit = async () => {
        const newUserMessage = { role: 'user', content: inputValue };
        setChat(prevChat => [...prevChat, newUserMessage]);
        setInputValue('');
      
        try {
          const chatData = [...chat, newUserMessage]; // Combine the current state with the new message
          const requestData = chatData.map(message => `${message.role}: ${message.content}`).join('\n');
      
          console.log('Request Data:', requestData); // Log the body before sending it
      
          const response = await fetch(`${proxy}/api/user/echo`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: chatData }), // Send the array of messages as an object
          });
      
          if (!response.ok) {
            console.error('Error:', response.status);
            return;
          }
      
          const reader = response.body.getReader();
          const textDecoder = new TextDecoder();
          let echoedMessage = { role: 'assistant', content: '' };
      
          reader.read().then(async function processResult({ done, value }) {
            if (done) {
              console.log('Stream has ended');
              return;
            }
      
            const text = textDecoder.decode(value);
            console.log('Received:', text);
      
            // Append the received text to the 'Echo' message in the chat array
            echoedMessage.content += text;
      
            // Stream the message in real-time using setStreamData
            setStreamData(prevStreamData => prevStreamData + text);
      
            // Continue processing the next part of the stream
            return reader.read().then(processResult);
          });
      
          setChat(prevChat => [...prevChat, echoedMessage]);
        } catch (error) {
          console.error('Error:', error);
        }
      };

  return (
    <div className='dashboard'>
        <DashboardTab />
        <div className='dashboard-content'>
           {chat.map((message, index) => (<div key={index}>
          <strong>{message.role === 'assistant' ? 'Echo':'User'}: </strong>{message.content}
        </div>))}
            <div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
            <Routes >
                <Route path='/preview' element={<DashboardPreview />} />

            </Routes>
        </div>
    </div>
  )
}

function DashboardTab () {
    const location = useLocation();
    const navigate = useNavigate()
    const topics = [
        {title:'Preview', id: '/preview', ico: (<Previewico />)},
        {title:'Content', id: '/content', ico: (<Contentico />)},
        {title:'Echo', id: '/echochat', ico: (<Echoico />)},
        {title:'Activity', id: '/activity', ico: (<Historyico />)},
        {title:'Wallet', id: '/wallet', ico: (<Moneyico />)},
    ]
    return (<>
        <div className='dashboard-list'>
            {topics.map(topic => (<>
                <div className={location.pathname.indexOf(topic.id) === -1 ?'dashboard-list-element' : 'dashboard-list-element dashboard-list-element-selected'}
                onClick={() => navigate(`/dashboard${topic.id}`)}>
                    {topic.ico}
                    <span>{topic.title}</span>
                </div>
            </>))}
        </div>
    </>)
}

function DashboardPreview() {

    return (<>
        <div className='dashboard-preview-container'>

        </div>
    </>)
}

export default Dashboard