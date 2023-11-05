const User = require('../schem/userSchem')
var fs = require('fs');
const express = require('express');
const colors = require('colors');
const OpenAI = require('openai');
const uniqid = require('uniqid');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('SECRET633919804aA');

const openai = new OpenAI({
    apiKey: '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', // defaults to process.env["OPENAI_API_KEY"]
  });

const regUser = async (req, res) => {
    try {
        var {username, email, password} = req.body
        console.log('Register',req.body)
    
        // email = email.lowerCase();
        if (!email) {
            return res.status(400).send({code: 'NO-EMAIL'})
        }
        if (!username) {
            return res.status(400).send({code: 'NO-USERNAME'})
        }
        if (!password) {
            return res.status(400).send({code: 'NO-PASSWORD'})
        }
        password = cryptr.encrypt(password)
        const randomID = uniqid();
        const user = await User.create({
            uid: randomID,
            email: email,
            username: username,
            password: password,
            notif: [],
            assets: [],
            owned: []
        })
        res.status(202).send({
            user: randomID
        })
    } catch (error) {console.log(error)}
}

// Eventually somthing better than stellar. Login create a session ID that saves the session ID and the device
// it is linked to. When device is loged out the session ID disappears
const loginuser = async (req, res) => {
    var {email, password} = req.body

    if(!email || !password) {
       return res.status(400).send({code: 'ERROR_400_MISSING_DATA'})
    }

     const user = await User.findOne({ email: email })

     if (!user) {
        return res.status(404).send({code: 'ERROR_404_USER_NOT_FOUND'})
     }

     res.status(202).send({user: user.uid})
     console.log(user.uid)
}

const getUser = async (req, res) => {
    const { token } = req.body

    if (!token) {
        res.status(500).send({message: 'Invalid token'})
    }

    const rawuser = await User.findOne({ uid: token})

    const user = {
        username: rawuser.username
    }

    res.status(202).send(user)
}

const echoGPT = async (req, res) => {
    const { messages } = req.body; // Extract the messages from the request body
    // Ensure that the messages array only contains valid message objects
    const validMessages = messages.filter(message => message.role && message.content);
    console.log(validMessages)
  
    const conversation = [
      { role: 'system', content: 'Your AI:{type:"pixie", color="pink-blue", qualities: [lovelly, friendly, inocent, cute]}You dont act as An AI assistant. You are not here to help, but to give some love. When you get any useful information from your chat you save it by typing at the start of the response in one single word to explain, example:/s={favouriteColor: "red"}/. you dont know anything about coding, science or related. You are like a kid. This is the list of things you know about user: name: KIO.'},
      ...validMessages, // Include the user messages
    ];
  
    try {
      const stream = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: conversation,
        stream: true,
      });
  
      for await (const part of stream) {
        const output = part.choices[0]?.delta?.content || '';
        res.write(output.toString());
      }
      
      res.end();
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  
  

module.exports = {regUser,loginuser,getUser, echoGPT}