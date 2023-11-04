const express = require('express');
const User = require('../schem/productSchem');
const { uploadThumbnail, fetchAllPacks,
fetchProduct } = require('../controller/productController.js')
const multer = require('multer');

const storage = multer.memoryStorage(); // Use memory storage to handle file uploads in memory
const upload = multer({ storage: storage });

const router = express.Router()
router.post('/uploadthumnail',upload.fields([
    { name: 'thumbnails', maxCount: 1 },
    { name: 'images', maxCount: 15 },
    { name: 'downloads', maxCount: 1 }
  ]), uploadThumbnail)
router.post('/fetchallpacks', fetchAllPacks)
router.get('/get/:pid', fetchProduct)



module.exports = router