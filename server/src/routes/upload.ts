import express from 'express';
import { upload, workerUpload } from '../config/cloudinary';

const router = express.Router();

router.post('/image', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    // multer-storage-cloudinary adds the path property to the file object
    const fileUrl = (req.file as any).path;
    
    res.json({
      message: 'Image uploaded successfully',
      url: fileUrl
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: 'Server error during upload' });
  }
});

router.post('/worker-image', workerUpload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    // multer-storage-cloudinary adds the path property to the file object
    const fileUrl = (req.file as any).path;
    
    res.json({
      message: 'Worker image uploaded successfully',
      url: fileUrl
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: 'Server error during upload' });
  }
});

export default router;
