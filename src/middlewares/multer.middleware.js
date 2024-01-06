import path from 'path';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/temporary');
  },
  filename: function (req, file, cb) {
    // TODO: update functionality
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage: storage });
