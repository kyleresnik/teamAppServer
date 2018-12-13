const router = require('express').Router();
const Post = require('../db').import('../models/post')
// Post.sync({force: true})

router.get('/getall', (req, res) => {
    Post.findAll()
        .then(post => res.status(200).json(post))
        .catch(err => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
    Post.findOne({ where: { id: req.params.id } })
        .then(post => res.status(200).json(post))
        .catch(err => res.status(500).json(err));
});

router.post('/newthread', (req, res) => {
    if (!req.errors) {
        const postFromRequest = {
            userId: req.user.id,
            text: req.body.post.text,
            title: req.body.post.title
        }; 
        Post.create(postFromRequest)
            .then(post => res.status(200).json(post))
            .catch(err => res.json(req.errors));
    } else {
        res.status(500).json(req.errors)
    };
});

router.put('/update/:id', (req, res) => {
    if (!req.errors) {
        Post.update(req.body.post, { where: { id: req.params.id } })
            .then(post => res.status(200).json(req.body.post))
            .catch(err => res.json(req.errors));
    } else {
        res.status(500).json(req.errors);
    };
});

router.delete('/delete/:id', (req, res) => {
    if (!req.errors) {
        Post.destroy({ where: { id: req.params.id } })
            .then(post => res.status(200).json(req.body.post))
            .catch(err => res.json(req.errors));
    } else {
        res.status(500).json(req.errors);
    };
});

module.exports = router;