const multer = require('multer');

const storageAdvImg = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/adverts/');
  },
  filename: function (req, file, cb) {
    const myFilename = `${file.fieldname}_${Date.now()}_${file.originalname}`;
    cb(null, myFilename);
  },
});

const uploadAdvImg = multer({ storage: storageAdvImg }).single('image');

module.exports = uploadAdvImg;
