// const User = require('../schem/productSchem')
var fs = require('fs');
const express = require('express');
const colors = require('colors');
const uniqid = require('uniqid');
const Product = require('../schem/productSchem');
const User = require('../schem/userSchem')

const Spaces = require('do-spaces').default;


const spaces = new Spaces({
    endpoint: `nyc3.digitaloceanspaces.com`,
    accessKey: `DO00AKFT8ZMB6UXPD4MY`,
    secret: `DZWxv1XGvlEcBh72e79C6+JcNEeoIm/4Ci/abo5k3ho`,
    bucket: `stelar`,
  });

  const uploadThumbnail = async (req, res) => {
    const thumbnailFile = req.files['thumbnails'][0];
    const imageFiles = req.files['images'];
    const downloadFiles = req.files['downloads'];
    const title = req.body.title;
    const description = req.body.description;
    console.log(title, description);
  
    if (!thumbnailFile) {
      return res.status(400).json({ message: 'No thumbnail file uploaded' });
    }
  
    // Generate a unique ID for the product
    const pid = uniqid();
  
    // Upload the thumbnail file
    const thumbnailFileData = thumbnailFile.buffer;
    const thumbnailFilePath = `moblibrary/product/${pid}/thumbnail/${thumbnailFile.originalname}`;
  
    try {
      await spaces.uploadFile({
        pathname: thumbnailFilePath,
        privacy: 'public-read',
        file: thumbnailFileData,
      });
  
      let filesArray = [{ type: 'thumbnail', url: thumbnailFilePath }];
  
      // Process image files if they exist
      if (imageFiles && imageFiles.length > 0) {
        await Promise.all(
          imageFiles.map(async (imageFile, index) => {
            const imageFileData = imageFile.buffer;
            const imageFilePath = `moblibrary/product/${pid}/images/${index}-${imageFile.originalname}`;
            filesArray.push({ type: 'image', url: imageFilePath });
            await spaces.uploadFile({
              pathname: imageFilePath,
              privacy: 'public-read',
              file: imageFileData,
            });
          })
        );
      }
  
      // Process download files if they exist
      if (downloadFiles && downloadFiles.length > 0) {
        await Promise.all(
          downloadFiles.map(async (downloadFile, index) => {
            const downloadFileData = downloadFile.buffer;
            const downloadFilePath = `moblibrary/product/${pid}/downloads/${index}-${downloadFile.originalname}`;
            filesArray.push({ type: 'download', url: downloadFilePath });
            await spaces.uploadFile({
              pathname: downloadFilePath,
              privacy: 'public-read',
              file: downloadFileData,
            });
          })
        );
      }
  
      const product = await Product.create({
        pid: pid,
        title: title,
        description: description || 'eeee',
        owner: 'none',
        createdAt: new Date(),
        type: 'pack',
        version: '0',
        components: [],
        files: filesArray,
      });
  
      res.status(202).send({ message: 'UPLOADED' });
    } catch (error) {
      console.error('Error uploading files to DigitalOcean Space: ', error);
      res.status(500).json({ error: 'File upload failed' });
    }
  };
  
  const fetchAllPacks = async (req, res) => {
    const allPacks = await Product.find({})
    res.status(202).send(allPacks)
  }

  const fetchProduct = async (req, res) => {
    try {
      const pid = req.params['pid']
      console.log(pid)
      if (!pid) {
        return res.status(500).send({error: 'Missing product ID'})
      }
  
      const product = await Product.findOne({pid: pid})
      console.log(product)
    } catch (error) {
      console.log(error)
      res.status(500).send({ERROR: error})
    }
    res.status(202).send(product)
  }
  
module.exports = { uploadThumbnail, fetchAllPacks, fetchProduct }