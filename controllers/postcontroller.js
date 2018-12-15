const router = require('express').Router();
const Post = require('../db').import('../models/post')
var validateSession = require('../middleware/validate-session')
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

router.post('/newthread', validateSession, (req, res) => {
    if (!req.errors) {
        const postFromRequest = {
            userId: req.user.id,
            text: req.body.text,
            title: req.body.title
        }; 
        Post.create(postFromRequest)
            .then(post => res.status(200).json(post))
            .catch(err => res.json(req.errors));
    } else {
        res.status(500).json(req.errors)
    };
});

router.put('/update/:id', validateSession, (req, res) => {
    if (!req.errors) {
        Post.update(req.body, { where: { id: req.params.id } })
            .then(post => res.status(200).json(req.body))
            .catch(err => res.json(req.errors));
    } else {
        res.status(500).json(req.errors);
    };
});

router.delete('/delete/:id', validateSession, (req, res) => {
    if (!req.errors) {
        Post.destroy({ where: { id: req.params.id } })
            .then(post => res.status(200).json(req.body))
            .catch(err => res.json(req.errors));
    } else {
        res.status(500).json(req.errors);
    };
});

module.exports = router;