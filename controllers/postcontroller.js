const router = require('express').Router();
// const Book = require('../db').import('../models/book');

router.get('/', (req, res) => {
    Book.findAll()
        .then(book => res.status(200).json(book))
        .catch(err => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
    Book.findOne({ where: { id: req.params.id } })
        .then(book => res.status(200).json(book))
        .catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
    if (!req.errors) {
        const bookFromRequest = {
            nameOfBook: req.body.nameOfBook,
            author: req.body.author,
            genre: req.body.genre,
            pubYear: req.body.pubYear,
            rating: req.body.rating
        }; 
        Book.create(bookFromRequest)
            .then(book => res.status(200).json(book))
            .catch(err => res.json(req.errors));
    } else {
        res.status(500).json(req.errors)
    };
});

router.put('/update/:id', (req, res) => {
    if (!req.errors) {
        Book.update(req.body, { where: { id: req.params.id } })
            .then(book => res.status(200).json(book))
            .catch(err => res.json(req.errors));
    } else {
        res.status(500).json(req.errors);
    };
});

router.delete('/delete/:id', (req, res) => {
    if (!req.errors) {
        Book.destroy({ where: { id: req.params.id } })
            .then(book => res.status(200).json(book))
            .catch(err => res.json(req.errors));
    } else {
        res.status(500).json(req.errors);
    };
});

module.exports = router;