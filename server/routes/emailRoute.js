import express from 'express'
import fs from 'fs'
import Email from '../models/emailModel.js';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.post("/post", async(req, res) => {
    try {
        const {title, body, footer} = req.body;
        if (!title || !title.text || !body || !body.text || !footer) {
          return res.send({
            success: false,
            message: "Enter all fields",
          });
        }
        const email = new Email({...req.body});
        await email.save();
        return res.send({
            success: true,
            message: "Email posted successfully",
            email,
        })
    } catch (error) {
        console.log("Error in posting email", error);
    }
})

const storage = multer.diskStorage({
    filename: (req, file, callback) => {
      callback(null, Date.now() + file.originalname);
    },
});
const upload = multer({ storage: storage });

router.post("/upload-image/:id", upload.fields([{ name: 'logo' }, { name: 'image' }]), async(req, res) => {
    try {
        if (!req.files || !req.files.logo || !req.files.image) {
          return res.status(400).send('Logo and image are required');
        }
    
        const logoUpload = await cloudinary.uploader.upload(req.files.logo[0].path, { resource_type: 'auto', folder: 'email'});
        const imageUpload = await cloudinary.uploader.upload(req.files.image[0].path, { resource_type: 'auto', folder: 'email'});

        const logoUrl = logoUpload.secure_url;
        const imageUrl = imageUpload.secure_url;
    
        const email = await Email.findById(req.params.id);
        if (!email) {
          return res.status(404).send('Email not found');
        }
    
        email.logo = logoUrl;
        email.image = imageUrl;
        await email.save();
    
        res.status(200).json({success: true, message: 'Image uploaded successfully', email });
      } catch (error) {
        console.error('Error in uploading files' ,error);
      }
})

router.get("/download/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const email = await Email.findById(id);

        let layout = await fs.promises.readFile(path.join(__dirname, '../public/layout.html'), 'utf8');

        layout = layout
        .replace('{{logo}}', email.logo || '') 
        .replace('{{titleText}}', email.title.text || '')
        .replace('{{titleFontSize}}', email.title.font_size || '20px')
        .replace('{{titleColor}}', email.title.color || '#000000')
        .replace('{{bodyText}}', email.body.text || '')
        .replace('{{bodyFontSize}}', email.body.font_size || '16px')
        .replace('{{bodyColor}}', email.body.color || '#000000')
        .replace('{{footerText}}', email.footer.text || '')
        .replace('{{footerFontSize}}', email.footer.font_size || '14px')
        .replace('{{footerColor}}', email.footer.color || '#000000')
        .replace('{{image}}', email.image || '') 
        .replace('{{backgroundColor}}', email.background || '000000')

        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Content-Disposition', 'attachment; filename=generated_email.html');
        res.send(layout);
    } catch (error) {
        console.log("Error in downloading file", error);
    }
})

export default router;
