import express from "express";
import {uploadImage} from "../controllers/upload.controller.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage: storage});

router.post('/:conversationId', upload.single('image'), uploadImage);

export default router;
