import express from 'express';
import multer from 'multer';
import { uploadCSVFile } from '../controllers/csv.controllers.js';
const router = express.Router();

//Just in the case of we providing the file to the end users and keeping an instance of not using the cloud storage I have used multer to store it in the diskStorage rather than the memory storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, 'CovertCSVtoJSON.csv')
});
const upload = multer({ storage: storage });

router.post('/upload-csv', upload.single('file'), uploadCSVFile)

export default router;