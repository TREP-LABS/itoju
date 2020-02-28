import express from 'express';
import multer from 'multer';
import path from 'path';
import controllers from '../controllers';

// eslint-disable-next-line max-len
const storage = multer.diskStorage({ // notice you are calling the multer.diskStorage() method here, not multer()
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});
const router = express.Router();
const upload = multer({ storage });

router.put('/', controllers.profile.updateProfile);
router.get('/', controllers.profile.getProfile);
router.put('/image', upload.single('image'), controllers.profile.uploadImage);

module.exports = router;
