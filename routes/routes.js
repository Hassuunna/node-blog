import express from 'express';
import multer from 'multer';
import API from '../controllers/api.js'
const router = express();

// multer middleware
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        var d = new Date();
        var dateString = ("0" + d.getDate()).slice(-2) + ("0" + (d.getMonth() + 1)).slice(-2) + d.getFullYear() + "." + ("0" + d.getHours()).slice(-2) + ("0" + d.getMinutes()).slice(-2) + ("0" + d.getSeconds()).slice(-2);
        cb(null, `${dateString}_${file.originalname}`)
    }
})

let upload = multer({
    storage: storage
}).single("image")

router.get('/', API.fetchAllPosts)
router.get('/:id', API.fetchPostById)
router.post('/', upload, API.CreatePost)
//patch allows to update the post partially
router.patch('/:id', upload, API.UpdatePost)
router.delete('/', API.DeleteAllPosts)
router.delete('/:id', API.DeletePost)

export default router