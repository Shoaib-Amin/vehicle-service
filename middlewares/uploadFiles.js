const multer = require('multer')

// Middleware to check the number of uploaded files
const validateNumberOfFiles = (req, res, next) => {
    if (req.files && req.files.length > 10) {
        return res.status(400).json({ error: 'You can only upload up to 10 pictures' });
    }
    next();
};


// Configure storage settings for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory where files will be stored
    },
    filename: (req, file, cb) => {
        // Use the original name with a timestamp to avoid naming conflicts
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Initialize multer with storage and file size limit settings
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit to 10 MB
    fileFilter: (req, file, cb) => {
        // Accept only image files (optional)
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'), false);
        }
    }
});

module.exports = {
    validateNumberOfFiles,
    upload
}