import Posts from '../models/posts.js'
import fs from 'fs'
export default class API {
    // fetch all posts
    static async fetchAllPosts(req, res) {
        try {
            const posts = await Posts.find()
            res.status(200).json(posts)
        } catch (error) {
            res.status(404).send(error.message)
        }
    }
    // fetch post by id
    static async fetchPostById(req, res) {
        const id = req.params.id
        try {
            const post = await Posts.findById(id)
            res.status(200).json(post)
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }
    // create new post
    static async CreatePost(req, res) {
        const post = req.body
        const imageName = req.file.filename
        post.image = imageName
        try {
            await Posts.create(post)
            res.status(201).json({ message: 'Created successfully' })
        } catch (err) {
            res.status(404).json({ message: err })
        }
    }
    // update post
    static async UpdatePost(req, res) {
        const id = req.params.id
        let imageName = ''
        const oldPost = await Posts.findById(id)
        if (req.file) {
            imageName = req.file.filename
            try {
                fs.unlinkSync('./uploads/' + oldPost.image)
            } catch (error) {
                console.error(error)
            }
        } else {
            imageName = oldPost.image
        }
        const newPost = req.body
        newPost.image = imageName

        try {
            await Posts.findByIdAndUpdate(id, newPost)
            res.status(200).json({ message: 'Updated successfully' })
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }
    // delete post
    static async DeletePost(req, res) {
        const id = req.params.id
        try {
            const result = await Posts.findByIdAndDelete(id)
            if (result.image != '') {
                try {
                    fs.unlinkSync('./uploads/' + result.image)
                    result.image = 'deleted'
                } catch (error) {
                    console.log(error)
                }
            }
            res.status(200).json({ message: 'Deleted successfully', data: result })
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }
    // delete all posts
    static async DeleteAllPosts(req, res) {
        try {
            const posts = await Posts.find()
            posts.forEach(async post => {
                try {
                    await Posts.findByIdAndDelete(post.id)
                    if (post.image != '') {
                        fs.unlinkSync('./uploads/' + post.image)
                        post.image = 'deleted'
                    }
                } catch (error) {
                    console.log(error)
                }
            });
            res.status(200).json({ message: 'All posts deleted successfully' })
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }
}