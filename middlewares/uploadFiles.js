const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

// Middleware to check the number of uploaded files
const validateNumberOfFiles = (req, res, next) => {
    if (req.files && req.files.length > 10) {
        return res.status(400).json({ error: 'You can only upload up to 10 pictures' });
    }
    next();
};

// Configure Multer Cloudinary storage
const cloudinaryStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'vehicle-service',
      allowed_formats: ['jpg', 'jpeg', 'png'],
    },
  });

// Configure disk-storage settings for multer
// const diskStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/'); // Directory where files will be stored
//     },
//     filename: (req, file, cb) => {
//         // Use the original name with a timestamp to avoid naming conflicts
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });

// Initialize multer with storage and file size limit settings
// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 10 * 1024 * 1024 }, // Limit to 10 MB
//     fileFilter: (req, file, cb) => {
//         // Accept only image files (optional)
//         if (file.mimetype.startsWith('image/')) {
//             cb(null, true);
//         } else {
//             cb(new Error('Only image files are allowed'), false);
//         }
//     }
// });

const upload = multer({ storage: cloudinaryStorage });

module.exports = {
    validateNumberOfFiles,
    upload
}